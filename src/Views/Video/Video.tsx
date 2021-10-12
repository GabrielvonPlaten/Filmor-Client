import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './Video.sass';

// APIS
import { getMovieData, getMovieVideo } from '../../apis/moviesService';
import { MatchIdInterface } from '../../types/MatchInterface';
import { Link } from 'react-router-dom';

const Video: React.FC<{ match: MatchIdInterface }> = ({ match }) => {
  const [videoData, setVideoData] = useState<any>([]);
  const [movieData, setMovieData] = useState<any>([]);
  const [videoId, setVideoId] = useState<string>('')

  // Youtube options
  const opts: any = {
    height: '100%',
    width: '100%',
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

    // Sets a video in the video player on component mounted
    setVideoId(videoResponse.results[0].key);
  };

  const _onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const videoArray = videoData?.results;
  
  const changeVideo = (key: string) => {
    setVideoId(key)
  }
  

  return (
    <div className='video' style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
    }}>
        <div className='video-container'>
          <Link to={`/movie/${movieData.id}`}>
            <h1 className="media-video-description__title">{movieData.title}</h1>
          </Link>
          <div className='video-header'>
            <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} />
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={_onReady}
            />
          </div>
          <div className="media-video-description">
            <div className="media-video-list">
              <h2 className="media-video-list__title">| Similar Videos</h2>
              <ul>
                {videoArray && videoArray?.map((item: any) => (
                  <li key={item.id} onClick={() => changeVideo(item.key)}>
                    <img src={`https://img.youtube.com/vi/${item.key}/0.jpg`}/>
                    <p className={`media-video-list__video-title ${item.key === videoId ? 'video-selected' : ''}`}>{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Video;
