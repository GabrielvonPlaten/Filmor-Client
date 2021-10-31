import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import './Video.sass';

// Interfaces
import { MatchIdInterface } from '../../types/MatchInterface';

// APIS
import { getMovieData, getMovieVideo } from '../../apis/moviesService';
import { getTVShowData, GetTVShowVideo } from '../../apis/tvShowService';


// !TODO! Fix this match types
const Video: React.FC<{ match: any }> = ({ match }) => {
  const [videoData, setVideoData] = useState<any>([]);
  const [mediaData, setMediaData] = useState<any>([]);
  const [videoId, setVideoId] = useState<string>('')

  // Youtube options
  const opts: any = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    fetchVideo();
  }, [match]);

  const fetchVideo = async () => {
    if (match.params.mediatype === 'movie') {
      const movieResponse = await getMovieData(match.params.id);
      const videoResponse = await getMovieVideo(match.params.id);
  
      setMediaData(movieResponse);
      setVideoData(videoResponse);
      // Sets a video in the video player on component mounted
      setVideoId(videoResponse.results[0].key);
    }

    if (match.params.mediatype === 'tvshow') {
      const movieResponse = await getTVShowData(match.params.id);
      const videoResponse = await GetTVShowVideo(match.params.id);

      setMediaData(movieResponse);
      setVideoData(videoResponse);
      // Sets a video in the video player on component mounted
      setVideoId(videoResponse.results[0].key);
    }
  };

  const _onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const videoArray = videoData?.results;
  
  const changeVideo = (key: string) => {
    setVideoId(key)
  }
  
  // console.log(match);
  

  return (
    <div className='video' style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${mediaData.backdrop_path})`,
    }}>
        <div className='video-container'>
          { match.params.mediatype === 'movie' && 
            <Link to={`/movie/${mediaData.id}`}>
              <h1 className="media-video-description__title">{mediaData.title}</h1>
            </Link>
          }
          { match.params.mediatype === 'tvshow' && 
            <Link to={`/tvshow/${mediaData.id}`}>
              <h1 className="media-video-description__title">{mediaData.name}</h1>
            </Link>
          }
          <div className='video-header'>
            <img src={`https://image.tmdb.org/t/p/original${mediaData.poster_path}`} />
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
