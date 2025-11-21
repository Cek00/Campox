import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './Dtos/createReview.dto';
import { UpdateReviewDto } from './Dtos/updateReview.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reseñas')
@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post()
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewService.create(createReviewDto);
    }

    @Get()
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewService.update(id, updateReviewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(id);
    }
}
