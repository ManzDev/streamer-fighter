import { GridPlayer } from "@/objects/GridPlayer.js";
import { Constants } from "@/modules/constants.js";
import Phaser from "phaser";

const IMAGES_PATH = "images/streamers/";

export class SelectPlayerScene extends Phaser.Scene {
  constructor() {
    super({
      key: "SelectPlayer",
      active: true
    });
  }

  preload() {
    Constants.streamers.forEach(streamer => {
      const name = streamer.toLowerCase();
      this.load.image(name, `${IMAGES_PATH + name}.png`);
    });
  }

  create() {
    const gridPlayer = new GridPlayer(this);

    this.input.keyboard.on("keydown-LEFT", event => {
      gridPlayer.setActivePrev();
      event.stopPropagation();
    });

    this.input.keyboard.on("keydown-RIGHT", event => {
      gridPlayer.setActiveNext();
      event.stopPropagation();
    });
  }

  update() {

  }
}
