const canvas = document.getElementById('canvasMain');
canvas.width = 900;
canvas.height = 650;

const ctx = canvas.getContext('2d');
console.log(ctx);


const spritePlayer = new Image();
spritePlayer.src = "/Users/calvin/Desktop/general-Assembly/unit-1/MyGame/KandysPaybackGame/playerSprites/idle.png";

const canvasBackground = new Image();
canvasBackground.src = "/Users/calvin/Desktop/general-Assembly/unit-1/MyGame/KandysPaybackGame/craftpix-633456-free-desert-scrolling-2d-game-backgrounds/_PNG/4/background.png"

const keys = [];


const player = {
    width: 265,
    height: 571,
    xCoord: 300,
    yCoord: 300,
    xFrame: 0,
    yFrame: 0,
    speed: 5,
    moving: false
}


window.addEventListener('keydown', function(event){
        keys[event.key] = true; 
        console.log(keys);
})

window.addEventListener('keyup', function(event){
    delete keys[event.key];

})



function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spritePlayer, 0, 0, player.width, player.height, player.xCoord, player.yCoord, 50, 112);
    spriteMovementKeys();
}

animation();

function spriteMovementKeys(){
    if (keys['ArrowLeft']){
        player.xCoord -= player.speed;
        player.moving = true;
        console.log(`Left Arrow Key  X: ${player.xCoord} Y: ${player.yCoord}`);
    } else if (keys['ArrowRight']){
        player.xCoord += player.speed;
        player.moving = true;
        console.log(`Right Arrow key  X: ${player.xCoord}  Y: ${player.yCoord}`);
    } else if (keys['ArrowUp']){
        player.yCoord -= player.speed;
        player.moving = true;
        console.log(`Up Arrow Key  X:  ${player.xCoord}  Y:  ${player.yCoord}`);
    } else if (keys["ArrowDown"]){
        player.yCoord += player.speed;
        player.moving = true;
        console.log(`Down Arrow Key  X:  ${player.xCoord}  Y:  ${player.yCoord}`);
    }
}