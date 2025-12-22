import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Fetches all categories along with their associated menu items for the homepage
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
}
