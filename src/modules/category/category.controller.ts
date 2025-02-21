import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(UploadFileS3('image'))//we make an interceptor and use it in here(UploadFileS3)
  create(
    @UploadedFile(new ParseFilePipe({
      validators : [
        new MaxFileSizeValidator({maxSize : 10 * 1024 * 1024}) , //the file should be less than 10 mgb.
        new FileTypeValidator({fileType : 'image/(png|jpg|jpeg|webp)'})
      ] ,
    })//important***: we use upload file and  upload file interceptor because we use third party service for storage our category image instead in our main server that upload our website.***
  )image : Express.Multer.File
    @Body() createCategoryDto: CreateCategoryDto) {
      return {
        image
      }
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
