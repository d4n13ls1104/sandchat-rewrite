"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_TOKEN = exports.UNCONFIRMED_EMAIL = exports.INVALID_CREDENTIALS = exports.EMAIL_NOT_REGISTERED = exports.USERNAME_ALREADY_REGISTERED = exports.EMAIL_ALREADY_REGISTERED = exports.GENERIC_FIELD_ERROR = void 0;
exports.GENERIC_FIELD_ERROR = {
    field: '',
    message: 'Something went wrong. Please try again later.',
};
exports.EMAIL_ALREADY_REGISTERED = {
    field: 'email',
    message: 'That email is already registered.',
};
exports.USERNAME_ALREADY_REGISTERED = {
    field: 'username',
    message: 'That username is already registered.',
};
exports.EMAIL_NOT_REGISTERED = {
    field: 'email',
    message: 'No user with that email',
};
exports.INVALID_CREDENTIALS = {
    field: 'password',
    message: 'Invalid credentials.',
};
exports.UNCONFIRMED_EMAIL = {
    field: 'email',
    message: 'Please confirm your email.',
};
exports.INVALID_TOKEN = {
    field: 'token',
    message: 'You provided an invalid token.',
};
//# sourceMappingURL=field-errors.js.map