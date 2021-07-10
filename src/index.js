import Phaser from "phaser";
import Bg from "./assets/BG.png";
import Level0 from "./levels/level0";


import PlayerHanlder from "./objects/playerHandler";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.platforms = {},
      this.playerHandler = new PlayerHanlder(this),
      this.cursors = undefined,
      this.camera = undefined,
      this.bg = undefined,
      this.level = new Level0(this)
  }

  preload() {
    this.load.image("bg", Bg);

    this.level.preload();
    this.playerHandler.preload();
  }

  create() {
    // Background
    this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    // Camera
    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, this.level.width, this.level.height);

    this.physics.world.setBounds(0, 0, this.level.width, this.level.height);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.level.create();
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
      gravity: { y: 900 },
      debug: false
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
