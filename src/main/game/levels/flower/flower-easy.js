import Manager from "../../main/level-manager.js"
import FlowerFunctionsManager from "./functions"

export default class Flower_Easy extends Phaser.Scene {
  constructor() {
    super("Flower_Easy")
  }

  init(config) {
    this.level = config.level
    this.score_to_next_level = config.score_to_next_level

    this.manager = new Manager(this, config.config)
    this.manager.init()
    this.flowersFunctionsManager = new FlowerFunctionsManager(this)
  }

  create() {
    this.manager.create()

    this.manager.createGUI()

    this.manager.createFirstTarget()
    this.manager.createTargets()
    this.manager.setNewTarget()

    this.manager.centerTargets()
    this.manager.showTargets()
    this.manager.createStick()
    this.manager.createCircles()
    this.manager.bindInputEvents()

    this.manager.GUI_helper.sceneIntro(this)

    this.flowers = [
      this.flowersFunctionsManager.createFlower("flower_1"),
      this.flowersFunctionsManager.createFlower("flower_2"),
      this.flowersFunctionsManager.createFlower("flower_3"),
      this.flowersFunctionsManager.createFlower("flower_1"),
      this.flowersFunctionsManager.createFlower("flower_2"),
      this.flowersFunctionsManager.createFlower("flower_3"),
    ]
    this.flowersFunctionsManager.flowersEffect()
  }
 
  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()
  }
}
