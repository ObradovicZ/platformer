import Phaser from "phaser";
import Bg from "./assets/BG.png";
import Tile from "./assets/tile.png";
import CatWalk from "./assets/cat-walk.png";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.platforms = {},
    this.player = {},
    this.cursors = undefined
  }

  preload() {
    this.load.image("bg", Bg);
    this.load.image("tile", Tile);
    this.load.spritesheet('catWalk', 
        CatWalk,
        { frameWidth: 64, frameHeight: 40 }
    );
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    console.log(this);
    console.log(Phaser);
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, "tile");

    this.platforms.create(600, 400, "tile");
    this.platforms.create(50, 250, "tile");
    this.platforms.create(750, 220, "tile");

    this.player = this.physics.add.sprite(100, 450, "catWalk").setScale(1.5);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("catWalk", { start: 0, end: 7 }),
        frameRate: 30,
        repeat: -1,
      });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("catWalk", { start: 0, end: 7 }),
        frameRate: 30,
        repeat: -1,
      });
  }

  update(){
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
        console.log(this.player);
        // this.player.frame.scaleX(-1);
        this.player.flipX = true;
        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
        this.player.flipX = false;
        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);
    
        this.player.anims.stop();
    }
    
    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }

  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
