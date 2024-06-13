import Phaser from "phaser";
import { WIDTH } from "@/modules/constants.js";

window.Phaser = Phaser;

const ENERGY_BAR_WIDTH = 275;

export class EnergyBar extends Phaser.GameObjects.Container {
  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    const bar = new Phaser.GameObjects.Graphics(scene)
      .fillStyle(0x99e65f, 1)
      .fillRect(x, y + 45, ENERGY_BAR_WIDTH, 28)
      .lineStyle(4, 0xffffff, 1)
      .strokeRect(x, y + 45, ENERGY_BAR_WIDTH, 28);

    this.add(bar);

    if (this.scene.textures.get("pixel-gradient").key === "__MISSING") {
      const ctx = scene.textures
        .createCanvas("pixel-gradient", ENERGY_BAR_WIDTH, 28)
        .getContext();

      const gradient = ctx.createLinearGradient(x + 0, y + 0, ENERGY_BAR_WIDTH, 150);

      gradient.addColorStop(0, "#0008");
      gradient.addColorStop(0.1, "#0008");
      gradient.addColorStop(0.5, "#0005");
      gradient.addColorStop(0.5, "#0005");
      gradient.addColorStop(0.6, "#0000");
      gradient.addColorStop(1, "#0000");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ENERGY_BAR_WIDTH, 28);
    }

    scene.textures.get("pixel-gradient").refresh();

    const gradientTexture = new Phaser.GameObjects.Image(scene, 45, 45, "pixel-gradient")
      .setOrigin(0)
      .setDisplaySize(ENERGY_BAR_WIDTH, 28);

    this.add(gradientTexture);

    const c1 = Phaser.Display.Color.IntegerToColor(0x99e65f);
    const c2 = Phaser.Display.Color.IntegerToColor(0xfbbe0e);

    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 1000,
      onUpdate: tween => {
        const value = tween.getValue();
        const { r, g, b } = Phaser.Display.Color.Interpolate.ColorWithColor(c1, c2, 100, value);
        bar.fillColor = Phaser.Display.Color.GetColor(r, g, b);
        bar
          .clear()
          .fillStyle(bar.fillColor, 1)
          .fillRect(45, 45, ENERGY_BAR_WIDTH, 28)
          .lineStyle(4, 0xffffff, 1)
          .strokeRect(45, 45, ENERGY_BAR_WIDTH, 28);
      },
      onComplete: () => console.log("Completado")
    });

    this.bar = bar;
    this.gradient = gradientTexture;
  }

  setFlipX(value) {
    if (value) {
      this.gradient.setFlipX(true);
    }
  }
}
