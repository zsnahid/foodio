import { User } from 'src/users/entities/user.entity';
import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    PREPARING = "preparing",
    READY = "ready",
    COMPLETED = "completed"
}
export declare class Order {
    id: string;
    totalPrice: number;
    status: string;
    user: User;
    orderItems: OrderItem[];
    createdAt: Date;
}
