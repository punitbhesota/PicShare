import { Controller, Get, Post, Body, Query, Param, UseGuards, Put, Headers } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UserAuthGuard } from 'src/shared/guards/user-auth.guard';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get()
  findAll(
    @Headers('user_id') userId: number,
    @Query('pageNo') pageNo: number,
    @Query('isFavorite') isFavorite:boolean
  ) {
    return this.photosService.findAll(pageNo, userId,isFavorite);
  }

  @Post()
  @UseGuards(UserAuthGuard)
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Put(':id/favorite')
  @UseGuards(UserAuthGuard)
  favorite(@Param('id') id: number, @Headers('user_id') userId: number) {
    return this.photosService.favorite(id, userId);
  }
}
