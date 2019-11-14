import React from "react";
import {values} from "mobx";
import {observer} from "mobx-react";

export const PointView = observer(props => (
  <React.Fragment>
    <span>({props.point.x}, {props.point.y})</span>
  </React.Fragment>
));

export const EntityView = observer(props => (
  <tr>
    <td>{props.entity.id}</td>
    <td>
      <PointView point={props.entity.location}/>
    </td>
  </tr>
));

export const FrameView = props => (
  <table width="100%">
    <tr>
      <th>Left</th>
      <th>Top</th>
      <th>Right</th>
      <th>Bottom</th>
    </tr>
    <tr>
      <td>{props.frame.left}</td>
      <td>{props.frame.top}</td>
      <td>{props.frame.right}</td>
      <td>{props.frame.bottom}</td>
    </tr>
  </table>
);

export const SceneTable = observer(props => (
  <div>
    <div>Entity count: {props.scene.entitiesCount}</div>
    <FrameView frame={props.scene.frame}/>
    <table width="100%">
      <tr>
        <th>Id</th>
        <th>Location</th>
      </tr>
      {values(props.scene.entities).map(entity => (
        <EntityView entity={entity}/>
      ))}
    </table>
  </div>
));

class ScenePainter {
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

export class SceneCanvas extends React.Component {
  componentDidMount() {
    new ScenePainter(this.refs.canvas, this.props.scene).paint();
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={800} height={800}/>
      </div>
    )
  }
}
