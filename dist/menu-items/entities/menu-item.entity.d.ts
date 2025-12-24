import { Category } from 'src/categories/entities/category.entity';
export declare class MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    category: Category;
}
