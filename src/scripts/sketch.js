let backgroundSprite, backgroundImage;
let userSprite, userAnimation, userAnimationStill;
let cashImage, cashGroup,
    diamondsImage, diamondGroup,
    jwellImage, jwellGroup,
    rubyImage, rubyGroup,
    swordImage, swordGroup;
let gameoverSound, pointScore, depointScore;
let gameOverSprite, gameOverImage;
let score = 0;
const gameStates = {
    'END' : 0,
    'PLAY' : 1
}
    gameState = gameStates.PLAY

const treasures = [
    'cash',
    'diamonds',
    'jwell',
    'ruby',
    'sword'
];
const scores = {
    'cash': 1,
    'diamonds': 2,
    'jwell': -2,
    'ruby': 3
}

function preload() {
    backgroundImage = loadImage('src/assets/Road.png');
    cashImage = loadImage('src/assets/cash.png');
    diamondsImage = loadImage('src/assets/diamonds.png');
    jwellImage = loadImage('src/assets/jwell.png');
    rubyImage = loadImage('src/assets/ruby.png');
    swordImage = loadImage('src/assets/sword.png');
    gameOverImage = loadImage('src/assets/gameOver.png');
    userAnimation = loadAnimation('src/assets/runner1.png', 'src/assets/runner2.png');
    userAnimationStill = loadAnimation('src/assets/runner1.png');
    gameoverSound = loadSound('src/assets/gameover.mp3');
    pointScore = loadSound('src/assets/powerup.mp3');
    depointScore = loadSound('src/assets/powerdown.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    backgroundSprite = createSprite(windowWidth / 2, windowHeight / 2, 100, 100);
    backgroundSprite.addImage('background', backgroundImage);

    userSprite = createSprite(windowWidth / 2, windowHeight - 75, 10, 10);
    userSprite.addAnimation('running', userAnimation);
    userSprite.addAnimation('still', userAnimationStill);
    userSprite.scale = 0.15;
    userSprite.frameDelay = 15;
    userSprite.setCollider('rectangle', 0, 0, 900, 900);

    gameOverSprite = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
    gameOverSprite.addImage('gameover', gameOverImage);
    gameOverSprite.scale = 1;
    gameOverSprite.visible = false;

    cashGroup = new Group();
    diamondGroup = new Group();
    jwellGroup = new Group();
    rubyGroup = new Group();
    swordGroup = new Group();
}

function draw() {
    background('white');

    if (backgroundSprite.y > windowHeight) {
        backgroundSprite.y = windowHeight / 2;
    }

    userSprite.collide(createEdgeSprites());

    if (gameState === gameStates.PLAY) {
        gameOverSprite.visible = false;
        backgroundSprite.velocity.y = 3;


        if (touches.length > 0) {
            userSprite.x = touches[0].x;
            touches = [];
        }

        userSprite.changeAnimation('running');

        if (frameCount % 100 === 0) {
            let x = Math.floor(random(0, windowWidth));
            new Treasure(x);
        }

        if (score < 0) {
            gameState = gameStates.END;
            gameoverSound.play();
        }

    } else if (gameState === gameStates.END) {
        backgroundSprite.velocity.y = 0;
        score = 0;
        userSprite.changeAnimation('still');
        gameOverSprite.visible = true;
    }

    drawSprites();
    fill('black');
    textSize(32);
    text(`Score: ${score}`, (windowWidth / 2) - 50, 30);

    checkKeys();
    checkCollision();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    userSprite.x = windowWidth / 2; 
    userSprite.y = windowHeight - 75;
}

function checkKeys(){
    if (keyIsDown(LEFT_ARROW)) {
        userSprite.x -= 10;
      }
    
    if (keyIsDown(RIGHT_ARROW)) {
        userSprite.x += 10;
    }
}
