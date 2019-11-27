import {types, flow} from 'mobx-state-tree'
import {Entities} from './service';

export const Point = types.model({
  x: types.optional(types.number, 0.0),
  y: types.optional(types.number, 0.0)
});

export const Entity = types.model({
  id: types.string,
  location: Point
});

export const Scene = types
  .model({
    entities: types.optional(types.array(Entity), [])
  }).views(self => ({
    get entitiesCount() {
      return self.entities.length;
    },
    get frame() {
      if (self.entities.length === 0) {
        return {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        };
      } else {
        const allX = self.entities.map(entity => entity.location.x);
        const allY = self.entities.map(entity => entity.location.y);
        return {
          left: Math.min(...allX),
          right: Math.max(...allX),
          top: Math.max(...allY),
          bottom: Math.min(...allY)
        };
      }
    }
  })).actions(self => {
    const fetchEntities = flow(function* fetchEntities() {
      const result = yield new Entities().get();
      //self.setEntities(result.entities);
      self.entities = result.entities;
      console.log('fetch', result);
    });
    function addEntity(id, x, y) {
      const entity = Entity.create({
        id: id,
        location: Point.create({ x: x, y: y })
      });
      self.entities.push(entity);
    }
    function findEntity(id) {
      const found = self.entities.find(entity => {
        return entity.id === id;
      });
      return found;
    }
    function setEntities(newEntities) {
      self.entities = newEntities;
    }
    return { addEntity, findEntity, fetchEntities, setEntities };
  });

