var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
		this.game.load.spritesheet('player', 'assets/greenninja.png', 38, 48);
	    this.game.load.tilemap('tilemap', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
	    this.game.load.image('tiles', 'assets/tilesheet128.png');
	},

	create: function(){
		this.game.state.start("Main");
	}
}