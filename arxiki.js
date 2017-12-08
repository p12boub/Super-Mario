var arxiki = {
preload: function() {
    game.load.image('arxiki', 'assets/mariomenu.jpg');
		game.load.image('level1', 'assets/level1.png');
		game.load.audio('supermariobros', 'audio/supermariobros.mp3');
		},
    
    create: function() {
		
			supermariobros = game.add.audio('supermariobros');
			supermariobros.play();

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);
			
			var menuPic = game.add.sprite(0, 0, 'arxiki');

			
			var click1 = game.add.button(110, 150, 'level1', function() {
			game.state.start('GamePlay'); 	
			supermariobros.stop();
		});
		click1.anchor.set(0.5, 0.5);
	}
}
