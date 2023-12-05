// FavoriteEpisodes.jsx



const FavoriteEpisodes = ({ episodes }) => {
  // Ensure episodes is an array before mapping
  const favoriteEpisodes = episodes || [];

  return (
    <div>
      <h2>Favorite Episodes</h2>
      {favoriteEpisodes.map((episode) => (
        <div key={episode.id} className="favorite-episode">
          <h3>{episode.title}</h3>
          <h3>{episode.description}</h3>
          <audio controls>
             <source src={episode.file} type="audio/mp3" />
           Your browser does not support the audio tag.
            </audio>
        </div>
      ))}
    </div>
  );
};

export default FavoriteEpisodes;
