import axios from 'axios';
const API_KEY = process.env.API_KEY; 


export default {
  getPopularMovies() {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    return axios.get(url);
  },

  getMovieById(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    return axios.get(url);
  }
}