import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { CategoryModule } from "src/categories/category.module";
import { MenuItemModule } from "src/menu-items/menu-item.module";
import { OrderModule } from "src/orders/order.module";

@Module({
  imports: [CategoryModule, MenuItemModule, OrderModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
