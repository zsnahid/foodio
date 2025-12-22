import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CreateMenuItemDto } from 'src/menu-items/dto/create-menu-item.dto';
import { UpdateMenuItemDto } from 'src/menu-items/dto/update-menu-item.dto';

@Controller('admin')
// ** All endpoints are protected by a guard to ensure only users with ADMIN role can access them
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // List all categories
  @Get('categories')
  async getCategories() {
    return this.adminService.getCategories();
  }

  // Create a new category
  @Post('categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminService.createCategory(createCategoryDto);
  }

  // Edit category details
  @Patch('categories/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto,
  ) {
    return this.adminService.updateCategory(categoryId, updateCategoryDto);
  }

  // Delete a category
  @Delete('categories/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return this.adminService.deleteCategory(categoryId);
  }

  // List all menu items
  @Get('menu-items')
  async getMenuItems() {
    return this.adminService.getMenuItems();
  }

  // Create a new menu item
  @Post('menu-items')
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.adminService.createMenuItem(createMenuItemDto);
  }

  // Update item details or set availability
  @Patch('menu-items/:menuItemId')
  async updateMenuItem(
    @Param('menuItemId') menuItemId: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.adminService.updateMenuItem(menuItemId, updateMenuItemDto);
  }

  // Delete a menu item
  @Delete('menu-items/:menuItemId')
  async deleteMenuItem(@Param('menuItemId') menuItemId: string) {
    return this.adminService.deleteMenuItem(menuItemId);
  }

  // List all orders
  @Get('orders')
  async getOrders() {
    return this.adminService.getOrders();
  }

  // Update order status
  @Patch('orders/:id/status')
  async updateOrderStatus() {}
}
