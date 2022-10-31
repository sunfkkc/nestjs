import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovie(id: number): Movie {
    return this.movies.find((movie) => movie.id === id);
  }

  deleteMovie(id: number): Movie[] {
    return this.movies.filter((movie) => movie.id !== id);
  }

  createMovie(data: Omit<Movie, 'id'>): Movie[] {
    this.movies.push({ id: this.movies.length + 1, ...data });
    return this.movies;
  }
}
