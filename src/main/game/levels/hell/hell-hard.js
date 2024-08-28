import Manager from "../../main/level-manager.js"
import HellFunctionsManager from "./functions"
import TinyFunctionsManager from "../tiny/functions"
import UnstableFunctionsManager from "../unstable/functions"

export default class Hell_Hard extends Phaser.Scene {
  constructor() {
    super("Hell_Hard")
  }

  init(config) {
    this.level = config.level
    this.score_to_next_level = config.score_to_next_level

    this.manager = new Manager(this, config.config)
    this.manager.init()
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

    this.hellFunctionsManager = new HellFunctionsManager(this)
    this.hellFunctionsManager.createBlame()
    this.tinyFunctionsManager = new TinyFunctionsManager(this)
    this.tinyFunctionsManager.resizeTargets()
    this.unstableFunctionsManager = new UnstableFunctionsManager(this)
  }
  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()
  }

  hideTargets() {
    this.hellFunctionsManager.hideTargets()
  }

  changeRotationSpeed() {
    this.unstableFunctionsManager.changeRotationSpeed()
  }
}
