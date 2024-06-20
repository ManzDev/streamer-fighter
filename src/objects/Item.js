import Phaser from "phaser";
import { ITEMS } from "@/modules/constants.js";

const getRandomItem = () => ITEMS[Phaser.Math.Between(0, ITEMS.length - 1)];

export class Item extends Phaser.GameObjects.Image {
  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;

    this.setOrigin(0).setScale(2);
    this.scene.add.existing(this);

    const texture = getRandomItem();
    this.setTexture(texture);

    this.scene.time.addEvent({
      callback: () => this.remove(),
      delay: 5000
    });

    this.scene.physics.world.enable(this);
    const vx = (x < 0 ? 1 : -1) * Phaser.Math.Between(50, 200);
    const bounce = 0.5 + Math.min(Math.random(), 0.5);

    this.body
      .setCollideWorldBounds()
      .setVelocityX(vx)
      .setBounce(bounce);
  }

  remove() {
    const effectDuration = 500;
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: effectDuration
    });
    this.scene.time.addEvent({
      callback: () => this.destroy(),
      delay: effectDuration
    });
  }
}
