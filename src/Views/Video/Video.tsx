import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './Video.sass';

// APIS
import { getMovieData, getMovieVideo } from '../../apis/moviesService';
import { MatchIdInterface } from '../../types/MatchInterface';

const Video: React.FC<{ match: MatchIdInterface }> = ({ match }) => {
  const [videoData, setVideoData] = useState<any>([]);
  const [movieData, setMovieData] = useState<any>([]);

  const opts: any = {
    height: '468',
    width: '768',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  useEffect(() => {
    fetchVideo();
  }, [match]);

  const fetchVideo = async () => {
    const movieResponse = await getMovieData(match.params.id);
    const videoResponse = await getMovieVideo(match.params.id);

    setMovieData(movieResponse);
    setVideoData(videoResponse);
  };

  const _onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const videoKey = videoData?.results;
  console.log(videoKey && videoKey[0]);
  

  return (
    <div className='video'>
      <div
        className='poster-background'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
        }}
      ></div>
      <div className='video-container'>
        <div className='video-header'>
          <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} />
          <YouTube
            videoId={videoKey && videoKey[0].key}
            opts={opts}
            onReady={_onReady}
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
