var Nakama = {};
Nakama.configs = {
  //scoring
  BONUS_KILL_ENEMY  : 10,
  GAME_WIDTH        : 1600,
  GAME_HEIGHT       : 900
};

window.onload = function(){
  Nakama.game = new Phaser.Game(Nakama.configs.GAME_WIDTH,Nakama.configs.GAME_HEIGHT,Phaser.CANVAS,'', null, false, false);

  Nakama.game.state.add('boot', bootState);
  Nakama.game.state.add('load', loadState);
  Nakama.game.state.add('menu', menuState);
  Nakama.game.state.add('play', playState);
  Nakama.game.state.add('win', winState);
  Nakama.game.state.start('boot');
}
