export class ScenePainter {
  constructor(canvas, scene) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.scene = scene;
  }

  paintBackground() {
    this.ctx.save();
    this.ctx.fillStyle = "#bbb";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  paintSceneFrame() {
    const frame = this.scene.frame;
    this.ctx.save();
    this.ctx.strokeStyle = "#888";
    this.ctx.strokeRect(frame.left, frame.top, frame.right - frame.left, frame.bottom - frame.top);
    this.ctx.restore();
  }

  paintEntities() {
    this.scene.entities.forEach(
      entity => {
        const p = entity.location;
        this.ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1)
      }
    );
  }

  paint() {
    this.ctx.save();
    this.paintBackground();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
    this.ctx.scale(10, 10);
    this.paintSceneFrame();
    this.paintEntities();
    this.ctx.restore();
  }
}
