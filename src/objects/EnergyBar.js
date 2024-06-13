import Phaser from "phaser";

const ENERGY_BAR_WIDTH = 275;

export class EnergyBar extends Phaser.GameObjects.Container {
  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.energy = 100;

    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.fillColor = 0x99e65f;
    this.setValue(100);
    this.add(this.bar);

    if (this.scene.textures.get("pixel-gradient").key === "__MISSING") {
      const ctx = scene.textures
        .createCanvas("pixel-gradient", ENERGY_BAR_WIDTH * (this.energy / 100), 28)
        .getContext();

      const gradient = ctx.createLinearGradient(x + 0, y + 0, ENERGY_BAR_WIDTH * (this.energy / 100), 150);

      gradient.addColorStop(0, "#0008");
      gradient.addColorStop(0.1, "#0008");
      gradient.addColorStop(0.5, "#0005");
      gradient.addColorStop(0.5, "#0005");
      gradient.addColorStop(0.6, "#0000");
      gradient.addColorStop(1, "#0000");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ENERGY_BAR_WIDTH * (this.energy / 100), 28);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, ENERGY_BAR_WIDTH * (this.energy / 100), 28);
      ctx.stroke();
    }

    scene.textures.get("pixel-gradient").refresh();

    const gradientTexture = new Phaser.GameObjects.Image(scene, 45, 45, "pixel-gradient")
      .setOrigin(0)
      .setDisplaySize(ENERGY_BAR_WIDTH * (this.energy / 100), 28);

    this.add(gradientTexture);
    this.gradient = gradientTexture;

    setTimeout(() => this.setValue(50), 2000);
  }

  setFlipX(value) {
    if (value) {
      this.gradient.setFlipX(true);
    }
  }

  setAlignRight(value) {
    if (value) {
      this.rightAlign = true;
    }
  }

  changeColor() {
    const c1 = Phaser.Display.Color.IntegerToColor(0x99e65f);
    const c2 = Phaser.Display.Color.IntegerToColor(0xfbbe0e);

    /*
    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 500,
      onUpdate: tween => {
        const value = tween.getValue();
        const { r, g, b } = Phaser.Display.Color.Interpolate.ColorWithColor(c1, c2, 100, value);
        this.bar.fillColor = Phaser.Display.Color.GetColor(r, g, b);
      }
    });
    */
    const { r, g, b } = Phaser.Display.Color.Interpolate.ColorWithColor(c1, c2, 100);
    this.bar.fillColor = Phaser.Display.Color.GetColor(r, g, b);
  }

  setValue(value) {
    if (value >= 0 && value <= 100) {
      this.scene.tweens.addCounter({
        from: ENERGY_BAR_WIDTH * (this.energy / 100),
        to: ENERGY_BAR_WIDTH * (value / 100),
        duration: 500,
        onUpdate: tween => {
          this.bar
            .clear()
            .fillStyle(this.bar.fillColor, 1)
            .fillRect(45, 45, tween.getValue(), 28);

          if (this.rightAlign) {
            this.bar.setX(this.gradient.width - tween.getValue());
          }
        },
        onComplete: () => {
          this.energy = value;
          this.changeColor();
        }
      });
    }
  }
}
