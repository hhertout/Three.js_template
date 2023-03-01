import Experience from "../Experience";
import * as THREE from "three"
import {WebGLRenderer} from "three";

export default class Renderer {
    public experience
    public canvas
    public sizes
    public scene
    public camera
    public instance?: WebGLRenderer

    constructor(experience: Experience) {
        this.experience = experience
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        // @ts-ignore
        this.instance.useLegacyLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    resize() {
        if (this.instance) {
            this.instance.setSize(this.sizes.width, this.sizes.height)
            this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        } else {
            console.error("renderer is not instantiated")
        }

    }

    update() {
        if (this.instance && this.camera.instance) {
            this.instance.render(this.scene, this.camera.instance)
        } else {
            console.error("renderer or camera are not instantiated")
        }

    }
}