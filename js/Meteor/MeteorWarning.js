class MeteorWarning {
	constructor( x, y){
		this.x = x;
		this.y = y;
		var border = [];
		 border.push( new Phaser.Line( 0, 0, Nakama.configs.GAME_WIDTH - 51, 0) );
		 border.push( new Phaser.Line( 0, Nakama.configs.GAME_HEIGHT - 51, Nakama.configs.GAME_WIDTH - 51, Nakama.configs.GAME_HEIGHT - 51) );
		 border.push( new Phaser.Line( 0, 0, 0, Nakama.configs.GAME_HEIGHT - 51) );
		 border.push( new Phaser.Line( Nakama.configs.GAME_WIDTH - 51, 0, Nakama.configs.GAME_WIDTH - 51, Nakama.configs.GAME_HEIGHT - 51) );

		 for( let i = 0; i < 4; i++){
		 	var p = new Phaser.Point();
		 	var line = new Phaser.Line( this.x, this.y, Nakama.player.sprite.position.x, Nakama.player.sprite.position.y);
			p = line.intersects(border[i], true);
			if (p) {
				this.sprite = Nakama.warningGroup.create( p.x, p.y, 'meteorWarning');
				this.timerSprite = Nakama.game.time.events;
				this.sprite.scaleSize = 0.1;
				this.sprite.scale.set(this.sprite.scaleSize);
				this.timerSprite.repeat(500, 1, this.killSprite, this);

				break;
			}
		}


	}

	killSprite(){
		this.sprite.kill();
	}
}