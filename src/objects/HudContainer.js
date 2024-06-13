import Phaser from "phaser";
import { WIDTH } from "@/modules/constants.js";
import { HudPlayer } from "@/objects/HudPlayer.js";

export class HudContainer extends Phaser.GameObjects.Container {
  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    const rectangle = new Phaser.GameObjects.Rectangle(scene, x, y)
      .setSize(WIDTH, 100)
      .setFillStyle(0x000000, 0.25)
      .setOrigin(0);
    this.add(rectangle);

    this.players = [];
    const playerName1 = "afor_digital"; // this.scene.registry.get("player1");
    const playerName2 = "uxanarangel"; // this.scene.registry.get("player2");
    const player1 = new HudPlayer(scene, x, y, { playerNumber: 1, playerName: playerName1 });
    const player2 = new HudPlayer(scene, x + 175, y, { playerNumber: 2, playerName: playerName2 });
    this.players.push(player1, player2);
  }
}
