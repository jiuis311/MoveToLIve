class Enemy1Pool {
  constructor() {
    this.pool = [];
    var tmpEnemy = {};
    for(var i=0; i<200; i++) {
      tmpEnemy = new EnemyController();
      tmpEnemy.sprite.kill();
      this.pool.push(tmpEnemy.sprite);
    }
  }

  addEnemy() {
    this.x = Math.floor((Math.random() * Nakama.game.scale.maxWidth) + 1);
    this.y = Math.floor((Math.random() * Nakama.game.scale.maxHeight) + 1);
    this.z = Math.floor((Math.random() * 4) + 1);

    if (this.z == 1) this.y = -30;
    if (this.z == 2) this.x = Nakama.game.scale.maxWidth + 30;
    if (this.z == 3) this.y = Nakama.game.scale.maxHeight + 30;
    if (this.z == 4) this.x = -30;

    for(var i = 0; i < this.pool.length; i++) {
      if (!this.pool[i].alive) {
        this.pool[i].reset(this.x, this.y);
        break;
      }
    }
  }
}
