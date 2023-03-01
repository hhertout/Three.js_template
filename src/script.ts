import "./style.css"

import Experience from "./Experience/Experience"


const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')

if (canvas) {
    new Experience(canvas)
}
