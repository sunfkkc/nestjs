import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Movie[] {
    return this.moviesService.getMovies();
  }

  @Get('/:id')
  getMovie(@Param('id') id: number): Movie {
    return this.moviesService.getMovie(id);
  }

  @Post()
  create(@Body() data: Omit<Movie, 'id'>) {
    return this.moviesService.createMovie(data);
  }
}
