import Experience from "../Experience";
import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {PerspectiveCamera} from "three";

export default class Camera {
    public experience
    public sizes
    public scene
    public canvas
    public instance?: PerspectiveCamera
    public controls?: OrbitControls

    constructor(experience: Experience) {
        this.experience = experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100)

        this.instance.position.set(3, 3, 10)
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        if (this.instance) {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
        } else {
            console.error("Camera is not instantiated")
        }
    }

    resize() {
        if (this.instance) {
            this.instance.aspect = this.sizes.width / this.sizes.height
            this.instance.updateProjectionMatrix()
        } else {
            console.error("Camera is not instantiated")
        }
    }

    update() {
        if (this.controls) {
            this.controls.update()
        } else {
            console.error("Orbit controls is not set")
        }
    }

    getInstance() {
        return this.instance
    }
}