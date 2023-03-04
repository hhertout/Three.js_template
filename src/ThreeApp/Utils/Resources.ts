import EventEmitter from "./EventEmitter";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three"
import {CubeTexture, CubeTextureLoader, Texture, TextureLoader} from "three";

type LoaderType = {
    gltfLoader?: GLTFLoader
    textureLoader?: TextureLoader
    cubeTextureLoader?: CubeTextureLoader
}

export default class Resources extends EventEmitter {
    public sources
    public items: any
    public toLoad
    public loaded
    public loaders?: LoaderType

    constructor(sources: any) {
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading() {
        if (this.loaders) {
            for (const source of this.sources) {

                if (source.type === "gltfModel") {
                    this.loaders.gltfLoader?.load(source.path, (file) => {
                        this.sourceLoaded(source, file)
                    })
                } else if (source.type === "texture") {

                    this.loaders.textureLoader?.load(source.path, (file) => {
                        this.sourceLoaded(source, file)
                    })
                } else if (source.type === "cubeTexture") {
                    this.loaders.cubeTextureLoader?.load(source.path, (file) => {
                        this.sourceLoaded(source, file)
                    })
                }
            }
        } else {
            console.error("Loaders are not instantiated")
        }

    }

    sourceLoaded(source: any, file: GLTF | Texture | CubeTexture) {
        this.items[source.name] = file
        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }
}