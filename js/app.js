//music
let soundButton = document.querySelector('.soundbutton'),
    audio = document.querySelector('.audio')

soundButton.addEventListener('click', e => {
    soundButton.classList.toggle('paused')
    audio.paused ? audio.play() : audio.pause()
});

//game

const lexx = document.getElementById("lexx");

document.addEventListener("keydown", function(event) {
    
    switch(event.key) {
        case "ArrowUp":
            lexx.style.top = lexx.offsetTop - 120 + "px";
            break;

        case "ArrowDown":
            lexx.style.top = lexx.offsetTop + .1 + "px";
            break;

        case " ":
                createFireshot();
                break;
    }
});

function createFireshot() {
    let fireshot = document.createElement("div");
    fireshot.className = "fireshot";
    fireshot.style.top = lexx.offsetTop + 130 + "px";
    fireshot.style.left = lexx.offsetLeft + 520 + "px";
    document.body.appendChild(fireshot);
    
    fireshotMove(fireshot)

    
}


function fireshotMove(fireshot) {
    let timerId = setInterval (function() {
        fireshot.style.left = fireshot.offsetLeft + 10 + "px"

        if(fireshot.offsetLeft > document.body.clientWidth) {
            fireshot.remove();
            clearInterval(timerId);
        }
    }, 30);
}