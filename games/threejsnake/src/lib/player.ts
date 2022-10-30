import {emitter} from 'emitter/emitter';
import type {RegisteredEntity} from 'miniplex';
import {Color, DoubleSide, MeshToonMaterial, SphereGeometry, Vector2} from 'three';
import {world, type Entity} from './ecs';
import {directionComponent, meshComponent, positionComponent, segmentsComponent} from './ecs/components';
import {scene} from './scene';

export const onMove = emitter<{input: Vector2}>();
export const onSpace = emitter();

function keyboardInput(event: KeyboardEvent) {
	switch (event.key) {
		// Up
		case 'ArrowUp':
		case 'w':
			onMove.emit({input: new Vector2(0, 1)});
			break;
		// Down
		case 'ArrowDown':
		case 's':
			onMove.emit({input: new Vector2(0, -1)});
			break;
		// Left
		case 'ArrowLeft':
		case 'a':
			onMove.emit({input: new Vector2(-1, 0)});
			break;
		// Right
		case 'ArrowRight':
		case 'd':
			onMove.emit({input: new Vector2(1, 0)});
			break;
		// Space
		case ' ':
			onSpace.emit({});
			break;
		default:
			break;
	}
}

function emitInput(input: 'up' | 'down' | 'left' | 'right' | 'space') {
	switch (input) {
		case 'up':
			onMove.emit({input: new Vector2(0, 1)});
			break;
		case 'down':
			onMove.emit({input: new Vector2(0, -1)});
			break;
		case 'left':
			onMove.emit({input: new Vector2(-1, 0)});
			break;
		case 'right':
			onMove.emit({input: new Vector2(1, 0)});
			break;
		case 'space':
			onSpace.emit({});
			break;
		default:
			break;
	}
}

export type Player = {
	entity: RegisteredEntity<Entity>;
	destroy: () => void;
};

export const player = (): Player => {
	const entity = world.createEntity({
		...positionComponent(),
		...meshComponent(
			new SphereGeometry(0.5),
			new MeshToonMaterial({
				color: new Color(0, 0, 0.8),
				depthTest: true,
				depthWrite: true,
				side: DoubleSide,
			})),
		...directionComponent(),
		...segmentsComponent(),
	});

	const move = ({input: {x, y}}) => {
		entity.nextDirection.set(x, y);
	};

	const destroy = () => {
		document.removeEventListener('keydown', keyboardInput);
		for (const segment of entity.segments) {
			segment.destroy();
			scene.remove(segment.entity.mesh);
		}

		world.destroyEntity(entity);
		scene.remove(entity.mesh);
		onMove.off(move);
	};

	document.addEventListener('keydown', keyboardInput);
	onMove.on(move);

	return {
		entity,
		destroy,
	};
};
