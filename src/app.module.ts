import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";
import { MenuItemModule } from "./menu-items/menu-item.module";
import { OrderModule } from "./orders/order.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "./categories/category.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    MenuItemModule,
    OrderModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>("DB_URL"),
        autoLoadEntities: true,
        synchronize: configService.get<string>("NODE_ENV") !== "production",
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
