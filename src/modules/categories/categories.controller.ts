import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly appService: CategoriesService) { }

  @Post()
  createCategory(@Body() body) {
    return this.appService.createCategory(body)
  }
  
}
