import Phaser from "phaser";
import { SelectPlayerScene } from "./scenes/SelectPlayer.js";
import { WIDTH, HEIGHT, ZOOM } from "./modules/constants.js";
import WebFont from "webfontloader";

const config = {
  type: Phaser.WEBGL,
  parent: "container",
  width: WIDTH,
  height: HEIGHT,
  scale: {
    zoom: ZOOM
  },
  /* physics */
  pixelArt: true,
  backgroundColor: "#000000",
  scene: [SelectPlayerScene]
};

WebFont.load({
  custom: {
    families: ["EnterCommand"],
    urls: ["css/fonts.css"]
  },
  active: () => {
    // eslint-disable-next-line
    const game = new Phaser.Game(config);
  }
});
