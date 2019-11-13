import {types} from "mobx-state-tree"

const Point = types.model({
  x: types.optional(types.number, 0.0),
  y: types.optional(types.number, 0.0)
});

const Entity = types.model({
  id: types.string,
  location: Point,
});

const Scene = types
  .model({
    entities: types.optional(types.array(Entity), [])
  })
  .actions(self => {
    function addEntity(id, x, y) {
      const entity = Entity.create({
        id: id,
        location: Point.create({x: x, y: y})
      });
      self.entities.push(entity);
    }

    function findEntity(id) {
      const found = self.entities.find((entity) => {
        return entity.id === id
      })
      return found;
    }

    return {addEntity, findEntity};
  });

const root = Scene.create({});