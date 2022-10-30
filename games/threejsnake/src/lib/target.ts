import type {RegisteredEntity} from 'miniplex';
import {Color, DoubleSide, MeshToonMaterial, TorusGeometry} from 'three';
import {world, type Entity} from './ecs';
import {meshComponent, positionComponent} from './ecs/components';
import {scene} from './scene';

export type Target = {
	entity: RegisteredEntity<Entity>;
	destroy: () => void;
};

export const target = (): Target => {
	const entity = world.createEntity({
		...positionComponent(),
		...meshComponent(
			new TorusGeometry(0.25, 0.125, 20, 20),
			new MeshToonMaterial({
				color: new Color(0.8, 0.8, 0),
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
