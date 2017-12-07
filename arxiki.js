var arxiki= {
	preload: function(){
		game.load.image('loading',  'assets/loading.png');
		game.load.image('logo', 'assets/logo.png');
		game.load.image('level1','assets/level1.png');
		game.load.image('backg','assets/mariomenu.jpg');
	},
	create:function(){	
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		var background=game.add.sprite(0,0,'backg');
		

		var button1 = game.add.button(100 , 150, "level1");
		button1.anchor.set(0.5, 0.5);

	}
}