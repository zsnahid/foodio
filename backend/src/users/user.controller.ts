import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@Controller('user')
// ** All endpoints are for authenticated users only **
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Order placement: validate price and availability before creating a new order
  @Post('place-order/:userId')
  async placeOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.userService.placeOrder(req.user.userId, createOrderDto);
  }

  // Order tracking: returns a list of user's orders
  @Get('orders/me/:userId')
  async trackOrders(@Request() req) {
    return this.userService.trackOrders(req.user.userId);
  }
}
