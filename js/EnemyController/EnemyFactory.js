class EnemyFactory {
  constructor() {
    //timing
    Nakama.gameTime = 1;
    Nakama.enemyPool = new Enemy1Pool();
    Nakama.enemy2Pool = new Enemy2Pool();
    this.sprite = Nakama.game.add.sprite();
    this.sprite.update = this.update.bind(this);
    Nakama.configs.ENEMY_SPAWN_SPEED = 500;
    this.createEnemy();
  }

  update() {
    Nakama.game.physics.arcade.collide(Nakama.enemyGroup);
    if (!Nakama.playerDie) {
      Nakama.gameTime += (Nakama.frame % 60 === 0);
      //enemy rain
      // if (Nakama.gameTime % 21 == 0) {
      //   Nakama.enemyFactories.push(new EnemyFactory1());
      //   Nakama.gameTime++;
      // }
      if (Nakama.gameTime % 53 == 0) {
        Nakama.enemyFactories.push(new EnemyFactory2());
        Nakama.gameTime++;
      }
      if (Nakama.gameTime == 30) {
        Nakama.configs.ENEMY_SPAWN_SPEED = 200;
      }
      if (Nakama.gameTime == 60) {
        Nakama.configs.ENEMY_SPAWN_SPEED = 100;
      }
    } else {
      clearInterval(this.enemyInterval);
    }
  }

  createEnemy() {
    this.enemyInterval = setInterval(function(){  Nakama.enemyPool.addEnemy(); }, Nakama.configs.ENEMY_SPAWN_SPEED);
  }
}
