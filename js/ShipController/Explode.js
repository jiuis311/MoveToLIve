class Explode {
  constructor(x, y, spriteName) {
    this.sprite = Nakama.game.add.sprite(x, y, spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    setTimeout(function() {Nakama.explodePlayer.sprite.kill();}, 200);
  }

  update() {}
}
