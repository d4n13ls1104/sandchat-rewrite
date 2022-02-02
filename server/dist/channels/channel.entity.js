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
exports.Channel = exports.ChannelType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const message_entity_1 = require("../messages/message.entity");
const user_entity_1 = require("../users/user.entity");
var ChannelType;
(function (ChannelType) {
    ChannelType[ChannelType["DM"] = 0] = "DM";
    ChannelType[ChannelType["GROUP_DM"] = 1] = "GROUP_DM";
    ChannelType[ChannelType["GUILD_TEXT"] = 2] = "GUILD_TEXT";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
let Channel = class Channel {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Channel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ChannelType,
    }),
    __metadata("design:type", Number)
], Channel.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.channels, { cascade: true }),
    __metadata("design:type", Array)
], Channel.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.channel),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Channel.prototype, "messages", void 0);
Channel = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Channel);
exports.Channel = Channel;
//# sourceMappingURL=channel.entity.js.map