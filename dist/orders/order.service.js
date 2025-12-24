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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../users/user.service");
const order_item_entity_1 = require("./entities/order-item.entity");
const menu_item_service_1 = require("../menu-items/menu-item.service");
let OrderService = class OrderService {
    orderRepository;
    userService;
    menuItemService;
    constructor(orderRepository, userService, menuItemService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.menuItemService = menuItemService;
    }
    async getOrders() {
        return this.orderRepository.find({ relations: ["orderItems"] });
    }
    async updateOrderStatus(id, updateOrderStatusDto) {
        const order = await this.orderRepository.preload({
            id,
            ...updateOrderStatusDto,
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return this.orderRepository.save(order);
    }
    async placeOrder(userId, createOrderDto) {
        const user = await this.userService.findOneById(userId);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const menuItem = await this.menuItemService.findOneByName(createOrderDto.itemName);
        if (!menuItem) {
            throw new common_1.NotFoundException(`Menu item ${createOrderDto.itemName} not found`);
        }
        if (menuItem?.isAvailable === false) {
            throw new Error(`${menuItem.name} is not available`);
        }
        const orderItem = new order_item_entity_1.OrderItem();
        orderItem.menuItem = menuItem;
        orderItem.unitPrice = menuItem.price;
        orderItem.quantity = createOrderDto.quantity;
        const order = new order_entity_1.Order();
        order.user = user;
        order.orderItems = [orderItem];
        order.totalPrice = orderItem.unitPrice * orderItem.quantity;
        return this.orderRepository.save(order);
    }
    async trackOrders(userId) {
        return this.orderRepository.find({
            where: { user: { id: userId } },
            relations: ["orderItems", "orderItems.menuItem"],
            order: { createdAt: "DESC" },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        menu_item_service_1.MenuItemService])
], OrderService);
//# sourceMappingURL=order.service.js.map