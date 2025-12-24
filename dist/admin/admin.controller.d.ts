import { AdminService } from './admin.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CreateMenuItemDto } from 'src/menu-items/dto/create-menu-item.dto';
import { UpdateMenuItemDto } from 'src/menu-items/dto/update-menu-item.dto';
import { UpdateOrderStatusDto } from 'src/orders/dto/update-order-status.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCategories(): Promise<import("../categories/entities/category.entity").Category[]>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<import("../categories/entities/category.entity").Category>;
    updateCategory(categoryId: string, updateCategoryDto: any): Promise<import("../categories/entities/category.entity").Category>;
    deleteCategory(categoryId: string): Promise<boolean>;
    getMenuItems(): Promise<import("../menu-items/entities/menu-item.entity").MenuItem[]>;
    createMenuItem(createMenuItemDto: CreateMenuItemDto): Promise<import("../menu-items/entities/menu-item.entity").MenuItem>;
    updateMenuItem(menuItemId: string, updateMenuItemDto: UpdateMenuItemDto): Promise<import("../menu-items/entities/menu-item.entity").MenuItem>;
    deleteMenuItem(menuItemId: string): Promise<boolean>;
    getOrders(): Promise<import("../orders/entities/order.entity").Order[]>;
    updateOrderStatus(updateOrderStatusDto: UpdateOrderStatusDto): Promise<void>;
}
