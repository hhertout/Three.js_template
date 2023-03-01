import Experience from "../../Experience";
import {Object3D, Scene} from "three";
import * as THREE from "three"

export default class Fox {
    public experience: Experience
    public scene: Scene
    public resources
    public resource
    public model: any
    public animation: any
    public time
    public debug
    public debugFolder

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.debug = this.experience.debug
        if (this.debug.ui && this.debug.active)
            this.debugFolder = this.debug.ui.addFolder('fox')

        this.resource = this.resources.items.foxModel

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.isCastingShadow()
    }

    isCastingShadow() {
        this.model.traverse((child: Object3D) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    setAnimation() {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name: any) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1, true)

            this.animation.actions.setCurrentTime = newAction
        }

        if (this.debug.active) {
            const debugObject = {
                playIdle: () => {
                    this.animation.play("idle")
                },
                playWalking: () => {
                    this.animation.play("walking")
                },
                playRunning: () => {
                    this.animation.play("running")
                },
            }
            this.debugFolder?.add(debugObject, 'playIdle')
            this.debugFolder?.add(debugObject, 'playWalking')
            this.debugFolder?.add(debugObject, 'playRunning')
        }
    }

    update() {
        // Delta time in ms and mixer in sec
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}