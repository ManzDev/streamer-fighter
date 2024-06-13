import Phaser from "phaser";
import { WIDTH, HEIGHT, SCALE, STREAMERS } from "@/modules/constants.js";
import { HudContainer } from "@/objects/HudContainer.js";

const BACKGROUNDS_PATH = "images/backgrounds";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
      active: false
    });
  }

  preload() {
    console.log("preload game");
    this.load.image("bgroom", `${BACKGROUNDS_PATH}/office.png`);

    STREAMERS.forEach(streamer => {
      const name = streamer.toLowerCase();
      this.load.image(`${name}-head`, `images/streamers/${name}-head.png`);
    });
  }

  create() {
    this.playerName1 = "afor_digital"; // this.registry.get("player1");
    this.playerName2 = "uxanarangel"; // this.registry.get("player2");
    this.bgRoom = this.add.image(WIDTH / 2, HEIGHT / 2, "bgroom")
      .setOrigin(0.5)
      .setScale(3);

    this.bgRoom.preFX.addBlur(2, 1, 1, 1, 0xffffff, 8);

    this.player1 = this.add.image(WIDTH / 4, HEIGHT, this.playerName1)
      .setOrigin(0, 1)
      .setScale(SCALE * 3);

    this.player2 = this.add.image((WIDTH / 4) * 2, HEIGHT, this.playerName2)
      .setOrigin(0, 1)
      .setFlipX(true)
      .setScale(SCALE * 3);

    const hud = new HudContainer(this, 0, 0);
  }

  update() {
    // console.log("update game");
  }
}
