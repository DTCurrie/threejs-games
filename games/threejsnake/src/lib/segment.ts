import type {RegisteredEntity} from 'miniplex';
import {Color, DoubleSide, MeshToonMaterial, SphereGeometry} from 'three';
import {world, type Entity} from './ecs';
import {meshComponent, positionComponent} from './ecs/components';
import {scene} from './scene';

export type Segment = {
	entity: RegisteredEntity<Entity>;
	destroy: () => void;
};

export const segment = (): Segment => {
	const entity = world.createEntity({
		...positionComponent(),
		...meshComponent(
			new SphereGeometry(0.5),
			new MeshToonMaterial({
				color: new Color(0, 0, 0.6),
				depthTest: true,
				depthWrite: true,
				side: DoubleSide,
			})),
	});

	const destroy = () => {
		world.destroyEntity(entity);
		scene.remove(entity.mesh);
	};

	return {
		entity,
		destroy,
	};
};
