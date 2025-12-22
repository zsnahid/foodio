import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class UpdateMenuDto extends PartialType(CreateMenuItemDto) {}
