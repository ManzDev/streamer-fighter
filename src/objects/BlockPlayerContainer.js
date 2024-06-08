import Phaser from "phaser";
import { STREAMERS } from "@/modules/constants.js";
import { titleFontStyle } from "@/objects/fontStyles.js";
import { BlockPlayer } from "@/objects/BlockPlayer.js";

/**
 * @extends Phaser.GameObjects.Container
 */
export class BlockPlayerContainer extends Phaser.GameObjects.Container {
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
    this.players = [new BlockPlayer(this.scene, 0), new BlockPlayer(this.scene, 1)];

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
    const streamer = this.players[this.currentPlayer];
    if (this.currentPlayer === 1) {
      this.currentTween.complete(5000);
      this.scene.sound.add("accepted").play();
      this.title.setText("Elige el jugador 2:");
      streamer.bg.setAlpha(0.5);
      streamer.echoImage.setAlpha(0.15);
      streamer.image.setAlpha(1);
      streamer.playerName.setAlpha(1);
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

  getPlayers() {
    return [this.players[0].playerName.text, this.players[1].playerName.text];
  }
}
