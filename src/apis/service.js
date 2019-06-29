import axios from 'axios';
const API_KEY = process.env.API_KEY; 


export default {
  // Movies
  getPopularMovies() {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    return axios.get(url);
  },

  getMovieById(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    return axios.get(url);
  },

  getCastAndCrew(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    return axios.get(url);
  },

  getSimilarMovies(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
    return axios.get(url);
  },

  // TV Shows
  getPopularTVShows() {
    let url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    return axios.get(url);
  },

  // People
  getTrendingPeople() {
    let url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`;
    return axios.get(url);
  },

  getPersonProfile(id) {
    let url = ` https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
    return axios.get(url);
  },

  getPersonImages(id) {
    let url = ` https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=${API_KEY}&language=en-US`;
    return axios.get(url);
  },

  getPersonMovieCredits(id) {
    let url = ` https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`;
    return axios.get(url);
  },

  // TV Shows
  getTVShow(id) {
    let url = ` https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
    return axios.get(url);
  },

  getTVShowCast(id) {
    let url = ` https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`;
    return axios.get(url);
  },

  getSimilarShows(id) {
    let url = ` https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
    return axios.get(url);
  },

  // Search Results
  getSearchResults(query) {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
    return axios.get(url);
  }
}