class Explode {
  constructor(x, y) {
    this.explode = Nakama.game.add.sprite(x, y, 'kaboom');
    Nakama.game.physics.arcade.enable(this.explode);
    this.explode.anchor = new Phaser.Point(0.5, 0.5);
    this.explode.scale.set(0.75);
    this.explode.animations.add('explode');
    this.explode.play('explode', 20, false, true);
  }

  update() {}
}
