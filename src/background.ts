import trianglify from "trianglify";

const seed = "" + (Math.random() + 0.03);
const canvasEl = document.querySelector("canvas.bcg") as HTMLCanvasElement;
function render() {
  const pattern = trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    seed: seed,
  });
  pattern.toCanvas(canvasEl);
}
window.addEventListener("resize", () => {
  render();
});
render();
