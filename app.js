window.addEventListener('load', function(){
const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 650;
ctx.font = '25px Impact';

const staticCanvasWidth = 900;
const staticCanvasHeight = 650; 

console.log(ctx);

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = canvas.width;
collisionCanvas.height = canvas.height;

console.log(collisionCtx);


let scoreBoard = 0;

const rightKandySprite = new Image();
rightKandySprite.src = "playerSprites/DaRealKane.png";
const leftKandySprite = new Image();
leftKandySprite.src = 'playerSprites/DaRealKane copy.png';

const enemySprite = new Image();
enemySprite.src = "./craftpix-485144-2d-game-terrorists-character-free-sprites-sheets/png/2/Attack3/2_terrorist_2_Attack3_000.png";

const santaSprite = new Image();
santaSprite.src = './creepySanta.png';

const gifBackground = new Image();
gifBackground.src = './backgroundSheet.png';
gifBackground.id = 'background';

const numberOfTerrorists = 3;
const terroristArray = [];

let timeTillNextAttackRaven = 0;
let ravenInterval = 2000;
let lastTime = 0;


const keys = [];



const background = {
    height: 342,
    width: 640
}


const santa = {
    coordX: 800,
}

// const player = {
//     width: 265,
//     height: 571,
//     xCoord: 300,
//     yCoord: 400,
//     sizeX: 50,
//     sizeY: 112,
//     xFrame: 0,
//     yFrame: 0,
//     speed: 5,
//     moving: false
// }

class player {
    constructor(){
        this.image = rightKandySprite;
        this. width = 216;
        this.height = 233;
        this.xCoord = 300;  
        this.yCoord = 300;
        this.sizeX = this.width/1.8;
        this.sizeY = this.height/1.8;
        this.xFrame = 0;
        this.yFrame = 0;
        this.speed = 5;
        this.moving = false;
    }

    update(){

    }

    draw(){

    }
}

const KandyDaKane = new player();


const startScreen = {
    active: true
}
let backgroundFrameX = 1;

let ravens = [];
// CLASSES //

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
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]; // random number 1-255 no decimals
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }

    update(deltatime){
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

    draw(){
        collisionCtx.fillStyle = this.color;
        // collisionCtx.fillRect(500, 300, 300, 300);
        // collisionCtx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.xCoord, this.yCoord, this.width, this.height);
    }
}

const raven = new AttackRaven();


class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = './craftpix-485144-2d-game-terrorists-character-free-sprites-sheets/png/2/Attack3/2_terrorist_2_Attack3_000.png';
        this.width = 598;
        this.height = 1291;
        this.sizeX = this.width / 10;
        this.sizeY = this.height / 10;
        this.xCoord = Math.random() * 10 + 1;
        this.yCoord = Math.random() * canvas.height + 400;
        this.speed = Math.random() * 2 + 1;
        this.frameX = 0; 
    }
    update(){

        if((KandyDaKane.xCoord - this.xCoord) < 300){// stops enemy from constant attack
         if (this.xCoord < KandyDaKane.xCoord && this.yCoord > KandyDaKane.yCoord){// upward  right angle
            this.xCoord++;
            this.yCoord--;
        } else if (this.xCoord > KandyDaKane.xCoord && this.yCoord < KandyDaKane.yCoord){// down left angle
            this.xCoord--;
            this.yCoord++;
        } else if (this.xCoord > KandyDaKane.xCoord && this.yCoord > KandyDaKane.yCoord){// up left angle
            this.xCoord--;
            this.yCoord--;
        } else if (this.xCoord < KandyDaKane.xCoord && this.yCoord < KandyDaKane.yCoord){// down right angle
            this.xCoord++;
            this.yCoord++;
        }
    }

    }
    draw(){
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.xCoord, this.yCoord + 25, this.sizeX, this.sizeY); 
    
    }
}


let explosions = [];
class Explosion {
    constructor(xCoord, yCoord, imageSize){
        this.image = new Image();
        this.image.src = 'blood.png';
        this.spriteHeight = 512;
        this.spriteWidth = 512;
        this.size = imageSize;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'shotgun.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
    }
    update(deltatime){
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval){
            this.frame++;

        }

    }
}


for (let i = 0; i < numberOfTerrorists; i++){
    terroristArray.push(new Enemy());
}


// class InputHandler {
//     constructor(){
//         this.keys = [];
//         window.addEventListener('keydown', event => {
//             if (event.key === = true; 
//             console.log(keys);
//     });
//     }
// }

// const input = new InputHandler();

          // END OF CLASSES // 

          

           // EVENT LISTENERS  //
window.addEventListener('keydown', function(event){
        keys[event.key] = true; 
        
});

window.addEventListener('keyup', function(event){
    delete keys[event.key];

});


// collisionCanvas.addEventListener('mousedown', function(event){
//     ravens.forEach((raven)=>{
//         if (event.offsetX > raven.xCoord && 
//             event.offsetY > raven.yCoord &&
//              event.offsetX < raven.xCoord + raven.width &&
//              event.offsetY < raven.yCoord + raven.height
//              ){
//                  console.log('hit');
//             }
//         })
//     });
    collisionCanvas.addEventListener('mousedown', function(event){
        ravens.forEach((raven)=>{
            if (event.offsetX > raven.xCoord && 
                event.offsetY > raven.yCoord &&
                 event.offsetX < raven.xCoord + raven.width + 20 &&
                 event.offsetY < raven.yCoord + raven.height
                 ){
        
                    console.log(raven);
                    raven.markedToDelete = true;
                     console.log('hit');
                     scoreBoard = scoreBoard + 7;
                     
                }
            })
        });
            
        
        // const detectPixelColor = collisionCtx.getImageData(event.x, event.y, 1, 1);
        // // console.log(event.x, event.y);
        // // console.log(raven.color);
        // if (detectPixelColor.data[0] !== 0 && detectPixelColor.data[1] !== 0 && detectPixelColor.data[2] !== 0){
            // console.log(detectPixelColor);
            // }


// END EVENT LISTENERS //

// FUNCTIONS //



function displayTextStatus(){

}

function enemyHandler(){

}

function drawScore(){
    ctx.fillStyle = 'black';
    ctx.fillText('Current Score: ' + scoreBoard, 662, 27);
    ctx.fillStyle = 'white';
    ctx.fillText('Current Score: ' + scoreBoard, 665, 30);
}

function drawHowTo(){
    ctx.fillStyle = 'black';
    ctx.fillText('How to Play', 77, 27);
    ctx.fillStyle = 'white';
    ctx.fillText('How to Play', 80, 30);
}

function drawHealth(){
    ctx.fillStyle = 'black';
    ctx.fillText('Health Level:', 662, 80);
    ctx.fillStyle = 'white';
    ctx.fillText('Health Level:', 665, 83);

}



           // ANIMATION LOOP //

function animation(timestamp){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gifBackground, backgroundFrameX, 0, background.width, background.height, 0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeTillNextAttackRaven += deltatime;
    if (timeTillNextAttackRaven > ravenInterval){
        ravens.push(new AttackRaven());
        timeTillNextAttackRaven = 0;
        ravens.sort(function(a, b) {
            return a.width - b.width;// draws smaller birds first so they are dynamically layered
        });
    };
    [...ravens].forEach(object => object.update(deltatime));
    [...ravens].forEach(object => object.draw());
    
    ravens = ravens.filter(object => !object.markedToDelete);// would like insight on this line
    
         // STYLING FOR SCORE AND MENU //

    ctx.fillStyle = 'darkgreen';
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
        drawHowTo();
        drawHealth();

           // END STYLING //
    
    const KandyCane = ctx.drawImage(KandyDaKane.image, 0, 0, KandyDaKane.width, KandyDaKane.height, KandyDaKane.xCoord, KandyDaKane.yCoord, KandyDaKane.sizeX, KandyDaKane.sizeY); 
    KandyCane;

    terroristArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    })
    ctx.drawImage(santaSprite, 0, 0, santaSprite.width, santaSprite.height, santa.coordX, 425, 200, 200);
    santa.coordX--;


    spriteMovementKeys();
}

animation(0);


             // END  OF ANIMATION LOOP //

            // some Functions //



function spriteMovementKeys(){
    if (keys['ArrowLeft'] && KandyDaKane.xCoord > 0){
        KandyDaKane.xCoord -= KandyDaKane.speed;
        KandyDaKane.moving = true;
        KandyDaKane.image = leftKandySprite;
        console.log(`Arrow Key Left  X: ${KandyDaKane.xCoord} Y: ${KandyDaKane.yCoord}`);
    } else if (keys['ArrowRight'] && KandyDaKane.xCoord < canvas.width - 50){
        KandyDaKane.xCoord += KandyDaKane.speed;
        KandyDaKane.moving = true;
        KandyDaKane.image = rightKandySprite;
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









});// end of load event listener all data within  //




// backgroundLoop(31); //COMMENTED OUT TEMPORARILY 
//     ctx.fillRect(0, 162.5, canvas.width, 10); //Y quardant 1
//     ctx.fillRect(0, 325, canvas.width, 10);//Y quardant 2
//     ctx.fillRect(0, 487.5, canvas.width, 10);//Y quardant 3
// // need to combine quadrants into X/Y sections 
//     ctx.fillRect(225, 0, 10, canvas.height);//X quadrant 1
//     ctx.fillRect(450, 0, 10, canvas.height);//X quadrant 2
//     ctx.fillRect(675, 0, 10, canvas.height);//X quadrant 3

// function backgroundLoop(speed){
    //     // requestAnimationFrame(backgroundLoop);
    //     let i = 2
    //     if(backgroundFrameX < 7 && speed % i == 0){
        //         console.log(true);
        //         let backgroundFrame = backgroundFrameX * background.width;
        //         ctx.drawImage(gifBackground, backgroundFrame, 0, background.width, background.height, 0, 0, canvas.width, canvas.height);
        //         backgroundFrameX++;
        //         i++;
        //     } else if (backgroundFrameX == 7){
            //      backgroundFrameX = 1;
            //     }
            
            // }