import { IsString, IsUrl, IsNumber } from 'class-validator';

export class CreatePhotoDto {
  @IsUrl()
  url: string;

  @IsString()
  title: string;

  @IsNumber()
  userId: number;
}