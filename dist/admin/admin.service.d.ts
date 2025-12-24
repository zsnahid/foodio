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
export declare class AdminService {
    private categoryService;
    private menuItemService;
    private orderService;
    constructor(categoryService: CategoryService, menuItemService: MenuItemService, orderService: OrderService);
    getCategories(): Promise<Category[]>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: string): Promise<boolean>;
    getMenuItems(): Promise<MenuItem[]>;
    createMenuItem(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem>;
    updateMenuItem(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem>;
    deleteMenuItem(id: string): Promise<boolean>;
    getOrders(): Promise<Order[]>;
    updateOrderStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order>;
}
