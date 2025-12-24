import { MenuItemService } from "./menu-item.service";
export declare class MenuItemController {
    private readonly menuItemService;
    constructor(menuItemService: MenuItemService);
    findAll(categoryId?: string): Promise<import("./entities/menu-item.entity").MenuItem[]>;
}
