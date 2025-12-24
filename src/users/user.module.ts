import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { MenuItemModule } from "src/menu-items/menu-item.module";
import { OrderModule } from "src/orders/order.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MenuItemModule,
    forwardRef(() => OrderModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
