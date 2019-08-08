import axios from 'axios';
const API_KEY: any = process.env.API_KEY;

// Popular Movies
export const getPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const response: any = await axios.get(url);
  return response.data;
};

// Movie Data
export const getMovieData = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const response: any = await axios.get(url);
  return response.data;
};

// Similar Movies
export const getSimilarMovies = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
  const response: any = await axios.get(url);
  return response.data;
};

// Movie Cast
export const getMovieCast = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
  const response: any = await axios.get(url);
  return response.data;
};
