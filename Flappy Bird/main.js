var mainState = {
    preload: function () {
        // called at start, load images/sounds
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        game.load.audio('jump', 'assets/jump.wav');
    },
    
    create: function () {
        // called after preload
        // set-up game, display sprites
        
        // Change background color to blue
        game.stage.backgroundColor = '#71c5cf';
        
        // If this is not a desktop (so it's a mobile device) 
        if (game.device.desktop == false) {
            // Set the scaling mode to SHOW_ALL to show all the game
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
            // Set a minimum and maximum size for the game
            // Here the minimum is half the game size
            // And the maximum is the original game size
            game.scale.setMinMax(game.width/2, game.height/2, 
                game.width, game.height);
        }
        
        // Center the game horizontally and vertically
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        // Set physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Display bird image
        this.bird = game.add.sprite(100, 245, 'bird');
        
        // Change anchor
        this.bird.anchor.setTo(-0.2, 0.5);
        
        // Add physics to bird for movement, gravity, collisions
        game.physics.arcade.enable(this.bird);
        
        // Add gravity to bird
        this.bird.body.gravity.y = 1000;
        
        // Add jump sound
        this.jumpSound = game.add.audio('jump');
        
        // Create empty group for pipes
        this.pipes = game.add.group();
        
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        
        // Call jump function when screen is tapped/clicked on
        game.input.onDown.add(this.jump, this);
        
        // Add a pipe every 1.5 seconds
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
        
        // Display Score
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#FFFFFF"});

    },
    
    update: function () {
        // called 60 times a second
        
        // If the bird leaves the screen, restart the game
        if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame();
        }
        
        // If the bird collides with pipe group, restart game
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
        
        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }
    },
    
    addOnePipe: function (x, y) {
        // Create pipe at x,y
        var pipe = game.add.sprite(x, y, 'pipe');
        
        // Add pipe to group
        this.pipes.add(pipe);
        
        // Enable physics
        game.physics.arcade.enable(pipe);
        
        // Add velocity to pipe to make it move left
        pipe.body.velocity.x = -200;
        
        // Automatically kill the pipe when it's not visible
        pipe.checkWorldBounces = true;
        pipe.outOfBoundsKill = true;
    },
    
    addRowOfPipes: function () {
        // Pick a random number from 1-5 for the hole position
        var hole = Math.floor(Math.random() * 5) + 1;
        
        // Add 6 pipes with a 2 unit wide hole
        for (var i = 0; i < 8; i++) {
            if (i != hole && i != hole + 1) {
                this.addOnePipe(400, (i * 60) + 10);
            }
        }
        
        this.score += 1;
        this.labelScore.text = this.score;
    },
    
    jump: function () {
        // Is bird dead?
        if (this.bird.alive == false) {
            return;
        }
        
        this.jumpSound.play();
        
        // Add vertical velocity to the bird
        this.bird.body.velocity.y = -350;
        // this.bird.angle = -20; //too abrupt
        
        // Create animation for bird jumping, over 100 ms
        var animation = game.add.tween(this.bird);
        animation.to({angle: -20}, 100);
        animation.start();
        
        // game.add.tween(this.bird).to({angle: -20}, 100).start(); // one liner

    },
    
    hitPipe: function () {
        // If the bird has already hit a pipe don't do anything, its falling already
        if (this.bird.alive == false) {
            return;
        }
        
        this.bird.alive = false;
        
        // Prevent new pipes from being generated
        game.time.events.remove(this.timer);
        
        // Go through all pipes, stop their movement
        this.pipes.forEach(function (p) {
            p.body.velocity.x = 0;
        }, this);
    },
    
    restartGame: function () {
        // Start 'main' state which will restart the game
        game.state.start('main');
    }
};


// initialize Phaser
var game = new Phaser.Game(400, 490);

// add and start 'main' state
game.state.add('main', mainState, true);