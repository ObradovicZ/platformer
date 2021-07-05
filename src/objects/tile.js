class Tile extends Entity {
  constructor() {
    super();
  }

  preload() {
    this.load.image("tile", tile);
  }

  create() {
            platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'tile');
    
        platforms.create(600, 400, 'tile');
        platforms.create(50, 250, 'tile');
        platforms.create(750, 220, 'tile');

  }

  update() {}
}
