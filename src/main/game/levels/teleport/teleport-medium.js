import Manager from "../../main/level-manager.js"
import TeleportFunctionsManager from "./functions"
import ConfusionFunctionsManager from "../confusion/functions"

export default class Teleport_Medium extends Phaser.Scene {
  constructor() {
    super("Teleport_Medium")
  }

  init(config) {
    this.level = config.level
    this.score_to_next_level = config.score_to_next_level

    this.manager = new Manager(this, config.config)
    this.manager.init()

    this.confusionFunctionsManager = new ConfusionFunctionsManager(this)

    this.fake_targets = []
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
    this.teleportFunctionsManager = new TeleportFunctionsManager(this);

  }
  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()
  }

  teleportCircle() {
   this.teleportFunctionsManager.teleportCircle()
  }

  handleFakeTargetsToCatch() {
    this.confusionFunctionsManager.handleFakeTargetsToCatch()
  }


  removeCorrectTargetTextureToCatch() {
    this.confusionFunctionsManager.removeCorrectTargetTextureToCatch()
  }
}
