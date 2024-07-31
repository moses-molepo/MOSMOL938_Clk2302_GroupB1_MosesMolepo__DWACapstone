import PropTypes from 'prop-types';
import { Card, CardContent, Typography, IconButton, Container, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

const FavoriteEpisodes = ({ episodes, removeFromFavorites, podcastId }) => {
  const [sortedEpisodes, setSortedEpisodes] = useState(episodes);
  const [sortOrder, setSortOrder] = useState('titleAsc'); // Default sort order

  useEffect(() => {
    // Save favorite episodes to localStorage whenever they change
    localStorage.setItem(`favoriteEpisodes_${podcastId}`, JSON.stringify(episodes));
    setSortedEpisodes(episodes);
  }, [episodes, podcastId]);

  useEffect(() => {
    sortEpisodes(sortOrder);
  }, [sortOrder]);

  const sortEpisodes = (order) => {
    let sorted = [...episodes];
    switch (order) {
      case 'titleAsc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateAddedAsc':
        sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      case 'dateAddedDesc':
        sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      default:
        break;
    }
    setSortedEpisodes(sorted);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Favorite Episodes
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={() => setSortOrder('titleAsc')}>
          Sort by Title A-Z
        </Button>
        <Button variant="contained" onClick={() => setSortOrder('titleDesc')} style={{ marginLeft: 8 }}>
          Sort by Title Z-A
        </Button>
        <Button variant="contained" onClick={() => setSortOrder('dateAddedAsc')} style={{ marginLeft: 8 }}>
          Sort by Date Added Asc
        </Button>
        <Button variant="contained" onClick={() => setSortOrder('dateAddedDesc')} style={{ marginLeft: 8 }}>
          Sort by Date Added Desc
        </Button>
      </Box>
      <Box>
        {sortedEpisodes.map((episode) => (
          <Card key={episode.id} variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {episode.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Episode {episode.episode}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {episode.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Added on: {new Date(episode.dateAdded).toLocaleString()}
              </Typography>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <IconButton onClick={() => removeFromFavorites(episode.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

FavoriteEpisodes.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      episode: PropTypes.number.isRequired,
      file: PropTypes.string.isRequired,
      dateAdded: PropTypes.string.isRequired, // Ensure this field exists
    })
  ).isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  podcastId: PropTypes.string.isRequired,
};

export default FavoriteEpisodes;
