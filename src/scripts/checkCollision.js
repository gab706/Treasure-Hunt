function checkCollision() {
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
        if (score >= 0)
            depointScore.play();
    } else if (userSprite.isTouching(rubyGroup)) {
        rubyGroup.destroyEach();
        score = score + scores['ruby'];
        pointScore.play();
    } else if (userSprite.isTouching(swordGroup)) {
        swordGroup.destroyEach();
        score = -1;
    }
}
