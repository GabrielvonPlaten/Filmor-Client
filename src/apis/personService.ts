import axios from 'axios';
const API_KEY: any = process.env.API_KEY;

export const getPersonData: any = async (id: number) => {
  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
  let response: any = await axios.get(url);
  return response.data;
};

// Images
export const getPersonImages: any = async (id: number) => {
  const url = `https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=${API_KEY}&language=en-US`;
  let response = await axios.get(url);
  return response.data;
};

// Movie Credits
export const getMovieCredits: any = async (id: number) => {
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`;
  let response = await axios.get(url);
  return response.data;
};

// TV Credits
export const getTVCredits: any = async (id: number) => {
  let url = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`;
  let response = await axios.get(url);
  return response.data;
};
