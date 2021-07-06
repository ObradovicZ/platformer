import CatWalk from "../assets/cat-walk.png";
import CatJump from "../assets/cat-jump.png";
import CatIdle from "../assets/cat-idle.png";

class PlayerHanlder {
    constructor(scene) {
        this.scene = scene
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
    }

    create() {
        this.player = this.scene.physics.add.sprite(100, 450, "catWalk").setScale(1.5);

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(18, 40, 23, 0);
        this.player.body.setGravityY(900);

        this.createAnims();
    }

    update() {
        if (this.scene.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.flipX = true;
            this.player.anims.play('left', true);
        }
        else if (this.scene.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.flipX = false;
            this.player.anims.play('right', true);
        }
        else if (this.player.body.touching.down) {
            this.player.setVelocityX(0);

            this.player.anims.play("idle", true);
        }
        if (!this.player.body.touching.down) {
            if (this.player.body.velocity.y < 0) {
                this.player.anims.play("jumpingUp", false);
            } else {
                this.player.anims.play("jumpingDown", false);
            }
        }

        if (this.scene.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
        }
    }

    createAnims(){
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
    }
}

export default PlayerHanlder;