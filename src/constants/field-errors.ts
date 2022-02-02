import { FieldError } from '../users/dto/field-error';

export const GENERIC_FIELD_ERROR: FieldError = {
  field: '',
  message: 'Something went wrong. Please try again later.',
};

export const EMAIL_ALREADY_REGISTERED: FieldError = {
  field: 'email',
  message: 'That email is already registered.',
};

export const USERNAME_ALREADY_REGISTERED: FieldError = {
  field: 'username',
  message: 'That username is already registered.',
};

export const EMAIL_NOT_REGISTERED: FieldError = {
  field: 'email',
  message: 'No user with that email',
};

export const INVALID_CREDENTIALS: FieldError = {
  field: 'password',
  message: 'Invalid credentials.',
};

export const UNCONFIRMED_EMAIL: FieldError = {
  field: 'email',
  message: 'Please confirm your email.',
};

export const INVALID_TOKEN: FieldError = {
  field: 'token',
  message: 'You provided an invalid token.',
};
