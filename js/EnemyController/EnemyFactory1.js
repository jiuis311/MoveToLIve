class EnemyFactory1 {
  constructor() {
    for(var i = 100; i < 1500; i+= 300) {
      // Nakama.enemies.push(new EnemyType2Controller(i, Nakama.game.height, 0, -100));
      Nakama.enemy2Pool.addEnemy(i + 150, -100);
      Nakama.enemy2Pool.addEnemy(i, Nakama.game.height + 100);
      // Nakama.enemies.push(new EnemyType2Controller(i + 150, -100, 0, 100));
    }
  }
}
