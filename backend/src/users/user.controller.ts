import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('user')
// ** All endpoints are for authenticated users only **
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Order placement: validate price and availability before creating a new order
  @Post('orders/:userId')
  async placeOrder() {}

  // Order tracking: returns a list of user's orders
  @Get('orders/me')
  async trackOrders() {}

  // View details and current status of a specific order
  @Get('orders/:orderId')
  async viewOrderDetails() {}
}
