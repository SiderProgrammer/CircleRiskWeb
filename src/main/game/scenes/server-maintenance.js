import { createBackground } from "../GUI-helper"

export default class ServerMaintenance extends Phaser.Scene {
  constructor() {
    super("serverMaintenance")
  }

  create() {
    createBackground(this, "black-bg")
    createBackground(this, "black-bg")

    this.add

      .text(
        this.game.GW / 2,
        this.game.GH / 2,
        "The game servers were down for maintenance.\n Everything will be back to normal soon.\n You may need to update your game, so check for update from time to time.",
        {
          font: `70px ${main_font}`,
          wordWrap: {
            width: this.game.GW * 0.8,
          },
          align: 'center', 
        }
      )
      .setOrigin(0.5)
  }
}
