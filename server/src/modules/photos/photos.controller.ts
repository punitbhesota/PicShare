import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UserAuthGuard } from 'src/shared/guards/user-auth.guard';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get()
  findAll(@Query('user_id') userId?: number) {
    return this.photosService.findAll(userId);
  }

  @Get('favorites')
  @UseGuards(UserAuthGuard)
  getFavorites(@Query('user_id') userId: number) {
    return this.photosService.getFavorites(userId);
  }

  @Post()
  @UseGuards(UserAuthGuard)
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Post(':id/favorite')
  @UseGuards(UserAuthGuard)
  favorite(@Param('id') id: string, @Query('user_id') userId: number) {
    return this.photosService.favorite(+id, userId);
  }
}
