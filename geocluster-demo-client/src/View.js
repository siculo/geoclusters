import React, { useEffect } from 'react';
import {values} from "mobx";
import {observer} from "mobx-react";
import {ScenePainter} from "./ScenePainter";

export const PointView = observer(props => (
  <>
    <span>({props.point.x}, {props.point.y})</span>
  </>
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
    <thead>
    <tr>
      <th>Left</th>
      <th>Top</th>
      <th>Right</th>
      <th>Bottom</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>{props.frame.left}</td>
      <td>{props.frame.top}</td>
      <td>{props.frame.right}</td>
      <td>{props.frame.bottom}</td>
    </tr>
    </tbody>
  </table>
);

export const SceneTable = observer(props => {
  return (
    <div>
      <div>Entity count: {props.scene.entitiesCount}</div>
      <FrameView frame={props.scene.frame}/>
      <table width="100%">
        <thead>
        <tr>
          <th>Id</th>
          <th>Location</th>
        </tr>
        </thead>
        <tbody>
        {values(props.scene.entities).map(entity => (
          <EntityView entity={entity} key={entity.id}/>
        ))}
        </tbody>
      </table>
    </div>
  )
});

export const SceneCanvas = observer(props => {
  const ref = React.createRef();
  useEffect(
    () => {
      new ScenePainter(ref.current, props.scene).paint();
    },
    [props.scene.entitiesCount]
    );
  return (
    <>
      <canvas ref={ref} width={800} height={800}/>
    </>
  );
});

export const MainContent = props => {
  return (
  <table width="100%">
    <tbody>
    <tr>
      <td width="25%">
        <SceneTable scene={props.store}/>
      </td>
      <td width="75%">
        <SceneCanvas scene={props.store}/>
      </td>
    </tr>
    </tbody>
  </table>
);}
