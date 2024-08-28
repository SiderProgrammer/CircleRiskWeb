import Manager from "../../main/level-manager.js"
import PulsateFunctionsManager from "./functions"

import BlindFunctionsManager from "../blind/functions"
import ThreeStepFunctionsManager from "../3-step/functions"

export default class Pulsate_Hard extends Phaser.Scene {
  constructor() {
    super("Pulsate_Hard")
  }

  init(config) {
    this.level = config.level
    this.score_to_next_level = config.score_to_next_level

    this.manager = new Manager(this, config.config)
    this.manager.init()
    this.pulsateFunctionsManager = new PulsateFunctionsManager(this)
    this.manager.rotation_direction = -1
    this.threeStepFunctionsManager= new ThreeStepFunctionsManager(this)
    
   
  }

  create() {
    this.manager.create()

    this.manager.createGUI()
    this.pulsateFunctionsManager.createComets()
    this.manager.createFirstTarget()
    this.manager.createTargets()
    this.manager.centerTargets()
    this.manager.target_array.reverse()
    this.manager.helper.checkNewTargetsQueue()
    //this.swapTargetToTheNearset()
    this.manager.setNewTarget()

   
    //this.manager.showTargets()
    this.manager.createStick()
    this.manager.createCircles()
    this.manager.bindInputEvents()

    this.manager.GUI_helper.sceneIntro(this)

    this.pulsateFunctionsManager.makeTargetsPulse()
   
    this.blindFunctionsManager = new BlindFunctionsManager(this)
    this.blind = this.manager.GUI_helper.createBackground(this, "black")
    this.blind.setDepth(1).setVisible(false)
  }
  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()
  }
 
  blindTheScreen() {
    this.blindFunctionsManager.blindTheScreen()
  }
  swapTargetToTheNearset() {
    this.threeStepFunctionsManager.swapTargetToTheNearset()
  }
}
