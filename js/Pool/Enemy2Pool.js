class Enemy2Pool {
  constructor() {
    this.pool = [];
    var tmpEnemy = {};
    for(var i=0; i<5; i++) {
      tmpEnemy = new EnemyType2Controller(-100, -100, 0, 100);
      tmpEnemy.sprite.kill();
      this.pool.push(tmpEnemy.sprite);
      tmpEnemy = new EnemyType2Controller(-100, -100, 0, -100);
      tmpEnemy.sprite.kill();
      this.pool.push(tmpEnemy.sprite);
    }
  }

  addEnemy(x, y) {
    this.x = x;
    this.y = y;
    for(var i = 0; i < this.pool.length; i++) {
      if (!this.pool[i].alive) {
        this.pool[i].reset(this.x, this.y);
        break;
      }
    }
  }
}
