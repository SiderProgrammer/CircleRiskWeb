import Manager from "../../main/level-manager.js"
import SpeedFunctionsManager from "./functions.js"

export default class Speed_Easy extends Phaser.Scene {
  constructor() {
    super("Speed_Easy")
  }

  init(config) {
    this.level = config.level
    this.score_to_next_level = config.score_to_next_level

    this.manager = new Manager(this, config.config)
    this.speedFunctionsManager = new SpeedFunctionsManager(this)
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
    
    this.lightning = this.add.image(this.game.GW/2,this.game.GH/2,"light").setAlpha(0)
  
    
    this.time.addEvent({
      delay:2000,
      callback:()=>this.speedFunctionsManager.showLightning(),
    })
  }
  
  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()
  }
}
