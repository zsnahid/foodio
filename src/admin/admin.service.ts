import { Injectable } from "@nestjs/common";
import { CategoryService } from "src/categories/category.service";
import { MenuItemService } from "src/menu-items/menu-item.service";
import { Order } from "src/orders/entities/order.entity";
import { CreateCategoryDto } from "src/categories/dto/create-category.dto";
import { Category } from "src/categories/entities/category.entity";
import { UpdateCategoryDto } from "../categories/dto/update-category.dto";
import { CreateMenuItemDto } from "src/menu-items/dto/create-menu-item.dto";
import { MenuItem } from "src/menu-items/entities/menu-item.entity";
import { UpdateMenuItemDto } from "src/menu-items/dto/update-menu-item.dto";
import { UpdateOrderStatusDto } from "src/orders/dto/update-order-status.dto";
import { OrderService } from "../orders/order.service";

@Injectable()
export class AdminService {
  constructor(
    private categoryService: CategoryService,
    private menuItemService: MenuItemService,
    private orderService: OrderService
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }

  async getMenuItems() {
    return this.menuItemService.findAll();
  }

  async createMenuItem(
    createMenuItemDto: CreateMenuItemDto
  ): Promise<MenuItem> {
    return this.menuItemService.createMenuItem(createMenuItemDto);
  }

  async updateMenuItem(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto
  ): Promise<MenuItem> {
    return this.menuItemService.updateMenuItem(id, updateMenuItemDto);
  }

  async deleteMenuItem(id: string): Promise<boolean> {
    return this.menuItemService.deleteMenuItem(id);
  }

  async getOrders(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(id, updateOrderStatusDto);
  }
}
