import Phaser from "phaser";
import { SCALE } from "@/modules/constants.js";

export class Player extends Phaser.GameObjects.Image {
  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;

    this.setOrigin(0, 1)
      .setScale(SCALE * 4);

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setCollideWorldBounds();

    this.minX = this.x - 60;
    this.maxX = this.x + 60;
  }

  moveLeft() {
    if (this.x < this.minX) return;

    this.scene.tweens.add({
      targets: this,
      x: this.x - 20,
      duration: 250
    });
  }

  moveRight() {
    if (this.x > this.minX) return;

    this.scene.tweens.add({
      targets: this,
      x: this.x + 20,
      duration: 250
    });
  }

  overlap(item) {
    // console.log("El item", item, ` ha colisionado con ${this.texture.key}`);
    this.setTintFill(0x423383, 0x184148, 0x143345, 0x133834);
  }
}
