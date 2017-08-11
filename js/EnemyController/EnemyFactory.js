class EnemyFactory {
  constructor() {
    //timing
    Nakama.gameTime = 0;
    this.sprite = Nakama.game.add.sprite();
    this.sprite.update = this.update.bind(this);
  }

  update() {
    if (!Nakama.playerDie) {
      Nakama.gameTime += (Nakama.frame % 60 === 0);
      //enemy rain
      if (Nakama.gameTime == 30) {
        Nakama.enemyFactories.push(new EnemyFactory1());
        Nakama.gameTime++;
      }
      if (Nakama.gameTime == 60) {
        Nakama.enemyFactories.push(new EnemyFactory2());
        Nakama.gameTime++;
      }
    }
  }
}
