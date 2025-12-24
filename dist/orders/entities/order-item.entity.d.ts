import { Order } from './order.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
export declare class OrderItem {
    id: string;
    unitPrice: number;
    quantity: number;
    order: Order;
    menuItem: MenuItem;
}
