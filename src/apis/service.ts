import axios from 'axios';
const API_KEY: any = process.env.API_KEY;

export default {
  // Search Results
  getSearchResults(query: string) {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
    return axios.get(url);
  },
};
