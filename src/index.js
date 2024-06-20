import Phaser from "phaser";
import { WIDTH, HEIGHT, ZOOM } from "./modules/constants.js";
import WebFont from "webfontloader";
import SceneWatcherPlugin from "phaser-plugin-scene-watcher";

// Scenes
import { SelectPlayerScene } from "./scenes/SelectPlayer.js";
import { GameScene } from "./scenes/GameScene.js";

const config = {
  type: Phaser.WEBGL,
  parent: "container",
  width: WIDTH,
  height: HEIGHT,
  scale: {
    zoom: ZOOM
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: 400
      }
    }
  },

  pixelArt: true,
  backgroundColor: "#000000",
  scene: [SelectPlayerScene, GameScene],
  plugins: {
    global: [
      { key: "SceneWatcher", plugin: SceneWatcherPlugin, start: false }
    ]
  }
};

WebFont.load({
  custom: {
    families: ["EnterCommand", "Pixellari"],
  },
  active: () => {
    // eslint-disable-next-line
    const game = new Phaser.Game(config);
  }
});
