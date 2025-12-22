import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('admin')
// ** All endpoints is protected by a guard to ensure only users with ADMIN role can access them **
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // List all categories
  @Get('categories')
  async getCategories() {}

  // Create a new category
  @Post('categories')
  async createCategory() {}

  // Edit category details
  @Patch('categories/:id')
  async updateCategory() {}

  // Delete a category
  @Delete('categories/:id')
  async deleteCategory() {}

  // List all menu items
  @Get('menu-items')
  async getMenuItems() {}

  // Create a new menu item
  @Post('menu-items')
  async createMenuItem() {}

  // Update item details or set availability
  @Patch('menu-items/:id')
  async updateMenuItem() {}

  // Delete a menu item
  @Delete('menu-items/:id')
  async deleteMenuItem() {}

  // List all orders
  @Get('orders')
  async getAllOrders() {}

  // Update order status
  @Patch('orders/:id/status')
  async updateOrderStatus() {}
}
