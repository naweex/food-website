import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { isBoolean, toBoolean } from 'src/common/utility/function.utils';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private categoryRepository:Repository<CategoryEntity> ,
  private s3Service : S3Service
){}
  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const {Location} = await this.s3Service.uploadFile(image , 'food-website-image')//create food-website-image file and uload images into there.
    let {parentId , show , slug , title } = createCategoryDto
    const category = await this.findOneBySlug(slug)
    if(category) throw new ConflictException('category already existed')
    if(isBoolean(show)) {
      show = toBoolean(show);
    }
    let parent : CategoryEntity = null;
    if(parentId && !isNaN(parentId)){
      parent = await this.findOneById(+parentId)
    }
    await this.categoryRepository.insert({
      title ,
      slug ,
      show ,
      image : Location ,
      parentId : parent?.id,
  })
  return {
    message : ' category created successfully'
    }
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOneById(id: number) {
    const category = await this.categoryRepository.findOneBy({id})
    if (!category) throw new NotFoundException('category not found')
      return category;
  }
  
  async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({slug})
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
