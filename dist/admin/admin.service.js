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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../categories/category.service");
const menu_item_service_1 = require("../menu-items/menu-item.service");
const order_service_1 = require("../orders/order.service");
let AdminService = class AdminService {
    categoryService;
    menuItemService;
    orderService;
    constructor(categoryService, menuItemService, orderService) {
        this.categoryService = categoryService;
        this.menuItemService = menuItemService;
        this.orderService = orderService;
    }
    async getCategories() {
        return this.categoryService.findAll();
    }
    async createCategory(createCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }
    async updateCategory(id, updateCategoryDto) {
        return this.categoryService.updateCategory(id, updateCategoryDto);
    }
    async deleteCategory(id) {
        return this.categoryService.deleteCategory(id);
    }
    async getMenuItems() {
        return this.menuItemService.findAll();
    }
    async createMenuItem(createMenuItemDto) {
        return this.menuItemService.createMenuItem(createMenuItemDto);
    }
    async updateMenuItem(id, updateMenuItemDto) {
        return this.menuItemService.updateMenuItem(id, updateMenuItemDto);
    }
    async deleteMenuItem(id) {
        return this.menuItemService.deleteMenuItem(id);
    }
    async getOrders() {
        return this.orderService.getOrders();
    }
    async updateOrderStatus(id, updateOrderStatusDto) {
        return this.orderService.updateOrderStatus(id, updateOrderStatusDto);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        menu_item_service_1.MenuItemService,
        order_service_1.OrderService])
], AdminService);
//# sourceMappingURL=admin.service.js.map