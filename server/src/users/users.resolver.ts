import * as FieldErrors from '../constants/field-errors';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserResponse } from './dto/create-user-response';
import { UsersService } from './users.service';
import { CreateUserInput, createUserValidationSchema } from './dto/create-user';
import { hash } from 'argon2';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/dto/jwt-auth.guard';
import { capitalizeFirstChar } from '../util/capitalize-first-char';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<CreateUserResponse> {
    try {
      await createUserValidationSchema.validate(createUserInput);
    } catch (err) {
      return {
        errors: [
          {
            field: err.path,
            message: capitalizeFirstChar(err.message),
          },
        ],
      };
    }

    const emailAlreadyRegistered = !!(await this.usersService.findByEmail(
      createUserInput.email,
    ));

    const usernameAlreadyRegistered = !!(await this.usersService.findByUsername(
      createUserInput.email,
    ));

    if (emailAlreadyRegistered) {
      return {
        errors: [FieldErrors.EMAIL_ALREADY_REGISTERED],
      };
    }

    if (usernameAlreadyRegistered) {
      return {
        errors: [FieldErrors.USERNAME_ALREADY_REGISTERED],
      };
    }

    const hashedPassword = await hash(createUserInput.password);

    const user = await this.usersService.createUser({
      ...createUserInput,
      password: hashedPassword,
    });

    if (!user) {
      return {
        errors: [FieldErrors.GENERIC_FIELD_ERROR],
      };
    }

    return { user };
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  hello() {
    return 'Placeholder query';
  }
}
