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
exports.AuthResolver = void 0;
const FieldErrors = __importStar(require("../constants/field-errors"));
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const login_user_input_1 = require("./dto/login-user-input");
const login_user_response_1 = require("./dto/login-user-response");
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./dto/jwt-auth.guard");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let AuthResolver = class AuthResolver {
    constructor(usersRepository, authService, usersService) {
        this.usersRepository = usersRepository;
        this.authService = authService;
        this.usersService = usersService;
    }
    login(loginUserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountExists = yield this.usersService.findByEmail(loginUserInput.email);
            if (!accountExists) {
                return {
                    errors: [FieldErrors.EMAIL_NOT_REGISTERED],
                };
            }
            const user = yield this.authService.authenticateUser(loginUserInput);
            if (!user) {
                return {
                    errors: [FieldErrors.INVALID_CREDENTIALS],
                };
            }
            return this.authService.login(user);
        });
    }
    logout(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne(ctx.req.user.userId);
            if (!user)
                return false;
            this.usersService.invalidateAuthToken(user);
            return true;
        });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => login_user_response_1.LoginUserResponse),
    __param(0, (0, graphql_1.Args)('loginUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_input_1.LoginUserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map