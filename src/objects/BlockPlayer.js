import Phaser from "phaser";
import { WIDTH, HEIGHT, STREAMERS } from "@/modules/constants.js";
import { baseFontStyle, titleFontStyle } from "@/objects/fontStyles.js";

/**
 * @extends Phaser.GameObjects.Container
 */
export class BlockPlayer extends Phaser.GameObjects.Container {
  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    super(scene);
    this.scene = scene;

    this.players = [];
    this.selectedStreamer = 0;

    this.title = this.scene.add.text(0, 25, "Elige el jugador 1:", titleFontStyle).setDepth(5);

    const initialName = this.getCurrentStreamer().texture;

    this.players = [
      {
        bg: this.scene.add.tileSprite(0, 0, WIDTH / 2, HEIGHT, "mosaic1").setAlpha(0.5).setDepth(0).setOrigin(0),
        echoImage: this.scene.add.image(WIDTH / 12, HEIGHT, initialName).setDepth(0).setScale(18).setAlpha(0.15).setOrigin(0, 1),
        image: this.scene.add.image(WIDTH / 8, HEIGHT, initialName).setDepth(2).setScale(12).setOrigin(0, 1),
        playerName: this.scene.add.text(0, 50, STREAMERS[this.selectedStreamer], baseFontStyle).setDepth(5)
      },
      {
        bg: this.scene.add.tileSprite(WIDTH / 2, 0, WIDTH / 2, HEIGHT, "mosaic2").setAlpha(0).setDepth(0).setOrigin(0),
        echoImage: this.scene.add.image((WIDTH / 2) + WIDTH / 26, HEIGHT, initialName).setDepth(1).setScale(18).setAlpha(0).setOrigin(0, 1).setFlipX(true),
        image: this.scene.add.image((WIDTH / 2) + WIDTH / 8, HEIGHT, initialName).setDepth(2).setScale(12).setOrigin(0, 1).setAlpha(0).setFlipX(true),
        playerName: this.scene.add.text(0, 125, STREAMERS[this.selectedStreamer], baseFontStyle).setDepth(5).setAlpha(0)
      },
    ];

    this.players[0].bgTween = this.scene.tweens.add({
      targets: this.players[0].bg,
      tilePositionY: 64,
      tilePositionX: -64,
      ease: "Linear",
      duration: 1800,
      repeat: Infinity
    });

    this.players[1].bgTween = this.scene.tweens.add({
      targets: this.players[1].bg,
      tilePositionY: 64,
      tilePositionX: 64,
      ease: "Linear",
      duration: 1800,
      repeat: Infinity
    });

    this.currentPlayer = 0;
    this.setActive(this.selectedStreamer);
  }

  getCurrentStreamer() {
    return STREAMERS[this.selectedStreamer];
  }

  prev() {
    this.selectedStreamer = (this.selectedStreamer - 1);
    if (this.selectedStreamer < 0) this.selectedStreamer = STREAMERS.length - 1;
    this.setActive(this.selectedStreamer);
  }

  next() {
    this.selectedStreamer = (this.selectedStreamer + 1) % STREAMERS.length;
    this.setActive(this.selectedStreamer);
  }

  setActive(number) {
    const streamer = this.players[this.currentPlayer];
    if (this.currentTween) {
      this.currentTween.complete();
    }
    const startY = streamer.image.y;

    this.currentTween = this.scene.tweens.add({
      targets: streamer.image,
      y: streamer.image.y + 15,
      ease: "Power1",
      duration: 200,
      yoyo: true,
      repeat: Infinity,
      onComplete: () => {
        streamer.image.y = startY;
      }
    });

    streamer.image?.setTexture(STREAMERS[number].toLowerCase());
    streamer.echoImage?.setTexture(STREAMERS[number].toLowerCase());
    streamer.bg?.setTexture(`mosaic${1 + ~~(Math.random() * 90)}`);
    streamer.playerName?.setText(STREAMERS[number]);
  }

  accept() {
    this.currentPlayer++;
    if (this.currentPlayer === 1) {
      this.currentTween.complete(5000);
      this.scene.sound.add("accepted").play();
      this.title.setText("Elige el jugador 2:");
      this.players[this.currentPlayer].bg.setAlpha(0.5);
      this.players[this.currentPlayer].echoImage.setAlpha(0.15);
      this.players[this.currentPlayer].image.setAlpha(1);
      this.players[this.currentPlayer].playerName.setAlpha(1);
      this.title.setY(105);

      this.selectedStreamer = 0;
      this.setActive(this.selectedStreamer);
    } else if (this.currentPlayer === 2) {
      this.currentTween.complete();
      this.scene.sound.add("ready").play();
      this.players.forEach(player => player.bgTween.stop());
      this.title.setText("vs").setY(100);
    }
  }
}
