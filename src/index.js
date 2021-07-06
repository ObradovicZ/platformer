import Phaser from "phaser";
import Bg from "./assets/BG.png";
import Tile from "./assets/tile.png";

import PlayerHanlder from "./objects/player";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.platforms = {},
      this.playerHandler = new PlayerHanlder(this),
      this.cursors = undefined,
      this.camera = undefined,
      this.bg = undefined,
      this.world = {
        width: 2000,
        height: 600
      }
  }

  preload() {
    this.load.image("bg", Bg);

    this.load.image("tile", Tile);

    this.playerHandler.preload();
  }

  create() {

    // Camera
    this.camera = this.cameras.main;
    // this.camera.setViewport(0, 0, 800, 600);
    this.camera.setBounds(0, 0, 2000, 600);

    this.physics.world.setBounds(0, 0, 2000, 600);
    this.cursors = this.input.keyboard.createCursorKeys();
    // this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, "tile");

    this.platforms.create(600, 400, "tile");
    this.platforms.create(50, 250, "tile");
    this.platforms.create(750, 220, "tile");
    this.platforms.create(50, 600, "tile");
    this.platforms.create(100, 600, "tile");
    this.platforms.create(50, 500, "tile");
    this.platforms.create(150, 600, "tile");
    this.platforms.create(250, 600, "tile");
    this.platforms.create(300, 600, "tile");
    this.platforms.create(350, 600, "tile");


    this.playerHandler.create();
    this.physics.add.collider(this.playerHandler.player, this.platforms);

    this.camera.startFollow(this.playerHandler.player);

  }

  update() {

    this.playerHandler.update();

    this.bg.tilePositionX = this.camera.scrollX * .3;

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
      debug: false
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
