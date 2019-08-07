import axios from 'axios';
const API_KEY: any = process.env.API_KEY;

// Person Data
export const getPersonData = async (id: number) => {
  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
  const response: any = await axios.get(url);
  return response.data;
};

// Images
export const getPersonImages = async (id: number) => {
  const url = `https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
};

// Movie Credits
export const getMovieCredits = async (id: number) => {
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
};

// TV Credits
export const getTVCredits = async (id: number) => {
  const url = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
};
