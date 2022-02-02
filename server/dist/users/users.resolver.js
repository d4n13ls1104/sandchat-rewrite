"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const FieldErrors = __importStar(require("../constants/field-errors"));
const graphql_1 = require("@nestjs/graphql");
const create_user_response_1 = require("./dto/create-user-response");
const users_service_1 = require("./users.service");
const create_user_1 = require("./dto/create-user");
const argon2_1 = require("argon2");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/dto/jwt-auth.guard");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield create_user_1.createUserValidationSchema.validate(createUserInput);
            }
            catch (err) {
                return {
                    errors: [
                        {
                            field: err.path,
                            message: err.message,
                        },
                    ],
                };
            }
            const emailAlreadyRegistered = !!(yield this.usersService.findByEmail(createUserInput.email));
            const usernameAlreadyRegistered = !!(yield this.usersService.findByUsername(createUserInput.email));
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
            const hashedPassword = yield (0, argon2_1.hash)(createUserInput.password);
            const user = yield this.usersService.createUser(Object.assign(Object.assign({}, createUserInput), { password: hashedPassword }));
            if (!user) {
                return {
                    errors: [FieldErrors.GENERIC_FIELD_ERROR],
                };
            }
            return { user };
        });
    }
    hello() {
        return 'Placeholder query';
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => create_user_response_1.CreateUserResponse),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "hello", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map