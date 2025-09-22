const printSong = (a, s, y) => {
    return "Your '90s Radiohead song is: " + s + " from " + a + " released in " + y
}

const main = () => {
    let data;
    try {
        data = require('/Users/bmoores/mooressource/radiohead.json');
    } catch (err) {
        console.error("No JSON found...");
    }

    if (data){
        if (data.discography.albums.length === 0) {
            console.error("No albums found...");
            return;
        }

        
        const album = data.discography.albums[Math.floor(Math.random() * data.discography.albums.length)];
        const name = album.name;

        if (album.songs.length === 0) {
            console.error("Album has no songs.");
            return;
        }
        
        const song = album.songs[Math.floor(Math.random() * album.songs.length)];
        const release = album.release;
        console.log(printSong(name, song, release));
    }
}

main();






