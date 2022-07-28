const canvas = document.getElementById('canvasMain');
canvas.width = 900;
canvas.height = 650;



const ctx = canvas.getContext('2d');
console.log(ctx);


const spritePlayer = new Image();
spritePlayer.src = "/Users/calvin/Desktop/general-Assembly/unit-1/MyGame/KandysPaybackGame/playerSprites/idle.png";

const canvasBackground = new Image();
canvasBackground.src = "/Users/calvin/Desktop/general-Assembly/unit-1/MyGame/KandysPaybackGame/backgroundIMGs/craftpix-633456-free-desert-scrolling-2d-game-backgrounds/_PNG/4/background.png"

const player = {
    width: 265,
    height: 571,

}






function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spritePlayer, 0, 0, player.width, player.height, 300, 300, 50, 112);

}

animation();