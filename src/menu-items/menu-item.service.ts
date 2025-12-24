import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuItem } from "./entities/menu-item.entity";
import { FindManyOptions, Repository } from "typeorm";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";
import { CategoryService } from "src/categories/category.service";

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    private categoryService: CategoryService
  ) {}
  async findAll(categoryId?: string) {
    const findOptions: FindManyOptions<MenuItem> = {
      relations: ["category"],
    };

    if (categoryId) {
      findOptions.where = { category: { id: categoryId } };
    }

    return this.menuItemRepository.find(findOptions);
  }

  async findOneByName(name: string): Promise<MenuItem | null> {
    return this.menuItemRepository.findOneBy({ name });
  }

  async createMenuItem(
    createMenuItemDto: CreateMenuItemDto
  ): Promise<MenuItem> {
    const { categoryId, ...menuItemDetails } = createMenuItemDto;
    const category = await this.categoryService.findOne(categoryId);

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
    updateMenuItemDto: UpdateMenuItemDto
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
}
