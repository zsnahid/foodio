import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem) private menuRepository: Repository<MenuItem>,
  ) {}
  findAll(categoryId?: string) {
    const findOptions: FindManyOptions<MenuItem> = {
      relations: ['category'],
    };

    if (categoryId) {
      findOptions.where = { category: { id: categoryId } };
    }

    return this.menuRepository.find(findOptions);
  }
}
