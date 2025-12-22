import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from 'src/categories/category.service';
import { MenuService } from 'src/menu-items/menu.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { Category } from 'src/categories/entities/category.entity';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';

@Injectable()
export class AdminService {
  constructor(
    private categoryService: CategoryService,
    private menuService: MenuService,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async getMenuItems() {
    return this.menuService.findAll();
  }

  async getOrders() {
    return this.orderRepository.find({ relations: ['orderItems'] });
  }
}
