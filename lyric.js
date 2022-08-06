const btn = document.getElementById("search-btn");
const search = btn.addEventListener('click', () => {
    const songName = document.getElementById("search").value;
    document.getElementById("single-result").innerHTML = "";
    document.getElementById('lyric_display').innerHTML = "";
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then(res => res.json())
        .then(data => {
            if (data.total != 0) { getSongList(data.data); }
            else { document.getElementById("single-result").innerHTML = `<h2 class="text-warning text-center">No Song Found !!</h2>` }
        })

});
function getSongList(data) {
    for (let i = 0; i < 10; i++) {
        const album_name = data[i].title;
        const singer_name = data[i].artist.name;
        const image = data[i].artist.picture;
        const newElement = document.createElement("div");
        newElement.classList.add("row");
        newElement.innerHTML = `
    <div class="single-result row align-items-center my-3 p-3 ">
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col col-md-3">
                                    <img height="70" width="100" src="${image}" class="rounded">
                                </div>
                                <div class="col col-md-9">
                                    <h3 class="lyrics-name" id="album_name">${album_name}</h3>
                                    <p class="author lead">Album by <span id="singer_name">${singer_name}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button class="btn btn-success special_button"
                                onClick="getLyric('${singer_name}','${album_name}')">Get
                                Lyrics</button>
                        </div>
                    </div>
        `;
        document.getElementById("single-result").appendChild(newElement);


    }
}
function getLyric(singer_name, album_name) {
    document.getElementById('lyric_display').innerHTML = "";
    fetch(`https://api.lyrics.ovh/v1/${singer_name}/${album_name}`)
        .then(res => res.json())
        .then(data => {
            const lyricShow = document.createElement("div");
            let output = '';
            if (data.error) { output = data.error };
            if (data.lyrics) { output = data.lyrics };

            lyricShow.innerHTML = `
        <h3>${album_name}</h3>
        <h5>${singer_name}</h5>
        <pre >${output}</pre>
        `;




            document.getElementById('lyric_display').appendChild(lyricShow);
        })
}
