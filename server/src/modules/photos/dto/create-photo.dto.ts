import { IsString, IsUrl, IsNumber } from 'class-validator';

export class CreatePhotoDto {
  @IsUrl()
  url: string;

  @IsString()
  title: string;

  @IsNumber()
  user_id: number;
}