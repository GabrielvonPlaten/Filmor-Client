import axios from 'axios';
const API_KEY: string | undefined = process.env.API_KEY;

// Popular TV-Show Data
export const getPopularTVShow = async () => {
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const response = await axios.get(url);
  return response.data;
};

// TV-Show Data
export const getTVShowData = async (id: number) => {
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
};

// Show Cast
export const getTVShowCast = async (id: number) => {
  const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
};

// Similar Shows
export const getSimilarTVShows = async (id: number) => {
  const url = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
  const response = await axios.get(url);
  return response.data;
};

export const GetTVShowVideo = async (id: number) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
