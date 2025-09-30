import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [albums, setAlbums] = useState([]);
  const [query, setQuery] = useState("");
  const [openAlbum, setOpenAlbum] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/albums")
    .then(res => res.json())
    .then(data => setAlbums(data))
    .catch(err => console.error("Error: ", err))
  }, []);

  return(
    <div style={{fontFamily: "Jersey 15, sans-serif"}}>
      <h1>Radiohead Songs</h1>
      <input 
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder='Search a song!'
      style={{marginBottom: "20px", padding: "5px"}}
      />

      
        {albums.map(album => (
          <div key={album.name} style={{marginBottom: "20px"}}>
            <img
            src={`http://localhost:3001${album.art}`}
            alt={album.name}
            width="200"
            onClick={() =>
              setOpenAlbum(openAlbum === album.name ? null: album.name)
            }
            />
            <h2>
              {album.name} ({album.release})
            </h2>
            {openAlbum === album.name && (
              <ul>
                {album.songs
                .filter(song => 
                  song.toLowerCase().includes(query.toLowerCase())
                ).map(song => 
                  <li key={song}>{song}</li>
                )}
              </ul>
            )}
          </div>
        ))}
        {/*{albums.map((album, i) => (
          <div key={i}>
            <h2>{album.name} ({album.release})</h2>
            <ul>
              {album.songs.map((song, j) => (
                <li key={j}>{song}</li>                 OLD - Simply listed albums and song names
              ))}
            </ul>
          </div>
        ))}*/}
      
      
    </div>
  );
}

export default App;
