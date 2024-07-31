import { useState, useEffect } from 'react';
import Loader from './Loader';
import Error from './Error';
import PodcastList from './PodcastList'; 


const PodcastContainer = () => {
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
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
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {podcastData && <PodcastList podcastData={podcastData} />}
    </>
  );
};

export default PodcastContainer;
