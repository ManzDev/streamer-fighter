import Phaser from "phaser";
import { Constants } from "@/modules/constants.js";

const FRAMESIZE = (Constants.imageSize * Constants.scale) + 2;

const NUM_COLS = 7;
const NUM_ROWS = 4;

export class GridPlayer extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this.scene = scene;

    this.streamers = [];
    this.selectedStreamer = 0;

    this.createGrid();
    this.createStreamers();
    this.setActive(this.selectedStreamer);

    this.firstPlayer = this.scene.add.image(
      0,
      Constants.height,
      this.streamers[this.selectedStreamer].texture)
      .setDepth(0)
      .setScale(10)
      .setOrigin(0, 1);
  }

  createGrid() {
    const grid = this.scene.add.grid(50, 50, FRAMESIZE * NUM_COLS, ((FRAMESIZE * NUM_ROWS) + 42), FRAMESIZE, FRAMESIZE + 14, 0x333333, 0.25, 0xffffff, 1)
      .setOrigin(0)
      .setAlpha(0);

    this.sendToBack(grid);
  }

  createStreamers() {
    Constants.streamers.forEach((streamer, index) => {
      const image = this.scene.add.image(0, 0, streamer.toLowerCase())
        .setOrigin(0)
        .setDepth(10)
        .setAlpha(0.25)
        .setScale(Constants.scale);
      this.streamers.push(image);
    });

    Phaser.Actions.GridAlign(this.streamers, {
      width: NUM_COLS,
      height: NUM_ROWS,
      cellWidth: FRAMESIZE,
      cellHeight: FRAMESIZE + 14,
      x: 125,
      y: 100
    });
  }

  setActivePrev() {
    this.selectedStreamer = (this.selectedStreamer - 1);
    if (this.selectedStreamer < 0) this.selectedStreamer = this.streamers.length - 1;
    this.setActive(this.selectedStreamer);
  }

  setActiveNext() {
    this.selectedStreamer = (this.selectedStreamer + 1) % this.streamers.length;
    this.setActive(this.selectedStreamer);
  }

  setActive(number) {
    if (this.currentTween) {
      this.currentTween.stop();
      this.currentTween.complete();
    }
    const streamer = this.streamers[number];
    this.streamers.forEach(image => image.setAlpha(0.25));
    streamer.setAlpha(1);
    const startY = streamer.y;

    this.currentTween = this.scene.tweens.add({
      targets: streamer,
      y: streamer.y - 15,
      ease: "Power1",
      duration: 200,
      yoyo: true,
      repeat: Infinity,
      onComplete: () => (streamer.y = startY)
    });

    this.firstPlayer?.setTexture(Constants.streamers[number].toLowerCase());
  }
}
