//music====
let soundButton = document.querySelector('.soundbutton'),
    audio = document.querySelector('.audio')

soundButton.addEventListener('click', e => {
    soundButton.classList.toggle('paused')
    audio.paused ? audio.play() : audio.pause()
});





//game
//score
let scoreBlock = document.querySelector('.game-score .score-count');

let score = 0;

function incScore() {
    score++;
    drawScore();
}
function drawScore() {
    scoreBlock.innerHTML = score;
}

drawScore();



//create LEXX-------------------------------------------




function createLexx() {
    const lexx = document.getElementById("lexx");
    lives = 3;


    // lexx.offsetTop 

    document.addEventListener("keydown", function(event) {
        let display = document.getElementById("display-container");
        switch(event.key) {
            case " ":
                createFireshot();
                break;

            case "ArrowUp":
                if(lexx.offsetTop > display.offsetTop) {
                lexx.style.top = lexx.offsetTop - 30 + "px";
                break;
                }

            case "ArrowDown":
                if(lexx.offsetTop + lexx.offsetHeight < display.offsetHeight) {
                lexx.style.top = lexx.offsetTop + 30 + "px";
                break;
                }
        }
    });
}

    const start = document.querySelector('.initial-display');
    start.addEventListener("mousedown", function(event) {
    start.style.display = 'none';
    createLexx();
    createPlanet();
})







const upper = document.querySelector('.key-up');
upper.addEventListener("mousedown", function(event) {
    let display = document.getElementById("display-container");
    if(lexx.offsetTop > display.offsetTop) {
    lexx.style.top = lexx.offsetTop - 30 + "px";
    }
});
const down = document.querySelector('.key-down');
down.addEventListener("mousedown", function(event) {
    let display = document.getElementById("display-container");
    if(lexx.offsetTop + lexx.offsetHeight < display.offsetHeight) {
    lexx.style.top = lexx.offsetTop + 30 + "px";
    }
    
});
const fireBtn = document.querySelector('.key-fire');
fireBtn.addEventListener("mousedown", function(event) {
    audioBlast = document.querySelector('.blast')

    fireBtn.addEventListener('click', e => {
    fireBtn.classList.toggle('paused')
    audioBlast.play()
});
    createFireshot();
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
function isShot(fireshot, timer, count) {
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
                if(score < 3) {
                    planet.remove();
                    incScore();
                    fireshot.remove();
                    createPlanet();
                    clearInterval(timer);
                } else {
                    planet.remove();
                    incScore();
                    fireshot.remove();
                    createPlanet2();
                    createPlanet();
                    clearInterval(timer);
                }
                
            }, 1200)
        }
    }

}

function isDie() {
    let planet = document.querySelector('.planet');
    let lexx = document.querySelector('.lexx');

    let topL = lexx.offsetTop;
    let bottomL = lexx.offsetTop + lexx.offsetHeight;

    let topP = planet.offsetTop;
    let bottomP = planet.offsetTop + planet.offsetHeight;

    let leftL = lexx.offsetLeft + lexx.offsetWidth;
    let leftP = planet.offsetLeft;

    if(topL >= topP && bottomL <= bottomP && leftL >= leftP) {
        planet.className = 'boom';
        planet.style.top = topP + "px";
        planet.style.left = leftP + "px"
        clearInterval(planet.dataset.timer);
            setTimeout(function() {
                planet.remove();
                die();
                createPlanet();
            }, 1000)
    }
}
function isDie2() {
    let planet = document.querySelector('.planet2');
    let lexx = document.querySelector('.lexx');

    let topL = lexx.offsetTop;
    let bottomL = lexx.offsetTop + lexx.offsetHeight;

    let topP = planet.offsetTop;
    let bottomP = planet.offsetTop + planet.offsetHeight;

    let leftL = lexx.offsetLeft + lexx.offsetWidth;
    let leftP = planet.offsetLeft;

    if(topL >= topP && bottomL <= bottomP && leftL >= leftP) {
        planet.className = 'boom';
        planet.style.top = topP + "px";
        planet.style.left = leftP + "px"
        clearInterval(planet.dataset.timer);
            setTimeout(function() {
                planet.remove();
                die();
                createPlanet();
            }, 1000)
    }
}



    
//create Planet
function createPlanet() {
    let planet = document.createElement("div");
    planet.className = "planet";
    
    let display = document.getElementById("lexx");
    let parentDiv = display.parentNode;

    let displayContainer = document.getElementById("display-container");

    planet.style.top = random(10, displayContainer.offsetHeight - 100) + "px";


    parentDiv.insertBefore(planet, display);

    let timerId = setInterval(function() {

        planet.style.left = (planet.offsetLeft - 10) + "px";

        if(planet.offsetLeft + planet.offsetWidth < 100) {
            planet.remove();
            clearInterval(timerId);
            createPlanet();

            // die(); 
        }
        isDie();
    }, 100);
    planet.dataset.timer = timerId;
    
}

function createPlanet2() {
    let planet = document.createElement("div");
    planet.className = "planet2";
    
    let display = document.getElementById("lexx");
    let parentDiv = display.parentNode;

    let displayContainer = document.getElementById("display-container");

    planet.style.top = random(10, displayContainer.offsetHeight - 100) + "px";


    parentDiv.insertBefore(planet, display);

    let timerId = setInterval(function() {

        planet.style.left = (planet.offsetLeft - 20) + "px";

        if(planet.offsetLeft + planet.offsetWidth < 100) {
            planet.remove();
            clearInterval(timerId);
            createPlanet2();

            // die(); 
        }
        isDie2();
    }, 100);
    planet.dataset.timer = timerId;
    
}





//random createPlanet
function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function die() {
    lives--;
    if(lives != 0) {
        let livesBlock = document.querySelector('#lives');
        let live = livesBlock.querySelector("span");
        live.remove();
    }
    else {
        gameOver();
    }
    
}
function gameOver() {
    document.body.innerHTML = 'game over';
    location.reload();
}






