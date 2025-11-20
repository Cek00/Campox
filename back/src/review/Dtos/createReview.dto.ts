import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsEnum, IsUUID } from 'class-validator';
import { ReviewStatus } from 'src/enum/reviewStatus.enum';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  review: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  anonymous: boolean;

  @ApiProperty({ enum: ReviewStatus })
  @IsEnum(ReviewStatus)
  status: ReviewStatus;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID()
  productId: string;
}
