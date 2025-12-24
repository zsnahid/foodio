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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const order_service_1 = require("../orders/order.service");
let UserService = class UserService {
    userRepository;
    orderService;
    constructor(userRepository, orderService) {
        this.userRepository = userRepository;
        this.orderService = orderService;
    }
    async findOne(email) {
        return this.userRepository.findOneBy({ email });
    }
    async findOneById(id) {
        return this.userRepository.findOneBy({ id });
    }
    async createUser(userData) {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
    async placeOrder(userId, createOrderDto) {
        return this.orderService.placeOrder(userId, createOrderDto);
    }
    async trackOrders(userId) {
        return this.orderService.trackOrders(userId);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => order_service_1.OrderService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        order_service_1.OrderService])
], UserService);
//# sourceMappingURL=user.service.js.map