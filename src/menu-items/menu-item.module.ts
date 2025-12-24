import { Module } from "@nestjs/common";
import { MenuItemService } from "./menu-item.service";
import { MenuItemController } from "./menu-item.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuItem } from "./entities/menu-item.entity";
import { CategoryModule } from "src/categories/category.module";

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem]), CategoryModule],
  controllers: [MenuItemController],
  providers: [MenuItemService],
  exports: [MenuItemService],
})
export class MenuItemModule {}
