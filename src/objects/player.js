import CatWalk from "../assets/cat-walk.png";
import CatJump from "../assets/cat-jump.png";
import CatIdle from "../assets/cat-idle.png";
import CatAttack from "../assets/cat-attack.png";

class PlayerHanlder {
    constructor(scene) {
        this.scene = scene,
            this.isAttacking = false
    }

    preload() {
        this.scene.load.spritesheet('catWalk',
            CatWalk,
            { frameWidth: 64, frameHeight: 40 }
        );
        this.scene.load.spritesheet('catJump',
            CatJump,
            { frameWidth: 64, frameHeight: 40 }
        );
        this.scene.load.spritesheet('catIdle',
            CatIdle,
            { frameWidth: 64, frameHeight: 40 }
        );
        this.scene.load.spritesheet('catAttack',
            CatAttack,
            { frameWidth: 64, frameHeight: 40 }
        );
    }

    create() {
        this.player = this.scene.physics.add.sprite(100, 450, "catWalk").setScale(1.5);

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(18, 40, 23, 0);
        this.player.body.setGravityY(900);

        this.createAnims();
        this.createEvents();
    }

    update() {

        if (this.scene.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.flipX = true;
            this.switchAnimation("left");
        }
        else if (this.scene.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.flipX = false;
            this.switchAnimation("right");
        }
        else if (this.player.body.touching.down) {
            this.player.setVelocityX(0);
            this.switchAnimation("idle");
        }
        if (!this.player.body.touching.down) {
            if (this.player.body.velocity.y < 0) {
                this.switchAnimation("jumpingUp");
            } else {
                this.switchAnimation("jumpingDown");
            }
        }
        if (this.scene.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
        }

    }

    switchAnimation(target) {
        if (!this.isAttacking) {
            this.player.anims.play(target, true);
        }
    }

    createAnims() {
        // TO-DO -> Pack this in object and loop trough it
        this.scene.anims.create({
            key: "left",
            frames: this.scene.anims.generateFrameNumbers("catWalk", { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "right",
            frames: this.scene.anims.generateFrameNumbers("catWalk", { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "jumpingUp",
            frames: this.scene.anims.generateFrameNumbers("catJump", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "jumpingDown",
            frames: this.scene.anims.generateFrameNumbers("catJump", { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "idle",
            frames: this.scene.anims.generateFrameNumbers("catIdle", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "attack",
            frames: this.scene.anims.generateFrameNumbers("catAttack", { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });
    }

    createEvents(){
        this.scene.input.keyboard.on('keydown-' + 'A', () => {
            if (this.isAttacking) {
                return;
            }
            this.player.anims.play("attack", true);
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 400);
        }
        );
    }
}

export default PlayerHanlder;