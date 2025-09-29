import logo from './TrixelIcon.png';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [albums, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/songs")
    .then(res => res.json())
    .then(data => setSongs(data))
    .catch(err => console.error("Error: ", err))
  }, []);

  return(
    <div style={{fontFamily: "Jersey 15, sans-serif"}}>
      <h1>Radiohead Songs</h1>
      <ul>
        {albums.map((album, i) => (
          <div key={i}>
            <h2>{album.name} ({album.release})</h2>
            <ul>
              {album.songs.map((song, j) => (
                <li key={j}>{song}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
