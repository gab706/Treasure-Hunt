class Treasure {
    constructor(x) {
        let item = treasures[Math.floor(random(0, treasures.length))],
            sprite = createSprite(x, 0 - 50, 10, 10);
        switch (item) {
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
