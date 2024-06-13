import Phaser from "phaser";

export class Item extends Phaser.GameObjects.Image {
  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;

    this.setOrigin(0).setScale(2);
    this.scene.add.existing(this);

    this.scene.physics.world.enable(this);

    const vx = (x < 0 ? 1 : -1) * Phaser.Math.Between(50, 200);
    const bounce = 0.5 + Math.min(Math.random(), 0.5);

    this.body
      .setCollideWorldBounds()
      .setVelocityX(vx)
      .setBounce(bounce);
  }
}
