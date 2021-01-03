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
let PLAY = 1,
    END = 0,
    gameState = PLAY;

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
    backgroundImage = loadImage('./assets/Road.png');
    cashImage = loadImage('./assets/cash.png');
    diamondsImage = loadImage('./assets/diamonds.png');
    jwellImage = loadImage('./assets/jwell.png');
    rubyImage = loadImage('./assets/ruby.png');
    swordImage = loadImage('./assets/sword.png');
    gameOverImage = loadImage('./assets/gameOver.png');
    userAnimation = loadAnimation('./assets/runner1.png', './assets/runner2.png');
    userAnimationStill = loadAnimation('./assets/runner1.png');
    gameoverSound = loadSound('./assets/gameover.mp3');
    pointScore = loadSound('./assets/powerup.mp3');
    depointScore = loadSound('./assets/powerdown.mp3');
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

    if (gameState === PLAY) {
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

        if (userSprite.isTouching(cashGroup)) {
            cashGroup.destroyEach();
            score = score + scores['cash'];
            pointScore.play();
        } else if (userSprite.isTouching(diamondGroup)) {
            diamondGroup.destroyEach();
            score = score + scores['diamonds'];
            pointScore.play();
        } else if (userSprite.isTouching(jwellGroup)) {
            jwellGroup.destroyEach();
            score = score + scores['jwell'];
            if (score >= 0) depointScore.play();
        } else if (userSprite.isTouching(rubyGroup)) {
            rubyGroup.destroyEach();
            score = score + scores['ruby'];
            pointScore.play();
        } else if (userSprite.isTouching(swordGroup)) {
            swordGroup.destroyEach();
            score = -1;
        }

        if (score < 0) {
            gameState = END;
            gameoverSound.play();
        }

    } else if (gameState === END) {
        backgroundSprite.velocity.y = 0;
        score = 0;
        userSprite.changeAnimation('still');
        gameOverSprite.visible = true;
    }

    drawSprites();
    fill('black');
    textSize(32);
    text(`Score: ${score}`, (windowWidth / 2) - 50, 30);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    userSprite.x = windowWidth / 2; 
    userSprite.y = windowHeight - 75;
}

class Treasure {
    constructor(x) {
        let item = treasures[Math.floor(random(0, treasures.length))],
            sprite = createSprite(x, 0 - 50, 10, 10);
        switch(item) {
            case 'cash':
                sprite.addImage('cash', cashImage);
                sprite.scale = 0.3;
                sprite.velocity.y = (score / 2) + 10;
                sprite.lifetime = windowHeight / ((score / 2) + 10);
                sprite.setCollider('rectangle', 0, 0, 400, 400);
                cashGroup.add(sprite);
                break;
            case 'diamonds':
                sprite.addImage('diamonds', diamondsImage);
                sprite.scale = 0.09;
                sprite.velocity.y = (score / 2) + 15;
                sprite.lifetime = windowHeight / ((score / 2) + 15);
                diamondGroup.add(sprite);
                break;
            case 'jwell':
                sprite.addImage('jwell', jwellImage);
                sprite.scale = 0.3;
                sprite.x = userSprite.x;
                sprite.velocity.y = (score / 2) + 15;
                sprite.lifetime = windowHeight / ((score / 2) + 15);
                sprite.setCollider('rectangle', 0, 0, 400, 400);
                jwellGroup.add(sprite);
                break;
            case 'ruby':
                sprite.addImage('ruby', rubyImage);
                sprite.scale = 0.2;
                sprite.velocity.y = (score / 2) + 20;
                sprite.lifetime = windowHeight / ((score / 2) + 20);
                sprite.setCollider('rectangle', 0, 0, 600, 600);
                rubyGroup.add(sprite);
                break;
            case 'sword':
                sprite.addImage('sword', swordImage);
                sprite.scale = 0.2;
                sprite.x = userSprite.x;
                sprite.velocity.y = (score / 2) + 20;
                sprite.lifetime = windowHeight / ((score / 2) + 20);
                swordGroup.add(sprite);
                break;
        }
    }
}