import App from "../App";
import Environment from "./Environment";
import Floor from "./Elements/Floor";
import Fox from "./Elements/Fox";

export default class World {
    protected experience
    public scene
    public environment?: Environment
    public resources
    public floor?: Floor
    public fox?: Fox

    constructor(experience: App) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        //Wait for resources
        this.resources.on('ready', () => {
            // Elements
            this.floor = new Floor(this.experience)
            this.fox = new Fox(this.experience)

            // Environment
            this.environment = new Environment(this.experience)
        })
    }

    update() {
        if (this.fox)
            this.fox.update()
    }
}