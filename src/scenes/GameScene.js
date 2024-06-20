import Phaser from "phaser";
import { WIDTH, HEIGHT, ITEMS, STREAMERS } from "@/modules/constants.js";
import { HudContainer } from "@/objects/HudContainer.js";
import { Player } from "@/objects/Player.js";
import { Item } from "@/objects/Item.js";
import { TwitchClient } from "@/objects/TwitchClient.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
      active: false
    });

    this.client = new TwitchClient();
    this.items = [];
  }

  preload() {
    this.load.image("bgroom", "images/backgrounds/office.png");
    this.load.image("time-widget", "images/ui/time-widget.png");

    ITEMS.forEach(item => {
      const name = item.toLowerCase();
      this.load.image(`${name}`, `images/items/${name}.png`);
    });

    STREAMERS.forEach(streamer => {
      const name = streamer.toLowerCase();
      this.load.image(`${name}-head`, `images/streamers/${name}-head.png`);
    });
  }

  create() {
    this.registry.set("player1", STREAMERS[Phaser.Math.Between(0, STREAMERS.length - 1)].toLowerCase());
    this.registry.set("player2", STREAMERS[Phaser.Math.Between(0, STREAMERS.length - 1)].toLowerCase());

    this.playerName1 = this.registry.get("player1");
    this.playerName2 = this.registry.get("player2");

    this.bgRoom = this.add.image(WIDTH / 2, HEIGHT / 2, "bgroom")
      .setOrigin(0.5)
      .setScale(3);

    this.bgRoom.preFX.addBlur(2, 1, 1, 1, 0xffffff, 4);

    this.player1 = new Player(this, WIDTH / 8, HEIGHT, this.playerName1);
    this.player2 = new Player(this, (WIDTH / 4) * 2, HEIGHT, this.playerName2).setFlipX(true);

    this.hud = new HudContainer(this, 0, 0);
    this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);

    this.scene.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const r = Phaser.Math.Between(1, 10);
        r === 1 && this.player1.moveLeft();
        r === 2 && this.player1.moveRight();
        r === 3 && this.player2.moveLeft();
        r === 4 && this.player2.moveRight();
      }
    });

    this.client.on("animate", (username) => {
      const x = [-150, WIDTH + 150][Phaser.Math.Between(0, 1)];
      const y = Phaser.Math.Between(110, 250);
      this.items.push(new Item(this, x, y));
    });
  }

  update() {
    this.physics.world.overlap([this.player1, this.player2], this.items, (player, item) => {
      player.overlap(item);
    });

    const isTouchPlayer1 = this.player1.body.touching.none === false;
    !isTouchPlayer1 && this.player1.clear();

    const isTouchPlayer2 = this.player2.body.touching.none === false;
    !isTouchPlayer2 && this.player2.clear();
  }
}
