import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findOne(email);
    const isValidUser = user && (await bcrypt.compare(pass, user.password));

    if (isValidUser) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(
    createUserDto: CreateUserDto
  ): Promise<{ access_token: string }> {
    const existingUser = await this.userService.findOne(createUserDto.email);
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;

    return this.signin(result);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async signin(user: Partial<User>): Promise<{ access_token: string }> {
    const payload = { username: user.name, role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
