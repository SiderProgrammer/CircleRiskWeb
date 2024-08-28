import Manager from "../../main/level-manager.js"

import LevelsFunctionsExtender from "../../main/level-functions-extender"
import ExpandFunctionsManager from "./functions"
import TinyFunctionsManager from "../tiny/functions"

export default class Expand_Medium extends Phaser.Scene {
  constructor() {
    super("Expand_Medium")
  }

  init(config) {
    this.level = config.level
    this.score_to_next_level = config.score_to_next_level

    this.levelsFunctionsExtender = new LevelsFunctionsExtender(this)
    this.manager = new Manager(this, config.config)
    this.manager.init()

    this.fly_value = 1
    this.circle_rotate_angle = 0
    this.center_to_circle_distance = 0 // needed to circle set
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

    this.tinyFunctionsManager = new TinyFunctionsManager(this)
    this.tinyFunctionsManager.resizeTargets()

    const pos = this.manager.helper.calculateMinMaxTargetsPos()
    this.distance = (pos.x - pos.minX) / 2

    this.center_to_circle_distance = this.distance

    this.expandFunctionsManager = new ExpandFunctionsManager(this)
    this.expandFunctionsManager.createFlyingPentagons()
  }
  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()

    this.expandFunctionsManager.moveTargets()
    this.levelsFunctionsExtender.moveCircle()

    this.manager.helper.extendStick()
    this.manager.helper.centerStick()

    this.expandFunctionsManager.calculateTargetsFlyDirection()

    this.distance += this.fly_value
    this.center_to_circle_distance += this.fly_value
  }
  calculateCirclesPosition() {
    this.expandFunctionsManager.calculateCirclesPosition()
  }
}
