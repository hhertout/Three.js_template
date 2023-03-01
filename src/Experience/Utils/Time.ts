import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    public start = Date.now()
    public current = this.start
    public elapsed = 0
    public delta = 16

    constructor() {
        super();

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger("tick")

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}