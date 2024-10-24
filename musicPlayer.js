let openIcon = document.querySelector('.fa-bars')
let menu = document.querySelector('.menu--bar')

openIcon.addEventListener('click' , function(){
    if(openIcon.className.includes('fa fa-bars')){
        menu.style.left = '0px'
        openIcon.className = 'fa fa-times'
    }else{
        menu.style.left = '-250px'
        openIcon.className = 'fa fa-bars'
    }
})

// ==========  music palyer =========================

let songerImage = document.querySelector('.music-image')
let music = document.querySelector('audio');
let songerName = document.querySelector('.songer-name')
let musicTitle = document.querySelector('.music-name')

let showCurrentTime = document.querySelector('.current-time')
let showDurationTime = document.querySelector('.duration-time')

let timeLine = document.querySelector('.proccess-bar')
let progress =  document.querySelector('.dynamic-bar')

let backward = document.querySelector('.fa-backward-step')
let playaudio = document.querySelector('.fa-circle-play')
let forward = document.querySelector('.fa-forward-step')
let musicSound = document.querySelector('.sound')

let AlbumList = document.querySelector('.album-list')

let musicList = [
    {
        id : 1,
        songsrc: 'musicPlayer/Aron Afshar - Delbare Shirin (320).mp3',
        artist : 'Aron Afshar',
        musicName : 'Delbare Shirin',
        image : 'image/Aron-Afshar.jpg'
    },
    {
        id : 2,
        songsrc: 'musicPlayer/Aron Afshar - Zelzeleh (320).mp3',
        artist : 'Aron Afshar',
        musicName : 'Zelzeleh',
        image : 'image/Aron-Afshar-1.jpg'
    },
    {
        id : 3,
        songsrc: 'musicPlayer/What Jhumka - Rocky Aur Rani Kii Prem Kahaani.mp3',
        artist : 'Arijit singh',
        musicName : 'What Jhumka',
        image : 'image/arijit-singh-1.jpg'
    },
    {
        id : 4,
        songsrc: 'musicPlayer/made_in_india_songsmp3.com_.mp3',
        artist : 'Guru Randhawa',
        musicName : 'made in india',
        image : 'image/gura-1.jpg'
    },
    {
        id : 5,
        songsrc: 'musicPlayer/high_rated_gabru_-_guru_randhawa.mp3',
        artist : 'Guru Randhawa',
        musicName : 'High rated gabru',
        image : 'image/gura-2.jpg'
    },
    {
        id : 6,
        songsrc: 'musicPlayer/Teri Choriyaan From Chhalaang.m4a.mp3',
        artist : 'Guru Randhawa',
        musicName : 'Teri Choriyaan',
        image : 'image/guru-3.jpg'
    },
    {
        id : 7,
        songsrc: 'musicPlayer/Hendi Delbar (320).mp3',
        artist : 'Nora Fatahi',
        musicName : 'Delbar',
        image : 'image/nora-fatahi.jpg'
    },
    {
        id : 8,
        songsrc: 'musicPlayer/shahrokh - Main Yahaan Hoon.mp3',
        artist : 'ShahRokh Khan',
        musicName : 'Main Yahaan Hoon',
        image : 'image/srk-1.jpg'
    },
    {
        id : 9,
        songsrc: 'musicPlayer/chad-gayi-hai - shahrokh.mp3',
        artist : 'ShahRokh Khan',
        musicName : 'chad gayi hai',
        image : 'image/srk-2.jpg'
    }
]

musicList.forEach(function(item){
    AlbumList.insertAdjacentHTML('beforeend' , '<div class="misc-item" onclick = "selectMusic('+ 
    item.id +')"><div class="misc-info"><audio src="'+
    item.songsrc +'"></audio><div class="misc-image"><img src="'+
    item.image +'" alt="sky" class="misc-img"></div><div class="songer-misc"><span class="misc-name">'+
    item.artist +'</span><span class="misc-kind">'+
    item.musicName +'</span></div></div><i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i></div>')
})

function selectMusic(songId){
    let newMusic = musicList.find(function(item){
        return item.id === songId;
    })
    // console.log(newMusic)
    songerImage.setAttribute('src' , newMusic.image);
    music.setAttribute('src' , newMusic.songsrc);
    songerName.innerHTML = newMusic.artist;
    musicTitle.innerHTML = newMusic.musicName;
    playMusic();
}

// ================ play music =======================

let isplay = false;

function playMusic(){
    isplay = true;
    playaudio.classList.replace('fa-circle-play' , 'fa-circle-pause');
    music.play();
}
function pauseMusic(){
    isplay = false;
    playaudio.classList.replace('fa-circle-pause' , 'fa-circle-play');
    music.pause();
}

playaudio.addEventListener('click' , function(){
    if (isplay) {
        pauseMusic()
    } else {
        playMusic()
    }
 })

//  ==================== next & prev ==================

function loadSong(item){
    songerImage.setAttribute('src' , item.image)
    music.src = item.songsrc
    songerName.innerHTML = item.artist
    musicTitle.innerHTML = item.musicName
}

let musicIndex = 0;

function nextmusic(){
    musicIndex++
    if (musicIndex > musicList.length - 1) {
        musicIndex = 0
    }
    loadSong(musicList[musicIndex]);
    playMusic()
}
function prevmusic(){
    musicIndex--
    if (musicIndex < 0) {
        musicIndex = musicList.length - 1;
    }
    loadSong(musicList[musicIndex]);
    playMusic()
}

forward.addEventListener('click' , nextmusic)
backward.addEventListener('click' , prevmusic)

// ===================== timline bar ===================

function setProgressBar(event){
    if (isplay) {
        let current = event.target.currentTime
        let duration = event.target.duration

        let progressPercent = (current / duration) * 100;
        progress.style.width = progressPercent + '%'

        let durationMinute = Math.floor(duration / 60);
        let durationSecond = Math.floor(duration % 60);
        if (durationSecond < 10) {
            durationSecond = "0" + durationSecond
        }
        if (durationSecond) {
            showDurationTime.innerHTML = durationMinute + ':' + durationSecond
        }

        let currentMinute = Math.floor(current / 60);
        let currentSecond = Math.floor(current % 60);
        if (currentSecond < 10) {
            currentSecond = "0" + currentSecond;
        }
        if (currentSecond) {
            showCurrentTime.innerHTML = currentMinute + ':' + currentSecond
        }
    }
}

function updateMusic(event){
    let width = this.clientWidth;
    let clickX = event.offsetX;
    let duration = music.duration;
    music.currentTime = (clickX / width) * duration
}

music.addEventListener('timeupdate' , setProgressBar)
music.addEventListener('ended' , nextmusic)
timeLine.addEventListener('click' , updateMusic)

// =============== change sound =======================

let stopSound = document.querySelector('.fa-volume-high')

musicSound.addEventListener('change' , function(){
    music.volume = musicSound.value / 100;
    if (music.volume === 0) {
        stopSound.classList.replace('fa-volume-high' , 'fa-volume-xmark')
    }else{
        stopSound.classList.replace('fa-volume-xmark' , 'fa-volume-high')
    }
})
