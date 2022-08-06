// load contents event listener //
window.addEventListener('load', function(){

// Canvas's //
const canvas = document.getElementById('canvasMain');
canvas.width = 900;
canvas.height = 650;
const ctx = canvas.getContext('2d');
ctx.font = '25px Impact';

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');

// Dimensions //
const staticCanvasWidth = 900;
const staticCanvasHeight = 650; 

collisionCanvas.width = 950;
collisionCanvas.height = 700;

const background = {
    height: 342,
    width: 640
}

// main character and AI characters //
const rightKandySprite = new Image();
rightKandySprite.src = "playerSprites/DaRealKane.png";
const leftKandySprite = new Image();
leftKandySprite.src = 'playerSprites/DaRealKane copy.png';

const enemySprite = new Image();
enemySprite.src = "./craftpix-485144-2d-game-terrorists-character-free-sprites-sheets/png/2/Attack3/2_terrorist_2_Attack3_000.png";

const santaSprite = new Image();
santaSprite.src = './creepySanta.png';

// screen images //
const explanationIMG = new Image();
explanationIMG.src = 'explainImg.png';


const pauseImage = new Image();
pauseImage.src = 'PauseIMG.png';

const gifBackground = new Image();
gifBackground.src = './backgroundSheet.png';
gifBackground.id = 'background';

const EndGameIMG = new Image();
EndGameIMG.src = 'gameoverrr.jpeg';

const startScreenBackground = new Image();
startScreenBackground.src = 'startScreenIMG.png';

const howToPlayIMG = new Image();
howToPlayIMG.src = 'howtoScreen.png';
//  end of screen images //

// Audio files //
const pauseMusic = new Audio();
pauseMusic.src = 'StartScreenMusic.ogg'
pauseMusic.volume = 0.5;
const mainMusic = new Audio();
mainMusic.src = 'theme-loop.ogg';

// bird interval / array / starting frame
let timeTillNextAttackRaven = 0;
let ravenInterval = 2000;
let lastTime = 0;
let eagles = [];
let backgroundFrameX = 1;

// health level and  starting score //
let healthBar = 100;
let scoreBoard = 0;

let explosions = [];

// bullet left and right array//
// time between shots interval //
let bulletsArrayLeft = [];
let bulletInterval = 300;
let timeTillNextBullet = 0;
let bulletsArrayRight = [];
 
// terrorist starting number and array //
let numberOfTerrorists = 2;
let terroristArray = [];

// keyboard keys pressed array //
const keys = [];

let startGame = false;
let pause = false;
let howToPlay = false;
let explain = false;

const santa = {
    coordX: 1500,
}

// Player CLASS //
class player {
    constructor(){
        this.image = rightKandySprite;
        this. width = 216;
        this.height = 233;
        this.xCoord = 450;  
        this.yCoord = 400;
        this.sizeX = this.width/1.8;
        this.sizeY = this.height/1.8;
        this.xFrame = 0;
        this.yFrame = 0;
        this.speed = 5;
        this.moving = false;
        this.gunOrientationLeft = false;      
    }
}

// main player //
const KandyDaKane = new player(); // main player //
// main player //

// Gunshot Class //
class Gunshot{
    constructor(){
        this.shotActive = false;
        this.xCoordLeft = KandyDaKane.xCoord + 12;
        this.xCoordRight = KandyDaKane.xCoord + 98;
        this.yCoord = KandyDaKane.yCoord + 53;
        this.width = 10;
        this.height = 3;
        this.xCoordDirection = 10;
        this.markedToDelete = false;
        this.damage = -10;
        this.delay = 10;
    }

    drawLeft(){ // gunshot left //
        if(this.xCoordLeft > -20){
            ctx.fillStyle = 'yellow';
            ctx.fillRect(this.xCoordLeft, this.yCoord, this.width, this.height);
        }
         if (this.xCoordLeft < - 20){
            this.markedToDelete = true;
        }
    }
    drawRight(){ // gunshot right //
        if(this.xCoordRight < 1000){
                ctx.fillStyle = 'yellow';
                ctx.fillRect(this.xCoordRight, this.yCoord, this.width, this.height);  
             }
             if (this.xCoordRight > 1000){
            this.markedToDelete = true;
        }
    }

    update(deltatime){
        this.xCoordLeft = this.xCoordLeft - this.xCoordDirection;
        this.xCoordRight = this.xCoordRight + this.xCoordDirection;

    }
}

// Bird Class //
class AttackRaven {
    constructor(){
        this.spriteWidth = 225;
        this.spriteHeight = 320;
        this.sizeModifier = Math.random() * 0.4 + 0.2;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;

        this.xCoord = canvas.width;
        this.yCoord = Math.random() * 250 + 100;            
        this.xCoordDirection = Math.random() * 10 + 6;
        this.yCoordDirection = Math.random() * 5 - 2.5;

        this.markedToDelete = false;

        this.image = new Image();
        this.image.src = './baldEagle.png';
        this.frame = 0;
        this.maxFrame = 2;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 60 + 100;

    // collision detection upon click //
        // this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]; // random number 1-255 no decimals
        // this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }

    update(deltatime){
        if(startGame){
        if (this.yCoord < 50 || this.yCoord > 300){
            this.yCoordDirection = this.yCoordDirection * -1
        };
        this.xCoord -= this.xCoordDirection;
        this.yCoord += this.yCoordDirection;
        if (this.xCoord < -500) this.markedToDelete = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
    }
    }

    draw(){
             ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth,
             this.spriteHeight, this.xCoord, this.yCoord, this.width, this.height);
    }
}

 // Enemies Class
class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = './craftpix-485144-2d-game-terrorists-character-free-sprites-sheets/png/2/Attack3/2_terrorist_2_Attack3_000.png';
        this.width = 598;
        this.height = 1291;
        this.sizeX = this.width / 10;
        this.sizeY = this.height / 10;
        this.xCoord = Math.random() * 1000;
        this.yCoord = Math.random() * canvas.height + canvas.height + 50;
        this.speed = Math.random() * 4 + 1;
        this.frameX = 0; 
        this.markedToDelete = false;
    }
    update(){
        if(startGame){
        if((KandyDaKane.xCoord - this.xCoord) < 600){
         if (this.xCoord < KandyDaKane.xCoord + 20 && this.yCoord > KandyDaKane.yCoord){// upward  right angle
            this.xCoord++;
            this.yCoord--;
        } else if (this.xCoord > KandyDaKane.xCoord + 25 && this.yCoord < KandyDaKane.yCoord + 25){// down left angle
            this.xCoord--;
            this.yCoord++;
        } else if (this.xCoord > KandyDaKane.xCoord + 25 && this.yCoord > KandyDaKane.yCoord){// up left angle
            this.xCoord--;
            this.yCoord--;
        } else if (this.xCoord < KandyDaKane.xCoord + 25 && this.yCoord < KandyDaKane.yCoord + 25){// down right angle
            this.xCoord++;
            this.yCoord++;
        } else if (this.yCoord > KandyDaKane.yCoord){
            this.yCoord--;
        } else if (this.xCoord > KandyDaKane.xCoord){
            this.xCoord--;
        } else if (this.yCoord < KandyDaKane.yCoord + 25){
            this.yCoord++;
        } else if (this.xCoord < KandyDaKane.xCoord + 25){
            this.xCoord++;
        }
    }
        }
    }
    draw(){
        if (!this.markedToDelete){
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.xCoord, this.yCoord + 25, this.sizeX, this.sizeY); 
        }
    }
}

 // Explosion Class
class Explosion {
    constructor(xCoord, yCoord, imageSize){
        this.image = new Image();
        this.image.src = 'blood.png';
        this.spriteHeight = 512;
        this.spriteWidth = 512;
        this.size = imageSize;
        this.x = xCoord;
        this.y = yCoord;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'shotgun.wav';
        this.sound.volume = 0.3;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 300;
        this.markedToDelete = false;
    }
    update(deltatime){
        if(!pause){
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval){
            this.frame++;
            if (this.frame > 5) this.markedToDelete = true;
        }
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, 
            this.spriteHeight, this.x, this.y + this.size/8, this.size, this.size);
    }
    }
    // END OF CLASSES // 


for (let i = 0; i < numberOfTerrorists; i++){
    terroristArray.push(new Enemy());
}

           // EVENT LISTENERS  //
window.addEventListener('keydown', function(event){
    if(event.code === 'Space'){
        // console.log('spacedown');
        Gunshot.shotActive = true;
    } else {
        keys[event.key] = true; 
    }
});

window.addEventListener('keyup', function(event){
    if(event.code === 'Space'){
        // console.log('spaceup');
        Gunshot.shotActive = false;
    } else{
    delete keys[event.key];
    }
});

    canvas.addEventListener('mousedown', function(event){
        eagles.forEach((raven)=>{
            if (event.offsetX > raven.xCoord && 
                event.offsetY > raven.yCoord &&
                 event.offsetX < raven.xCoord + raven.width + 20 &&
                 event.offsetY < raven.yCoord + raven.height
                 ){
        
                    console.log(raven);
                    raven.markedToDelete = true;
                    explosions.push(new Explosion(raven.xCoord, raven.yCoord, raven.width));
                     console.log('Bird hit');
                     scoreBoard = scoreBoard + 7;
                     console.log(explosions);
                }
            })
        });

    canvas.addEventListener('click', function(event){
        console.log("offsetX", event.offsetX, "offsetY", event.offsetY, "X", event.x, "Y", event.y, "pageX", event.pageX, "pageY", event.pageY, "clientX", event.clientX, "clientY", event.clientY);

            // START GAME BUTTON // all within same click event //
        if(event.offsetX > 308 && event.offsetX < 601 && event.offsetY > 2 && event.offsetY < 43){
            console.log('Start Game button Pressed');
            pause = false;
            howToPlay = false;
            mainMusic.play();
            console.log('not paused');
        if (!startGame){
            startGame = true;
            console.log(true);
            }

        // HOW TO BUTTON // all within same click event //
    } else if (event.offsetX > 1 && event.offsetX < 301 && event.offsetY > 2 && event.offsetY < 43){
        if (howToPlay){
            howToPlay = false;
        } else {
        howToPlay = true;
        pause = true;
        console.log('how to button Pressed');
        }

            //PAUSE BUTTON // all within same click event //
    } else if ( event.offsetX > 309 && event.offsetX < 600 && event.offsetY > 51 && event.offsetY < 102){
        console.log('Pause Button Pressed');
        pause = true;
        console.log('paused');

            // RESET BUTTON // all within same click event //
    } else if (event.offsetX > 1 && event.offsetX < 301 && event.offsetY > 51 && event.offsetY < 103 || healthBar == 0){
        console.log('reset button pressed');
        terroristArray = [];
        bulletsArrayLeft = [];
        bulletsArrayRight = [];
        eagles = [];
        KandyDaKane.xCoord = 400;
        KandyDaKane.yCoord = 450;
        for (let i = 0; i < numberOfTerrorists; i++){
            terroristArray.push(new Enemy());
        }
        santa.coordX = 1500;
        scoreBoard = 0;
        healthBar = 100;
        howToPlay = false;
    } else if (event.offsetX > 0 && event.offsetX < 950 && event.offsetY > 100 && event.offsetY < 700){
        explain = true;
    }
    })


    // END CLICK EVENT //


// FUNCTIONS //

function backgroundStartScreen(){
    if (!startGame){
        ctx.drawImage(startScreenBackground, 0, 0,
             startScreenBackground.width, startScreenBackground.height,
              0, 0, canvas.width, canvas.height);    
    }
      }


      function summary(){
        if (!explain){
            ctx.drawImage(explanationIMG, 0, 0,
                 explanationIMG.width, explanationIMG.height,
                  0, 80, canvas.width, canvas.height - 60);    
        }
        }
          


function hitTest(){
    for (let b = bulletsArrayLeft.length - 1; b >= 0; b--){
        for (let e = terroristArray.length - 1; e >= 0; e--){
            let bArray = bulletsArrayLeft[b];
            let tArray = terroristArray[e];
            if(bArray.xCoordLeft > tArray.xCoord &&
                 bArray.xCoordLeft < tArray.xCoord + tArray.sizeX &&
                  bArray.yCoord > tArray.yCoord &&
                   bArray.yCoord < tArray.yCoord + tArray.sizeY){
            tArray.markedToDelete = true;
            if(tArray.markedToDelete){
            bArray.markedToDelete = true;
            } 
            console.log(terroristArray);
        }
    }
}
for (let c = bulletsArrayRight.length - 1; c >= 0; c--){
    for (let f = terroristArray.length - 1; f >= 0; f--){
        let cArray = bulletsArrayRight[c];
        let teArray = terroristArray[f];
        if(cArray.xCoordRight > teArray.xCoord &&
             cArray.xCoordRight < teArray.xCoord + teArray.sizeX &&
              cArray.yCoord > teArray.yCoord &&
               cArray.yCoord < teArray.yCoord + teArray.sizeY){
        teArray.markedToDelete = true;
        console.log('hit');
        if(teArray.markedToDelete){
        cArray.markedToDelete = true;
        } 
        console.log(terroristArray);
    }
}
}
    for (let terArray = terroristArray.length - 1; terArray >= 0; terArray--){
        let eachTerrorist = terroristArray[terArray];
        if (eachTerrorist.xCoord > KandyDaKane.xCoord + 10 &&
             eachTerrorist.xCoord < KandyDaKane.xCoord + KandyDaKane.sizeX - 10 &&
              eachTerrorist.yCoord > KandyDaKane.yCoord + 10 &&
               eachTerrorist.yCoord < KandyDaKane.yCoord + KandyDaKane.sizeY -10 &&
                healthBar > 0){
            healthBar = healthBar - 1;
        }
    }
}

// Drawing canvas buttons for my click event //
function drawScore(){
    ctx.fillStyle = 'black';
    ctx.fillText('Current Score:     ' + scoreBoard, 662, 27);
    ctx.fillStyle = 'white';
    ctx.fillText('Current Score:     ' + scoreBoard, 665, 30);
}

function drawHowTo(){
    ctx.fillStyle = 'black';
    ctx.fillText('How to Play', 77, 27);
    ctx.fillStyle = 'red';
    ctx.fillText('How to Play', 80, 30);
}

function drawReset(){
    ctx.fillStyle = 'black';
    ctx.fillText('Reset Game', 77, 80);
    ctx.fillStyle = 'red';
    ctx.fillText('Reset Game', 80, 83);
}

function drawHealth(){
    ctx.fillStyle = 'black';
    ctx.fillText('Health Level:     ' + healthBar, 662, 80);
    ctx.fillStyle = 'white';
    ctx.fillText('Health Level:     ' + healthBar, 665, 83);
}

function drawPause(){
    ctx.fillStyle = 'black';
    ctx.fillText('Pause Game', 390, 80);
    ctx.fillStyle = 'red';
    ctx.fillText('Pause Game', 390, 83);
}

function drawStart(){
    ctx.fillStyle = 'black';
    ctx.fillText('Start Game', 390, 27);
    ctx.fillStyle = 'lightgreen';
    ctx.fillText('Start Game', 390, 30);
}

// Player movement // 
function spriteMovementKeys(){
    if (keys['ArrowLeft'] && KandyDaKane.xCoord > 0){
        KandyDaKane.xCoord -= KandyDaKane.speed;
        KandyDaKane.moving = true;
        KandyDaKane.image = leftKandySprite;
        KandyDaKane.gunOrientationLeft = true;
        console.log(`Arrow Key Left  X: ${KandyDaKane.xCoord} Y: ${KandyDaKane.yCoord}`);
    } else if (keys['ArrowRight'] && KandyDaKane.xCoord < canvas.width - 50){
        KandyDaKane.xCoord += KandyDaKane.speed;
        KandyDaKane.moving = true;
        KandyDaKane.image = rightKandySprite;
        KandyDaKane.gunOrientationLeft = false;
        console.log(`Arrow Key Right  X: ${KandyDaKane.xCoord}  Y: ${KandyDaKane.yCoord}`);
    } else if (keys['ArrowUp'] && KandyDaKane.yCoord > 350){
        KandyDaKane.yCoord -= KandyDaKane.speed;
        KandyDaKane.moving = true;
        console.log(`Arrow Key Up  X:  ${KandyDaKane.xCoord}  Y:  ${KandyDaKane.yCoord}`);
    } else if (keys["ArrowDown"] && KandyDaKane.yCoord < canvas.height - KandyDaKane.sizeY){
        KandyDaKane.yCoord += KandyDaKane.speed;
        KandyDaKane.moving = true;
        console.log(`Arrow Key Down  X:  ${KandyDaKane.xCoord}  Y:  ${KandyDaKane.yCoord}`);
    } else if (keys['a'] && KandyDaKane.xCoord > 0){
        KandyDaKane.xCoord -= KandyDaKane.speed;
        KandyDaKane.moving = true;
        console.log(`Key A -- X: ${KandyDaKane.xCoord} Y: ${KandyDaKane.yCoord}`);
    } else if (keys['d'] && KandyDaKane.xCoord < canvas.width - 50){
        KandyDaKane.xCoord += KandyDaKane.speed;
        KandyDaKane.moving = true;
        console.log(`Key D -- X: ${KandyDaKane.xCoord}  Y: ${KandyDaKane.yCoord}`);
    } else if (keys['w'] && KandyDaKane.yCoord > 350){
        KandyDaKane.yCoord -= KandyDaKane.speed;
        KandyDaKane.moving = true;
        console.log(`Key W -- X:  ${KandyDaKane.xCoord}  Y:  ${KandyDaKane.yCoord}`);
    } else if (keys["s"] && KandyDaKane.yCoord < canvas.height - KandyDaKane.sizeY){
        KandyDaKane.yCoord += KandyDaKane.speed;
        KandyDaKane.moving = true;
        console.log(`Key S -- X:  ${KandyDaKane.xCoord}  Y:  ${KandyDaKane.yCoord}`);
    }
}

           // ANIMATION LOOP //

function animation(timestamp){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    // main background //
    if(startGame){
    ctx.drawImage(gifBackground, backgroundFrameX, 0,
         background.width, background.height, 0, 0,
          canvas.width, canvas.height);
    }
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeTillNextAttackRaven += deltatime;
    if (timeTillNextAttackRaven > ravenInterval){
        eagles.push(new AttackRaven());
        timeTillNextAttackRaven = 0;
        eagles.sort(function(a, b) {
            return a.width - b.width;// draws smaller birds first so they are dynamically layered
        });
    };
    if(!pause){
        [...eagles, ...explosions].forEach(object => object.update(deltatime));
    }
    [...eagles, ...explosions].forEach(object => object.draw());
    
    eagles = eagles.filter(object => !object.markedToDelete);// would like insight on this line
    
    if (startGame && explain){
        terroristArray.forEach(enemy => {
            if(!pause){
                enemy.update();
            }
            enemy.draw();
        })
    }

    explosions = explosions.filter(object => !object.markedToDelete);
    terroristArray = terroristArray.filter(object => !object.markedToDelete);

    if (terroristArray.length === 0){
        for (let i = 0; i < numberOfTerrorists; i++){
            terroristArray.push(new Enemy());
        }
        numberOfTerrorists = numberOfTerrorists + 2;
    }

    const KandyCane = ctx.drawImage(KandyDaKane.image, 0, 0, KandyDaKane.width,
         KandyDaKane.height, KandyDaKane.xCoord, KandyDaKane.yCoord,
          KandyDaKane.sizeX, KandyDaKane.sizeY); 
    
         KandyCane;
    
    if(!pause){
        timeTillNextBullet += deltatime;
        if (KandyDaKane.gunOrientationLeft){
            if(Gunshot.shotActive &&
                timeTillNextBullet > bulletInterval){
                bulletsArrayLeft.push(new Gunshot());
                console.log(bulletsArrayLeft);
                timeTillNextBullet = 0;
            }} else if (!KandyDaKane.gunOrientationLeft){
                if(Gunshot.shotActive && 
                    timeTillNextBullet > bulletInterval){
                    bulletsArrayRight.push(new Gunshot());
                    console.log(bulletsArrayRight);
                    timeTillNextBullet = 0;
                }} 
                [...bulletsArrayLeft].forEach(object => object.update(deltatime));
                [...bulletsArrayRight].forEach(object => object.update(deltatime));
            }
            
            [...bulletsArrayLeft].forEach(object => object.drawLeft());
            [...bulletsArrayRight].forEach(object => object.drawRight());

            bulletsArrayLeft = bulletsArrayLeft.filter(object =>!object.markedToDelete);
            bulletsArrayRight = bulletsArrayRight.filter(object =>!object.markedToDelete);
                

            // start game button pressed //
                if(startGame){
                ctx.drawImage(santaSprite, 0, 0, santaSprite.width,
                     santaSprite.height, santa.coordX, 475, 200, 200);
                if(!pause){
                    santa.coordX--;
                }
                if (santa.coordX < -500){
                    santa.coordX =  2000;
                }
                }

                if (pause){
                    pauseMusic.play();
                    ctx.drawImage(pauseImage, 200, 200);
                }  else {
                    pauseMusic.pause();
                }
                

                // END GAME IMAGE DISPLAY //
                if (healthBar  == 0){
                    ctx.drawImage(EndGameIMG, 0, 100, canvas.width, 550);
                }
                
                summary();
                backgroundStartScreen();

                if (howToPlay){
                    ctx.drawImage(howToPlayIMG, -12, 0,
                         canvas.width + 22, canvas.height + 20);
                }

                // STYLING FOR SCORE AND MENU //
                ctx.lineJoin = 'bevel';
                ctx.fillStyle = 'darkgrey';
                ctx.fillRect(0, 0, canvas.width, 100);
                ctx.fillStyle = 'red';
                ctx.fillRect(300, 0, 5, 100);
                ctx.fillRect(600, 0, 5, 100);
                ctx.fillStyle = 'black';
                ctx.fillRect(300, 0, 2, 100);
                ctx.fillRect(600, 0, 2, 100);
                ctx.fillRect(305, 0, 2, 100);
                ctx.fillRect(605, 0, 2, 100);
                ctx.fillStyle = 'red';
                ctx.fillRect(0, 40, canvas.width, 5);
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 40, canvas.width, 2);
                ctx.fillRect(0, 45, canvas.width, 2);
                ctx.fillRect(0, 100, canvas.width, 10);
                
                    drawScore();
                    drawHealth();
                    drawPause();
                    drawStart();
                    drawHowTo();
                    drawReset();
                    if(!pause){
                    spriteMovementKeys();
                    hitTest();
                    }
           // END STYLING //
           // END OF ANIMATION LOOP //
}

animation(0);

});// end of load event listener all data within  //


