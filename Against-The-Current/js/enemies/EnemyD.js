class EnemyD {
    constructor() {
        this.arrayPoint = Dakra.map.arrayPoint[
            Math.floor(Math.random() * Dakra.map.arrayPoint.length)
        ];
        this.currPos = 0;
        this.nextPos = 1;
        this.sprite = Dakra.enemyGroup.create(
            (this.arrayPoint[this.currPos].x + 0.5) * Dakra.configs.UNIT,
            (this.arrayPoint[this.currPos].y + 0.5) * Dakra.configs.UNIT,
            'chars'
        );
        this.sprite.father = this;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.setupAnimation();

        this.armor = 200;
        this.COIN = 80 + 10 * Math.floor(Dakra.enemyGroup.length / 10);
        this.sprite.health = 400 + 40 * Math.floor(Dakra.enemyGroup.length / 10);
        this.movementSpeed = 50; // MAX = 300
    }

    revive() {
        this.sprite.revive();

        this.currPos = 0;
        this.nextPos = 1;
        this.sprite.position.x = (this.arrayPoint[this.currPos].x + 0.5) * Dakra.configs.UNIT;
        this.sprite.position.y = (this.arrayPoint[this.currPos].y + 0.5) * Dakra.configs.UNIT;

        this.armor = 300;
        this.sprite.health = 400;
        this.movementSpeed = 50; // MAX = 300
    }

    beShot(bullet) {
        this.sprite.damage(bullet.damage * 100 / (100 + this.armor * bullet.armorPen));
        if (!this.sprite.alive) Dakra.MONEY = Dakra.MONEY + this.COIN;
        this.beSlowed(bullet.slow);
    }

    beSlowed(damage) {
        if (this.movementSpeed <= 25) return;
        this.movementSpeed = this.movementSpeed - damage;
    }

    setupAnimation() {
        this.sprite.animations.add('godown', Phaser.Animation
            .generateFrameNames('char-4-godown-', 1, 3, '.png', 1), 15, true);
        this.sprite.animations.add('goleft', Phaser.Animation
            .generateFrameNames('char-4-goleft-', 1, 3, '.png', 1), 15, true);
        this.sprite.animations.add('goright', Phaser.Animation
            .generateFrameNames('char-4-goright-', 1, 3, '.png', 1), 15, true);
        this.sprite.animations.add('goup', Phaser.Animation
            .generateFrameNames('char-4-goup-', 1, 3, '.png', 1), 15, true);
    }

    update() {
        if (this.nextPos == this.arrayPoint.length) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.position.x = (this.arrayPoint[this.currPos].x + 0.5) * Dakra.configs.UNIT;
            this.sprite.position.y = (this.arrayPoint[this.currPos].y + 0.5) * Dakra.configs.UNIT;

Dakra.LIFE--;
            this.sprite.kill();
        } else this.checkDirection();
    }

    checkDirection() {
        var currPosition = new Phaser.Point(
            this.sprite.position.x,
            this.sprite.position.y
        );
        var nextPosition = new Phaser.Point(
            (this.arrayPoint[this.nextPos].x + 0.5) * Dakra.configs.UNIT,
            (this.arrayPoint[this.nextPos].y + 0.5) * Dakra.configs.UNIT
        );

        if (this.checkApproach(nextPosition.x, currPosition.x) &
            this.checkApproach(nextPosition.y, currPosition.y)) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.currPos = this.nextPos;
            this.nextPos = this.currPos + 1;
        } else if (nextPosition.x == currPosition.x) {
            if (nextPosition.y > currPosition.y) this.goDown();
            if (nextPosition.y < currPosition.y) this.goUp();
        } else if (nextPosition.y == currPosition.y) {
            if (nextPosition.x > currPosition.x) this.goRight();
            if (nextPosition.x < currPosition.x) this.goLeft();
        } else {
            this.sprite.position.x = (this.arrayPoint[this.currPos].x + 0.5) * Dakra.configs.UNIT;
            this.sprite.position.y = (this.arrayPoint[this.currPos].y + 0.5) * Dakra.configs.UNIT;
        }
    }

    goUp() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = -this.movementSpeed;
        this.sprite.animations.play('goup');
    }

    goDown() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = this.movementSpeed;
        this.sprite.animations.play('godown');
    }

    goRight() {
        this.sprite.body.velocity.x = this.movementSpeed;
        this.sprite.body.velocity.y = 0;
        this.sprite.animations.play('goright');
    }

    goLeft() {
        this.sprite.body.velocity.x = -this.movementSpeed;
        this.sprite.body.velocity.y = 0;
        this.sprite.animations.play('goleft');
    }

    checkApproach(x, y) {
        return Math.abs(x - y) < 1;
    }
}
