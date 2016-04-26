Platformer.states = {
    level1: "level1",  
};

Platformer.game = new Phaser.Game(Platformer.gameProperties.screenWidth, Platformer.gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
Platformer.game.state.add(Platformer.states.level1, Platformer.level1.game);
Platformer.game.state.start(Platformer.states.level1);