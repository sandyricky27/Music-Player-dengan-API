const previous = document.querySelector("#pre")
const play = document.querySelector("#play")
const next = document.querySelector("#next")
const title = document.querySelector("#title")
let recent_volume = document.querySelector("#volume")
let volume_show = document.querySelector("#volume_show")
const slider = document.querySelector("#duration_slider")
const show_duration = document.querySelector("#show_duration")
let track_image = document.querySelector("#track_img")
const auto_play = document.querySelector("#auto")
const presenr = document.querySelector("#present")
const total = document.querySelector("#total")
const artist = document.querySelector("#artist")


let timer
let autoplay = 0

let index_no = 0
let playing_song = false

// audio element
let track = document.createElement("audio")

// song list

let All_song = [
    {
        name: "Sugeng Ndalu",
        path: "music/song1.mp3",
        img: "img/deni.jpg",
        singer: "Denny Caknan"
    },
    {
        name: "second song",
        path: "music/song2.mp3",
        img: "img/yeni1.jpg",
        singer: "Yenni Inkaaa"
    },
    {
        name: "Tak Bosan Bosan",
        path: "music/Yeni inka - tak bosan.mp3",
        img: "img/yeni2.jpg",
        singer: "Yeni Inkaa"
    }
]

// fungsi

// load track
function load_track(index_no) {
    clearInterval(timer)
    reset_slider()
    track.src = All_song[index_no].path
    title.innerHTML = All_song[index_no].name
    track_image.src = All_song[index_no].img
    artist.innerHTML = All_song[index_no].singer
    track.load()

    total.innerHTML = All_song.length
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider, 1000)
}
load_track(index_no)

// reset song slider
function reset_slider() {
    slider.value = 0
}

// cek song play or not
function justplay() {
    if (playing_song == false) {
        playsong()
    } else {
        pausesong()
    }
}

//mute
function mute_sound(){
    track.volume = 0
    volume.value = 0
    volume_show.innerHTML = 0
}

// play 
function playsong() {
    track.play()
    playing_song = true
    play.innerHTML = '<i class="fa fa-pause"></i>'
}

// pause
function pausesong() {
    track.pause()
    playing_song = false
    play.innerHTML = '<i class="fa fa-play"></i>'
}

// next
function next_song() {
    if (index_no < All_song.length - 1) {
        index_no += 1
        load_track(index_no)
        playsong()
    } else {
        index_no = 0
        load_track(index_no)
        playsong()
    }
}

// previous
function previous_song() {
    if (index_no > 0) {
        index_no -= 1
        load_track(index_no)
        playsong()
    } else {
        index_no = All_song.length;
        load_track(index_no)
        playsong()
    }
}

// volume
function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100
}

// slider
function change_duration() {
    slider_position = track.duration * (slider.value / 100)
    track.currentTime = slider_position
}

// autolpay
function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0
        auto_play.style.background = "rgba(255,255,255,0.2)"
    } else {
        autoplay = 1
        auto_play.style.background = "#ff8a65"
    }
}

function range_slider() {
    let position = 0

    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration)
        slider.value = position
    }

    // akan berjalan saat lagu selesai
    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play></i>'
        if (autoplay == 1) {
            index_no += 1;
            load_track(index_no)
            playsong()
        }
    }

}