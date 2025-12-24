import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/users/entities/user.entity";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<Partial<User> | null>;
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    signin(user: Partial<User>): Promise<{
        access_token: string;
    }>;
}
