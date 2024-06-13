import Phaser from "phaser";
import { WIDTH, SCALE } from "@/modules/constants.js";
import { baseHudStyle } from "@/objects/fontStyles.js";
import { EnergyBar } from "@/objects/EnergyBar.js";

const TOP_PADDING = 10;

export class HudPlayer extends Phaser.GameObjects.Container {
  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene, x, y, options) {
    super(scene, x, y);
    scene.add.existing(this);

    const { playerName, playerNumber } = options;

    const headImage = new Phaser.GameObjects.Image(scene, x + 5, y + TOP_PADDING, `${playerName}-head`)
      .setOrigin(0)
      .setScale(SCALE);

    const playerText = new Phaser.GameObjects.Text(scene, x + 90, y + TOP_PADDING, `${playerName}`, baseHudStyle);

    const energyBar = new EnergyBar(scene, x + 45, y + 0);
    this.add([headImage, playerText, energyBar]);

    this.scene.tweens.chain({
      targets: headImage,
      repeat: Infinity,
      tweens: [
        { y: headImage.y, ease: "Stepped" },
        { y: headImage.y + 5, ease: "Stepped" }
      ]
    });

    if (playerNumber === 2) {
      headImage.setX(550).setFlipX(true);
      playerText.setStyle({ ...baseHudStyle, fixedWidth: 275, align: "right" });
      energyBar.setFlipX(true);
    }
  }
}
