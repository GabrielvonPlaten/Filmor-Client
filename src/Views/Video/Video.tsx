import React, { useState, useEffect } from 'react';
import './Video.sass';

// APIS
import { getMovieData, getMovieVideo } from '../../apis/moviesService';
import { MatchIdInterface } from '../../types/MatchInterface';

const Video: React.FC<{ match: MatchIdInterface }> = ({ match }) => {
  const [videoData, setVideoData] = useState<any[]>([]);
  const [movieData, setMovieData] = useState<any>([]);

  useEffect(() => {
    fetchVideo();
  }, [match]);

  const fetchVideo = async () => {
    const movieResponse = await getMovieData(match.params.id);
    const videoResponse = await getMovieVideo(match.params.id);

    setMovieData(movieResponse);
    setVideoData(videoResponse);
  };

  console.log(movieData);

  return (
    <div
      className='video'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
      }}
    >
      <div className='video-container'>
        <div className='video-header'>
          <h2>Video View</h2>
        </div>
      </div>
    </div>
  );
};

export default Video;
