
import Tile from "../assets/tile.png";

class Level0 {
    constructor(scene){
        this.scene = scene,
        this.width = 2000,
        this.height = 600,
        this.tiles = [
            {x: 0, y: 12},
            {x: 1, y: 12},
            {x: 2, y: 12},
            {x: 3, y: 12},
            {x: 4, y: 12},
            {x: 5, y: 12},
            {x: 7, y: 12},
            {x: 8, y: 12},
            {x: 9, y: 12},
            {x: 10, y: 12},
            {x: 13, y: 12},
            {x: 14, y: 12},
            {x: 15, y: 10.5},
            {x: 16, y: 10.5},
            {x: 17, y: 10.5},
            {x: 18, y: 10.5},
            {x: 19, y: 10.5},
        ]
    }
    preload() {
        this.scene.load.image("tile", Tile);
    }

    create() {
        this.scene.platforms = this.scene.physics.add.staticGroup();


        for(let i = 0; i < this.tiles.length; i++){
            this.scene.platforms.create(this.tiles[i].x * 50, this.tiles[i].y * 50, "tile");  
        }

        // this.scene.platforms.create(400, 568, "tile");   
        // this.scene.platforms.create(600, 400, "tile");
        // this.scene.platforms.create(50, 250, "tile");
        // this.scene.platforms.create(750, 220, "tile");
        // this.scene.platforms.create(50, 600, "tile");
        // this.scene.platforms.create(100, 600, "tile");
        // this.scene.platforms.create(50, 500, "tile");
        // this.scene.platforms.create(150, 600, "tile");
        // this.scene.platforms.create(250, 600, "tile");
        // this.scene.platforms.create(300, 600, "tile");
        // this.scene.platforms.create(350, 600, "tile");
    }

    update() {

    }
}

export default Level0;

