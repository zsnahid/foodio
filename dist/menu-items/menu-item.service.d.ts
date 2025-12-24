import { MenuItem } from "./entities/menu-item.entity";
import { Repository } from "typeorm";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";
import { CategoryService } from "src/categories/category.service";
export declare class MenuItemService {
    private menuItemRepository;
    private categoryService;
    constructor(menuItemRepository: Repository<MenuItem>, categoryService: CategoryService);
    findAll(categoryId?: string): Promise<MenuItem[]>;
    findOneByName(name: string): Promise<MenuItem | null>;
    createMenuItem(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem>;
    updateMenuItem(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem>;
    deleteMenuItem(id: string): Promise<boolean>;
}
