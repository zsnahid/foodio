import { Order } from 'src/orders/entities/order.entity';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    address: string;
    password: string;
    role: UserRole;
    orders: Order[];
    createdAt: Date;
}
