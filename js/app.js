//music====
let soundButton = document.querySelector('.soundbutton'),
    audio = document.querySelector('.audio')

soundButton.addEventListener('click', e => {
    soundButton.classList.toggle('paused')
    audio.paused ? audio.play() : audio.pause()
});





//game
//create LEXX-------------------------------------------



let lexx = document.getElementById("lexx");

document.addEventListener("keydown", function(event) {
    
    switch(event.key) {
        case "ArrowUp":
            lexx.style.top = lexx.offsetTop - 30 + "px";
            break;

        case "ArrowDown":
            lexx.style.top = lexx.offsetTop + 30 + "px";
            break;

        case " ":
                createFireshot();
                break;
    }
});

//fireshot create

function createFireshot() {
    let fireshot = document.createElement("div");
    fireshot.className = "fireshot";

    fireshot.style.top = lexx.offsetTop + 25 + "px";
    fireshot.style.left = lexx.offsetLeft + 130 + "px";

    let display = document.getElementById("display-container");
    let parentDiv = display.parentNode;

    parentDiv.insertBefore(fireshot, display);
    
    fireshotMove(fireshot)

    
}
createPlanet()


function fireshotMove(fireshot) {
    let timerId = setInterval (function() {
        let display = document.getElementById("display-container");
        fireshot.style.left = fireshot.offsetLeft + 5 + "px"

        isShot(fireshot, timerId);


        if(fireshot.offsetLeft > display.clientWidth) {
            fireshot.remove();
            clearInterval(timerId);
        }
    }, 25);
}
//isShot
function isShot(fireshot, timer) {
    let topF = fireshot.offsetTop;
    let bottomF = fireshot.offsetTop + fireshot.offsetHeight;

    let planet = document.querySelector(".planet");
    if(planet != null) {
        let topP = planet.offsetTop;
        let bottomP = planet.offsetTop + planet.offsetHeight;
        
        let leftF = fireshot.offsetLeft;
        let leftP = planet.offsetLeft;
    
        if(topF >= topP && bottomF <= bottomP && leftF >= leftP) {
            planet.className = 'boom';
            planet.style.top = topP + "px";
            planet.style.left = leftP + "px";
            clearInterval(planet.dataset.timer);
            setTimeout(function() {
                planet.remove();
                createPlanet();
                clearInterval(timer);
            }, 1200)
        }
    }

}



//create Planet

function createPlanet() {
    let planet = document.createElement("div");
    planet.className = "planet";
    

    let display = document.getElementById("display-container");
    let parentDiv = display.parentNode;
    parentDiv.insertBefore(planet, display);

    planet.style.top = random(1, display.offsetHeight - 10) + "px";

    
    let timerId = setInterval(function() {

        planet.style.left = (planet.offsetLeft - 10) + "px";

        
        if(planet.offsetLeft + planet.offsetWidth < 100) {
            planet.remove();
            clearInterval(timerId);
            createPlanet();
        }
    }, 100);
    planet.dataset.timer = timerId;
    
}

//random 
function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


