import  { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import PodcastCarousel from './PodcastCarousel';

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

const PodcastList = ({ podcastData }) => {
  const [sortBy, setSortBy] = useState('asc');
  const [searchTermTitle, setSearchTermTitle] = useState('');
  const [searchTermGenre, setSearchTermGenre] = useState('');

  const handleSortChange = () => {
    setSortBy((prevSortBy) => (prevSortBy === 'asc' ? 'desc' : 'asc'));
  };

  const handleTitleSearchChange = (event) => {
    setSearchTermTitle(event.target.value);
  };

  const handleGenreSearchChange = (event) => {
    setSearchTermGenre(event.target.value);
  };

  const sortedAndFilteredPodcasts = podcastData
    .filter((podcast) =>
      podcast.title.toLowerCase().includes(searchTermTitle.toLowerCase()) &&
      (searchTermGenre === '' || podcast.genres.includes(Number(searchTermGenre)))
    )
    .sort((a, b) => (sortBy === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

  return (
    <div>
      <div className="header-content" style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Search by Title"
          value={searchTermTitle}
          onChange={handleTitleSearchChange}
          style={{ padding: '5px', margin: '50px' }}
        />
        <FormControl style={{ margin: '50px' }}>
          <Typography>Search by Genre</Typography>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={searchTermGenre}
            onChange={handleGenreSearchChange}
          >
            <MenuItem value="">All Genres</MenuItem>
            {Object.entries(genreMapping).map(([id, title]) => (
              <MenuItem key={id} value={id}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" style={{ padding: 10 }} onClick={handleSortChange} color="primary">
          Sort by Title {sortBy === 'asc' ? 'Z-A' : 'A-Z'}
        </Button>
      </div>

      <PodcastCarousel podcasts={sortedAndFilteredPodcasts} />
    </div>
  );
};

PodcastList.propTypes = {
  podcastData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      seasons: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(PropTypes.number).isRequired,
      updated: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PodcastList;
