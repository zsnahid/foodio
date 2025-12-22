import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  // Fetches all categories along with their associated menu items for the homepage
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
