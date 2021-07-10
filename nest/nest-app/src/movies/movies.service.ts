import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entitiy';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie: Movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number): Movie[] {
    // const movie = this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    // return this.movies;
    return this.movies;
  }

  create(movieData: CreateMovieDto) {
    const movie: Movie = { id: this.movies.length + 1, ...movieData };
    this.movies.push(movie);
    return movie;
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
    return this.movies;
  }
}
