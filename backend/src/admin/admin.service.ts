import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from 'src/categories/category.service';
import { MenuService } from 'src/menu-items/menu.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { Category } from 'src/categories/entities/category.entity';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { CreateMenuItemDto } from 'src/menu-items/dto/create-menu-item.dto';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { UpdateMenuItemDto } from 'src/menu-items/dto/update-menu-item.dto';

@Injectable()
export class AdminService {
  constructor(
    private categoryService: CategoryService,
    private menuService: MenuService,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
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

  async createMenuItem(
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItem> {
    const { categoryId, ...menuItemDetails } = createMenuItemDto;
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const menuItem = this.menuItemRepository.create({
      ...menuItemDetails,
      category,
    });
    return this.menuItemRepository.save(menuItem);
  }

  async updateMenuItem(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.preload({
      id,
      ...updateMenuItemDto,
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return this.menuItemRepository.save(menuItem);
  }

  async deleteMenuItem(id: string): Promise<boolean> {
    const result = await this.menuItemRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async getOrders() {
    return this.orderRepository.find({ relations: ['orderItems'] });
  }
}
