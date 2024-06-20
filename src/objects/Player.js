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

    this.body.allowGravity = false;
    this.body.setSize(SCALE * 1.5, SCALE * 3);

    this.minX = this.x - 80;
    this.maxX = this.x + 80;

    this.setInteractive();

    this.on("pointerdown", function (pointer) {
      if (pointer.leftButtonDown()) { this.heal(); }
      if (pointer.rightButtonDown()) { this.damage(); }
    });
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

  damage() {
    console.log("Damage!");
    // this.effect = this.postFX.addBloom(0xffffff, 2, 2, 2, 1);
    // this.effect = this.postFX.addBarrel(1.1);
    // this.effect = this.postFX.addCircle(4, 0xfeedb6, 0xff0000, 0.6, 0.005);
    this.preFX.setPadding(32);
    const fx = this.preFX.addGlow(0xff0000, 4, 0, false, 0.1, 10);

    this.scene.tweens.add({
      targets: fx,
      outerStrength: 175,
      yoyo: true,
      loop: -1,
      ease: "power2"
    });

    // this.setTint(0xFF0000, 0xAA0000, 0xCC0000, 0xAA2222);
    // this.setAlpha(0.5);
  }

  shine() {
    this.postFX.addShine(1, 0.4, 8);

    this.add.tween({
      targets: this,
      duration: 4000,
      repeatDelay: 800,
      rotateY: 360,
      repeat: -1
    });
  }

  heal() {
    console.log("Heal!");
    this.effect = this.postFX.addBarrel(0.8);
  }

  clear() {
    // this.preFX.remove(this.effect);
    // this.clearTint();
    // this.setAlpha(1);
  }

  overlap(item) {
    this.damage();
  }
}
