// Write your javascript here

tracks = [
  {
    name: "Let me down slowly",
    artist: "Alec Benjamin",
    cover: "./images/alec.jpg",
    source: "./songs/Let me down slowly.mp3",
  },
  {
    name: "Let me love you",
    artist: "DJ Snake/Justin Beiber",
    cover: "./images/dj.jpg",
    source: "./songs/Let me love you.mp3",
  },
  {
    name: "Perfect",
    artist: "Ed Sheeran",
    cover: "./images/ed.jpg",
    source: "./songs/Perfect.mp3",
  },
];
let currentSong = 0;

const progress = document.getElementById("progress");
const song = document.getElementById("song");
const songSource = document.getElementById("song-source");
const playPause = document.getElementById("playPause");
const ctrlIcon = document.getElementById("ctrlIcon");
const Duration = document.querySelector(".duration");
const currentTime = document.querySelector(".current-time");
const prevBtn = document.querySelector(".skip-back");
const forwardBtn = document.querySelector(".skip-forward");
const audioTitle = document.querySelector(".audio-title");
const audioSinger = document.querySelector(".audio-singer");
const songCover = document.querySelector(".img ");

document.addEventListener("DOMContentLoaded", function () {
  songChange(currentSong);
  Player();
});

function Player() {
  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    Duration.innerHTML = formatTime(song.duration);
  };

  ctrlIcon.addEventListener("click", () => {
    if (playPause.classList.contains("fa-pause")) {
      song.pause();
      playPause.classList.remove("fa-pause");
      playPause.classList.add("fa-play");
    } else {
      song.play();
      playPause.classList.add("fa-pause");
      playPause.classList.remove("fa-play");
    }
  });
  prevBtn.addEventListener("click", () => {
    if (currentSong === 0) {
      currentSong = tracks.length - 1;
    } else currentSong--;

    songChange(currentSong);
  });
  forwardBtn.addEventListener("click", () => {
    if (currentSong === tracks.length - 1) {
      currentSong = 0;
    } else currentSong++;
    songChange(currentSong);
  });

  progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    playPause.classList.add("fa-pause");
    playPause.classList.remove("fa-play");
  };
  setInterval(() => {
    progress.value = song.currentTime;
    currentTime.innerHTML = formatTime(song.currentTime);
  }, 300);
  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
      min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }

    return `${min} : ${sec}`;
  };
}
function songChange(index) {
  songSource.src = tracks[currentSong].source;
  audioSinger.textContent = tracks[currentSong].artist;
  audioTitle.textContent = tracks[currentSong].name;
  songCover.src = tracks[currentSong].cover;
  song.load();
}

