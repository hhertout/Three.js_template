import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import * as THREE from "three"
import Camera from "./Camera/Camera";
import Renderer from "./Renderer/Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import sources from "./Resources/sources"
import Debug from "./Utils/Debug";
import {Object3D} from "three";

export default class Experience {
    //Base
    public canvas
    public sizes
    public time
    public scene
    public camera
    public renderer
    public world
    public resources
    public debug

    constructor(canvas: HTMLCanvasElement) {
        // Setup
        this.canvas = canvas
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)

        //Camera
        this.camera = new Camera(this)

        // Renderer
        this.renderer = new Renderer(this)
        this.world = new World(this)

        // Prevent resize
        this.sizes.on('resize', this.resize.bind(this))
        // Tick function
        this.time.on("tick", this.update.bind(this))
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        //traverse the scene
        this.scene.traverse((child: Object3D) => {
            if(child instanceof THREE.Mesh){
                child.geometry.dispose()

                for(const key in child.material){
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function')
                        value.dispose()
                }
            }
        })

        this.camera.controls?.dispose()
        this.renderer.instance?.dispose()

        if(this.debug.ui && this.debug.active)
            this.debug.ui.destroy()
    }
}