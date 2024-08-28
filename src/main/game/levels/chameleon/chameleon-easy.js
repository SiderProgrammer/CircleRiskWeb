import Manager from "../../main/level-manager.js"
import ChameleonFunctionsManager from "./functions"

export default class Chameleon_Easy extends Phaser.Scene {
  constructor() {
    super("Chameleon_Easy")
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

    this.chameleonFunctionsManager = new ChameleonFunctionsManager(this)


    this.cockroach=  this.add.image(-100,Phaser.Math.Between(0,this.game.GH),"cockroach").setAlpha(0.8)

    this.time.addEvent({
      callback:()=>this.chameleonFunctionsManager.startMoveCockroach(),
      delay:4000,
    })
    

  }

  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()
  }
  removeTargetToCatchSkin() {
   this.chameleonFunctionsManager.removeTargetToCatchSkin()
  }
}
