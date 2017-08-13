class MeteorPool {
  constructor() {
    this.pool = [];
    var tmpEnemy = {};
    for(var i=0; i<6; i++) {
      tmpEnemy = new MeteorController();
      tmpEnemy.sprite.kill();
      this.pool.push(tmpEnemy.sprite);
    }
  }

  addMeteor() {
    this.x = Math.floor((Math.random() * Nakama.game.scale.maxWidth) + 1);
    this.y = Math.floor((Math.random() * Nakama.game.scale.maxHeight) + 1);
    this.z = Math.floor((Math.random() * 4) + 1);

    this.distanceToWorld = 500;
    if (this.z == 1) this.y = -this.distanceToWorld;
    if (this.z == 2) this.x = Nakama.game.scale.maxWidth + this.distanceToWorld;
    if (this.z == 3) this.y = Nakama.game.scale.maxHeight + this.distanceToWorld;
    if (this.z == 4) this.x = -this.distanceToWorld;

    for(var i = 0; i < this.pool.length; i++) {
      if (!this.pool[i].alive) {
        this.pool[i].reset(this.x, this.y);
        this.pool[i].body.velocity.x = (Nakama.player.sprite.position.x - this.pool[i].x)/1.5;
        this.pool[i].body.velocity.y = (Nakama.player.sprite.position.y - this.pool[i].y)/1.5;
        new MeteorWarning(this.x, this.y);
        this.timerMeteorKill = Nakama.game.time.events;
        this.timerMeteorKill.repeat(7000, 1, function() {this.pool[i].kill();}, this);
        break;
      }
    }
  }

//   killMeteor () {
//   this.pool[i].kill();
// }


}
