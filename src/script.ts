import "./style.css"

import App from "./ThreeApp/App"


const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')

if (canvas) {
    new App(canvas)
}
