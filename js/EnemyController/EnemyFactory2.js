class EnemyFactory2 {
  constructor() {
    for(var i = 0; i < 30; i++)
      Nakama.enemyPool.addEnemy();
  }
}
