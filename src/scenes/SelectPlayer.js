import { BlockPlayerContainer } from "@/objects/BlockPlayerContainer.js";
import { WIDTH, HEIGHT, STREAMERS } from "@/modules/constants.js";
import Phaser from "phaser";

export class SelectPlayerScene extends Phaser.Scene {
  constructor() {
    super({
      key: "SelectPlayer",
      active: true
    });
  }

  preload() {
    STREAMERS.forEach(streamer => {
      const name = streamer.toLowerCase();
      this.load.image(name, `images/streamers/${name}.png`);
    });

    for (let i = 1; i < 92; i++) {
      this.load.image(`mosaic${i}`, `images/textures/mosaic/${i}.png`);
    }

    this.load.audio("beep", "sounds/fx/beep.mp3");
    this.load.audio("accepted", "sounds/fx/accepted.mp3");
    this.load.audio("ready", "sounds/fx/ready.mp3");
    this.load.audio("music.select", "music/select.ogg");
  }

  create() {
    const players = new BlockPlayerContainer(this);
    const beepSound = this.sound.add("beep");
    this.sound.add("music.select").setLoop(true).setVolume(0.1).play();

    this.input.keyboard.on("keydown-LEFT", event => {
      players.prev();
      beepSound.play();
      event.stopPropagation();
    });

    this.input.keyboard.on("keydown-RIGHT", event => {
      players.next();
      beepSound.play();
      event.stopPropagation();
    });

    this.input.keyboard.on("keydown-ENTER", event => {
      players.accept();
      event.stopPropagation();
    });

    const interlaced = this.add.graphics();
    interlaced.lineStyle(2, 0x000000, 0.025);
    for (let i = 0; i < HEIGHT; i = i + 6) {
      interlaced.lineBetween(0, i, WIDTH, i);
    }
  }

  update() {

  }
}
