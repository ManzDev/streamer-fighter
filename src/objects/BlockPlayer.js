import Phaser from "phaser";
import { WIDTH, HEIGHT, STREAMERS } from "@/modules/constants.js";
import { baseFontStyle } from "@/objects/fontStyles.js";

/**
 * @extends Phaser.GameObjects.Group
 */
export class BlockPlayer extends Phaser.GameObjects.Group {
  constructor(scene, numberPlayer) {
    super(scene);
    this.scene = scene;

    const initialName = STREAMERS[0];
    const initialTexture = `mosaic${Phaser.Math.Between(1, 91)}`;

    this.bg = this.scene.add
      .tileSprite(0, 0, WIDTH / 2, HEIGHT, initialTexture)
      .setAlpha(0.5)
      .setDepth(0)
      .setOrigin(0)
      .setTileScale(2);

    this.echoImage = this.scene.add
      .image(WIDTH / 12, HEIGHT, initialName.toLowerCase())
      .setDepth(0)
      .setScale(18)
      .setAlpha(0.15)
      .setOrigin(0, 1);

    this.image = this.scene.add
      .image(WIDTH / 8, HEIGHT, initialName.toLowerCase())
      .setDepth(2)
      .setScale(12)
      .setOrigin(0, 1);

    this.playerName = this.scene.add
      .text(0, 50, initialName, baseFontStyle)
      .setDepth(5);

    if (numberPlayer === 1) {
      this.bg.setAlpha(0).setX(WIDTH / 2);
      this.echoImage.setAlpha(0).setFlipX(true).setX((WIDTH / 2) + WIDTH / 26);
      this.image.setAlpha(0).setFlipX(true).setX((WIDTH / 2) + WIDTH / 8);
      this.playerName.setAlpha(0).setY(125);
    }
  }
}
