import axios from 'axios';
const API_KEY: string | undefined = process.env.API_KEY;

export const searchMedia = async (query: string) => {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
  const response = await axios.get(url);
  return response.data;
};
