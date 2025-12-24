import { Controller, Get, Query } from "@nestjs/common";
import { MenuItemService } from "./menu-item.service";

@Controller("menu-items")
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  // Fetches all menu items (can be filtered by category)
  @Get()
  findAll(@Query("categoryId") categoryId?: string) {
    return this.menuItemService.findAll(categoryId);
  }
}
