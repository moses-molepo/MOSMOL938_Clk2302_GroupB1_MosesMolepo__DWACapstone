import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
  Button,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import Episodes from './Episodes.jsx';
import FavoriteEpisodes from './FavoriteEpisodes.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const truncateDescription = (text, limit) => {
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
};

const PodcastCard = ({ podcast }) => {
  const [selectedSeason, setSelectedSeason] = useState(() => {
    return localStorage.getItem(`selectedSeason_${podcast.id}`) || '';
  });
  const [closedSeasons, setClosedSeasons] = useState(() => {
    const storedClosedSeasons = localStorage.getItem(`closedSeasons_${podcast.id}`);
    return storedClosedSeasons ? JSON.parse(storedClosedSeasons) : [];
  });
  const [favoriteEpisodes, setFavoriteEpisodes] = useState(() => {
    const storedFavoriteEpisodes = localStorage.getItem(`favoriteEpisodes_${podcast.id}`);
    return storedFavoriteEpisodes ? JSON.parse(storedFavoriteEpisodes) : [];
  });
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [errorGenres, setErrorGenres] = useState(null);
  const [showAllDescription, setShowAllDescription] = useState(false);
  
  const genreMapping = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };
  

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/genre/${podcast.genres[0]}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        setErrorGenres(error);
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, [podcast.genres]);

  const handleSeasonChange = useCallback((event) => {
    const season = event.target.value;
    setSelectedSeason(season);
    localStorage.setItem(`selectedSeason_${podcast.id}`, season);
  }, [podcast.id]);

  const handleAddEpisodeToFavorites = useCallback((episode) => {
    setFavoriteEpisodes((prevEpisodes) => {
      const isAlreadyFavorite = prevEpisodes.some(e => e.id === episode.id);
      const updatedFavorites = isAlreadyFavorite
        ? prevEpisodes.filter(e => e.id !== episode.id)
        : [...prevEpisodes, episode];

      localStorage.setItem(`favoriteEpisodes_${podcast.id}`, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }, [podcast.id]);

  const handleRemoveFavoriteEpisode = useCallback((episodeId) => {
    setFavoriteEpisodes((prevEpisodes) => {
      const updatedFavorites = prevEpisodes.filter(e => e.id !== episodeId);
      localStorage.setItem(`favoriteEpisodes_${podcast.id}`, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }, [podcast.id]);

  const handleCloseSeason = useCallback(() => {
    setClosedSeasons((prevClosedSeasons) => {
      const updatedClosedSeasons = [...prevClosedSeasons, selectedSeason];
      localStorage.setItem(`closedSeasons_${podcast.id}`, JSON.stringify(updatedClosedSeasons));
      return updatedClosedSeasons;
    });
  }, [selectedSeason, podcast.id]);

  const handleSeeMoreClick = useCallback(() => {
    setShowAllDescription(true);
  }, []);

  const handleSeeLessClick = useCallback(() => {
    setShowAllDescription(false);
  }, []);

  const truncatedDescription = useMemo(() => truncateDescription(podcast.description, 30), [podcast.description]);
  const fullDescription = podcast.description;

  const isFavoriteEpisode = useCallback((episodeId) => favoriteEpisodes.some(e => e.id === episodeId), [favoriteEpisodes]);
  const isClosedSeason = useMemo(() => closedSeasons.includes(selectedSeason), [closedSeasons, selectedSeason]);

  if (loadingGenres) return <Loader />;
  if (errorGenres) return <Error />;

  return (
    <Card sx={{ color: 'white', padding: '10px', margin: '30px', borderRadius: '20px', backgroundColor: 'rgba(18, 224, 159, 0.174)', boxShadow: '0 2px 4px rgba(9, 161, 158, 0.853)' }}>
      <Container>
        <CardMedia
          component="img"
          alt={podcast.title}
          height="210"
          image={podcast.image}
          sx={{ width: 210, height: 210, borderRadius: 2, paddingTop: 1 }}
        />
        <CardContent>
          <Typography variant="h6">{podcast.title}</Typography>
          <Typography variant="body1">
            Description: {showAllDescription ? fullDescription : truncatedDescription}
            {!showAllDescription && <Button onClick={handleSeeMoreClick}>See More</Button>}
            {showAllDescription && <Button onClick={handleSeeLessClick}>See Less</Button>}
          </Typography>
          <Typography variant='h6'>
            Genre: {podcast.genres.map((genreId) => genreMapping[genreId]).join(', ')}
          </Typography>
          <FormControl>
            <Select
              value={selectedSeason || ''}
              onChange={handleSeasonChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Season' }}
            >
              <MenuItem value="" disabled>Select Season</MenuItem>
              {Array.from({ length: podcast.seasons }).map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>Season {index + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedSeason && (
            <div className="season-details">
              <Typography variant="h6">Number of Seasons: {podcast.seasons}</Typography>
              <Typography variant="body2">Updated: {new Date(podcast.updated).toLocaleDateString()}</Typography>
              <Button
                variant="outlined"
                onClick={handleCloseSeason}
                disabled={isClosedSeason}
              >
                {isClosedSeason ? 'Season Closed' : 'Close Season'}
              </Button>
            </div>
          )}
        </CardContent>
      </Container>

      {selectedSeason && !isClosedSeason && (
        <Episodes
          podcastId={podcast.id}
          selectedSeason={selectedSeason}
          onToggleFavoriteEpisode={handleAddEpisodeToFavorites}
          isFavoriteEpisode={isFavoriteEpisode}
        />
      )}

<FavoriteEpisodes
      episodes={favoriteEpisodes}
      removeFromFavorites={handleRemoveFavoriteEpisode}
      podcastId={podcast.id}
    />

    </Card>
  );
};

const PodcastCarousel = ({ podcasts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (!podcasts || podcasts.length === 0) {
    return <div>No podcasts available</div>;
  }

  return (
    <Slider {...settings}>
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </Slider>
  );
};

PodcastCard.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    updated: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

PodcastCarousel.propTypes = {
  podcasts: PropTypes.arrayOf(PodcastCard.propTypes.podcast).isRequired,
};

export default PodcastCarousel;
