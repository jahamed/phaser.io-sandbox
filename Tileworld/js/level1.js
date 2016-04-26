Platformer.level1 = {};

Platformer.level1.assets = {
    map: {URL: 'assets/level1.json', name: 'level1', width: 20, height: 10},
    tilesheet: {URL: 'assets/spritesheet.png', name: 'spritesheet'}
};

Platformer.level1.game = function game (game) {
    this.mapData;
    this.mapLayer;
};

Platformer.level1.game.prototype.preload = function () {
    this.game.load.tilemap(Platformer.level1.assets.map.name, Platformer.level1.assets.map.URL, null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image(Platformer.level1.assets.tilesheet.name, Platformer.level1.assets.tilesheet.URL);
};

Platformer.level1.game.prototype.create = function () {
    this.game.stage.backgroundColor = "#73DCFF";
    
    this.mapData = this.game.add.tilemap(Platformer.level1.assets.map.name);
    this.mapData.addTileSetImage(Platformer.level1.assets.tilesheet.name);
    
    this.mapLayer = this.mapData.createLayer(Platformer.level1.assets.map.name);
};

Platformer.level1.game.prototype.update = function () {
    
};