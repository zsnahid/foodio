import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu-items')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Fetches all menu items (can be filtered by category)
  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    return this.menuService.findAll(categoryId);
  }
}
