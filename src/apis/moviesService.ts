import axios from 'axios';
const API_KEY: any = process.env.API_KEY;

export const getMovieData = (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  return axios.get(url);
};

export const getSimilarMovies = (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
  return axios.get(url);
};

export const getMovieCast = (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
  return axios.get(url);
};
