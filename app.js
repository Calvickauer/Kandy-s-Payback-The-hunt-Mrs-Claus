
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
collisionCanvas.width = 950;
collisionCanvas.height = 700;

console.log(collisionCtx);

let healthBar = 100;

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

const startScreenBackground = new Image();
startScreenBackground.src = 'startScreenIMG.png';



const numberOfTerrorists = 2;
const terroristArray = [];

let timeTillNextAttackRaven = 0;
let ravenInterval = 2000;
let lastTime = 0;


const keys = [];

const startGameDimensions = {
    height: 404,
    width: 316
}

const background = {
    height: 342,
    width: 640
}


const santa = {
    coordX: 1500,
}

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
        this.gunShot = false;
        this.gunOrientationLeft = false;
        // this.bullet = true;

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    
    update(){}
    
    draw(ctx){
        this.shoot();
    }

    
    shoot(){
        if (this.gunShot){
            console.log('gunshot');
            const speed = 5;
            const delay = 7;
            const damage = 25;
            if (!this.gunOrientationLeft){
            ctx.strokeStyle = 'black';
                    ctx.fillStyle = 'yellow';
                    ctx.strokeRect(KandyDaKane.xCoord + 110, KandyDaKane.yCoord + 52, 10, 3);
                    ctx.fillRect(KandyDaKane.xCoord + 110, KandyDaKane.yCoord + 52, 10, 3);
            } else if (this.gunOrientationLeft){
                console.log('space');
                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'yellow';
                ctx.strokeRect(KandyDaKane.xCoord, KandyDaKane.yCoord + 52, 10, 3);
                ctx.fillRect(KandyDaKane.xCoord, KandyDaKane.yCoord + 52, 10, 3);
            }
        }
        
    }

    keydown = (event) => {
        if(event.key === 'Space'){
            this.gunShot = true;
        }
    };

    keyup = (event) => {
        if(event.key === 'Space'){
            this.gunShot = false;
        }
    };

}


const KandyDaKane = new player();




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

const raven = new AttackRaven();


class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = './craftpix-485144-2d-game-terrorists-character-free-sprites-sheets/png/2/Attack3/2_terrorist_2_Attack3_000.png';
        this.width = 598;
        this.height = 1291;
        this.sizeX = this.width / 10;
        this.sizeY = this.height / 10;
        this.xCoord = Math.random() * 50 + 1;
        this.yCoord = Math.random() * canvas.height + 300;
        this.speed = Math.random() * 4 + 1;
        this.frameX = 0; 
        this.markedToDelete = false;
    }
    update(){
        if(startGame){
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
        this.x = xCoord;
        this.y = yCoord;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'shotgun.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 300;
        this.markedToDelete = false;
    }
    update(deltatime){
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval){
            this.frame++;
            if (this.frame > 5) this.markedToDelete = true;
        }
    
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, 
            this.spriteHeight, this.x, this.y + this.size/8, this.size, this.size);
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
    if(event.code === 'Space'){
        // console.log('spacedown');
        KandyDaKane.gunShot = true;
    } else{
        keys[event.key] = true; 
    }
});

window.addEventListener('keyup', function(event){
    if(event.code === 'Space'){
        // console.log('spaceup');
        KandyDaKane.gunShot = false;
    } else{
    delete keys[event.key];
    }
});




    canvas.addEventListener('mousedown', function(event){
        ravens.forEach((raven)=>{
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
            // terroristArray.forEach((Enemy)=>{
            //     if (event.offsetX > Enemy.xCoord && 
            //         event.offsetY > Enemy.yCoord &&
            //          event.offsetX < Enemy.xCoord + Enemy.width &&
            //          event.offsetY < Enemy.yCoord + Enemy.height
            //          ){
            //             console.log('Enemy hit');
            //             console.log(Enemy);
            //             // Enemy.markedToDelete = true;
            //          }})
        });
    

    function backgroundStartScreen(){
        if (!startGame){
            ctx.drawImage(startScreenBackground, 0, 0, startScreenBackground.width, startScreenBackground.height, 0, 0, canvas.width, canvas.height);
        }
          }

    let startGame = false;


    canvas.addEventListener('click', function(event){
        console.log("offsetX", event.offsetX, "offsetY", event.offsetY, "X", event.x, "Y", event.y, "pageX", event.pageX, "pageY", event.pageY, "clientX", event.clientX, "clientY", event.clientY);
        if(event.x > 439 && event.x < 732 && event.y > 157 && event.y < 197){
            console.log('Start Game button Pressed');
        if (!startGame){
            startGame = true;
            console.log(true);


        }
    } else if (event.x > 134 && event.x < 432 && event.y > 157 && event.y < 197){
        console.log('how to button Pressed');


    } else if ( event.x > 439 && event.x < 732 && event.y > 203 && event.y < 254){
        console.log('Pause Button Pressed');


    } else if (event.x > 134 && event.x < 432 && event.y > 203 && event.y < 255){
        console.log('reset button pressed');


    }
    })


// END EVENT LISTENERS //

// FUNCTIONS //


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
    // for ( let i = 0; i < terroristArray.length; i++){
    //     if (terroristArray[i] <= KandyDaKane.xCoord && terroristArray[i] > KandyCane.xCoord - terroristArray[i].width){
    //         healthBar = healthBar - 10;
    //         console.log(terroristArray[i]);
    //         return healthBar;
    //     }
    // }

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



           // ANIMATION LOOP //
function animation(timestamp){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    if(startGame){
    ctx.drawImage(gifBackground, backgroundFrameX, 0, background.width, background.height, 0, 0, canvas.width, canvas.height);
    }
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
    [...ravens, ...explosions].forEach(object => object.update(deltatime));
    [...ravens, ...explosions].forEach(object => object.draw());
    
    ravens = ravens.filter(object => !object.markedToDelete);// would like insight on this line
    explosions = explosions.filter(object => !object.markedToDelete);
    // terroristArray = terroristArray.filter(object => !object.markedToDelete);
    
    if (startGame){
    terroristArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    })
}
    const KandyCane = ctx.drawImage(KandyDaKane.image, 0, 0, KandyDaKane.width, KandyDaKane.height, KandyDaKane.xCoord, KandyDaKane.yCoord, KandyDaKane.sizeX, KandyDaKane.sizeY); 
    KandyCane;
    KandyDaKane.shoot();

    if(startGame){
    ctx.drawImage(santaSprite, 0, 0, santaSprite.width, santaSprite.height, santa.coordX, 425, 200, 200);
    santa.coordX--;
    if (santa.coordX < -500){
        santa.coordX =  2000;
    }
    }

    backgroundStartScreen();
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
        drawHowTo();
        drawHealth();
        drawPause();
        drawStart();
        drawReset();
        
        spriteMovementKeys();
        // spacebarGun();

           // END STYLING //
    
}

animation(0);

// function startGameButton(){

// }


             // END  OF ANIMATION LOOP //

             // some Functions //
             

             function spacebarGun(){
                 if (keys[' '] && KandyDaKane.gunOrientationLeft){
                     console.log('space');
                     ctx.strokeStyle = 'black';
                     ctx.fillStyle = 'yellow';
                     ctx.strokeRect(KandyDaKane.xCoord, KandyDaKane.yCoord + 52, 10, 3);
                     ctx.fillRect(KandyDaKane.xCoord, KandyDaKane.yCoord + 52, 10, 3);
                 } else if (keys[' '] && !KandyDaKane.gunOrientationLeft){
                    ctx.strokeStyle = 'black';
                    ctx.fillStyle = 'yellow';
                    ctx.strokeRect(KandyDaKane.xCoord + 110, KandyDaKane.yCoord + 52, 10, 3);
                    ctx.fillRect(KandyDaKane.xCoord + 110, KandyDaKane.yCoord + 52, 10, 3);
                 }
             }


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

});// end of load event listener all data within  //
