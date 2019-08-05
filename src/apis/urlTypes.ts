const API_KEY: any = process.env.API_KEY;

export const POPULAR_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export const POPULAR_TV_SHOWS = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

export const POPULAR_PEOPLE = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`;
