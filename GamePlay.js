var GamePlay = {
function preload() {
			//  We need this because the assets are on github pages
			//  Remove the next 2 lines if running locally
			
			this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
			this.load.tilemap('level', 'assets/MyMap.json', null,
					Phaser.Tilemap.TILED_JSON);
			this.load.audio("coin", "audio/coin.wav");
			this.load.audio("bac", "audio/supermariobros.mp3");
			this.load.audio("jump", "audio/jump.wav");
			this.load.audio("stomp", "audio/stomp.wav");
		}
		function create() {
			music = game.add.audio('supermariobros');
				music.play();
			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.stage.backgroundColor = '#156796';
			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');
			map.createLayer('background');
			layer = map.createLayer('solid');
			layer.resizeWorld();
			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');
			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);
			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;
			game.camera.follow(player);
			cursors = game.input.keyboard.createCursorKeys();
			game.jumpSnd = game.add.audio('jump');
			game.coinSnd = game.add.audio('coin');
			game.stompSnd = game.add.audio('stomp');
			game.bacSnd = game.add.audio('bac');
            		game.bacSnd.play();
			tscore = game.add.text(16,16,'SCORE : 0',{fontSize:'8px', fill:'#FFFF00'});
            		tbonus = game.add.text(76,16,'BONUS : 0 ',{fontSize:'8px', fill:'#FFFF00'});
			tlife = game.add.text(136,16,'LIVES : 3',{fontSize:'8px', fill:'#FFFF00'});
			tscore.fixedToCamera = true;
			tbonus.fixedToCamera = true;
			tlife.fixedToCamera = true;
		}
		function update() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}
				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
					game.jumpSnd.play();
					player.animations.stop();
				}
				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}
}
