var splash= {
	preload: function(){
		game.load.image('menu1',  'assets/menu.png');
		game.load.image('level', 'assets/level1.png');
		
	},
	create:function(){	
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		var background=game.add.sprite(0,0,'menu1');
		//background.anchor.set(0.5,0.5);

	 var button1 = game.add.button(100 , 150, "level", function(){
			game.state.start('state1');
		});
		button1.anchor.set(0.5, 0.5);

	}
}
