import Phaser from "phaser";
import Bg from "./assets/BG.png";
import Tile from "./assets/tile.png";

import PlayerHanlder from "./objects/player";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.platforms = {},
      this.playerHandler = new PlayerHanlder(this),
      this.cursors = undefined
  }

  preload() {
    this.load.image("bg", Bg);
    this.load.image("tile", Tile);
    this.playerHandler.preload();
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, "tile");

    this.platforms.create(600, 400, "tile");
    this.platforms.create(50, 250, "tile");
    this.platforms.create(750, 220, "tile");
    this.platforms.create(50, 600, "tile");
    this.platforms.create(50, 500, "tile");
    this.platforms.create(150, 600, "tile");
    this.platforms.create(250, 600, "tile");
    this.platforms.create(300, 600, "tile");
    this.platforms.create(350, 600, "tile");


    this.playerHandler.create();
    this.physics.add.collider(this.playerHandler.player, this.platforms);
    



    this.input.keyboard.on('keydown-A', function (event) {

      this.cameras.main.setRotation(this.cameras.main.rotation - 0.01);

    }, this);
  }

  update() {
    this.playerHandler.update();




    // if (!this.player.body.touching.down) {
    //   // console.log(this.player);
    //   if (this.player.body.velocity.y < 0) {
    //     this.player.anims.play("jumpingUp",true);
    //   } else {
       
    //     this.player.anims.play("jumpingDown",true);
    //   }
    // }


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
