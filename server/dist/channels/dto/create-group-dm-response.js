"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGroupDMResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const api_error_1 = require("../../types/api-error");
const channel_entity_1 = require("../channel.entity");
let CreateGroupDMResponse = class CreateGroupDMResponse {
};
__decorate([
    (0, graphql_1.Field)(() => api_error_1.ApiError, { nullable: true }),
    __metadata("design:type", Array)
], CreateGroupDMResponse.prototype, "errors", void 0);
__decorate([
    (0, graphql_1.Field)(() => channel_entity_1.Channel, { nullable: true }),
    __metadata("design:type", channel_entity_1.Channel)
], CreateGroupDMResponse.prototype, "channel", void 0);
CreateGroupDMResponse = __decorate([
    (0, graphql_1.ObjectType)()
], CreateGroupDMResponse);
exports.CreateGroupDMResponse = CreateGroupDMResponse;
//# sourceMappingURL=create-group-dm-response.js.map