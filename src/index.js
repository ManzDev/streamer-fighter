import Phaser from "phaser";
import { SelectPlayerScene } from "./scenes/SelectPlayer.js";
import { Constants } from "./modules/constants.js";

const config = {
  type: Phaser.WEBGL,
  parent: "container",
  width: Constants.width,
  height: Constants.height,
  scale: {
    zoom: Constants.zoom
  },
  /* physics */
  pixelArt: true,
  backgroundColor: "#000000",
  scene: [SelectPlayerScene]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
