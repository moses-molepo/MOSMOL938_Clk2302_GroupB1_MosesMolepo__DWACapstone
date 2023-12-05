// Episodes.jsx

import { useEffect, useState } from 'react';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import { Container, Button } from '@mui/material';
import FavoriteEpisodes from './FavoriteEpisodes.jsx';

// eslint-disable-next-line react/prop-types
const Episodes = ({ podcastId }) => {
  const apiUrl = `https://podcast-api.netlify.app/id/${podcastId}`;
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPodcastData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleAddToFavorites = (episode) => {
    if (episode) {
      if (favoriteEpisodes.some((e) => e.id === episode.id)) {
        // Remove episode from favorites if already present
        setFavoriteEpisodes((prevEpisodes) =>
          prevEpisodes.filter((e) => e.id !== episode.id)
        );

        // Log removal data
        console.log('Removed from favorites:', episode);
      } else {
        // Add episode to favorites
        setFavoriteEpisodes((prevEpisodes) => [...prevEpisodes, episode]);

        // Log addition data
        console.log('Added to favorites:', episode);
      }
    }
  };

  function Template() {
    return (
      <Container>
        <div>
          {podcastData.seasons.map((season) => (
            <div key={season.season}>
              <h2>{season.title}</h2>

              {season.episodes.map((episode) => (
                <div key={episode.episode} className="episode">
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  <p>Episode: {episode.episode}</p>
                  <audio controls>
                    <source src={episode.file} type="audio/mp3" />
                    Your browser does not support the audio tag.
                  </audio>
                  {/* Render the button only once for each episode */}
                  <Button onClick={() => handleAddToFavorites(episode)}>
                    {favoriteEpisodes.some((e) => e.id === episode.id)
                      ? 'Remove from favorites'
                      : 'Add to favorites'}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {podcastData && <Template />}
      {/* Separate rendering of FavoriteEpisodes */}
      {favoriteEpisodes.length > 0 && <FavoriteEpisodes episodes={favoriteEpisodes} />}
    </>
  );
};

export default Episodes;
