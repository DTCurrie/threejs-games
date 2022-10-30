import {Vector2} from 'three';
import {world} from '.';
import {gameFieldSize} from '../settings';

const movingEntities = world.archetype('position', 'nextDirection', 'currentDirection', 'lastPosition', 'segments');

export const movementSystem = () => {
	for (const {position, nextDirection, currentDirection, lastPosition, segments} of movingEntities) {
		const opposites = (currentDirection.x > 0 && nextDirection.x < 0)
			|| (currentDirection.x < 0 && nextDirection.x > 0)
			|| (currentDirection.y > 0 && nextDirection.y < 0)
			|| (currentDirection.y < 0 && nextDirection.y > 0);

		const next = opposites
			? new Vector2(position.x + currentDirection.x, position.y + currentDirection.y)
			: new Vector2(position.x + nextDirection.x, position.y + nextDirection.y);

		const current = opposites ? currentDirection : nextDirection;
		currentDirection.set(current.x, current.y);

		const last = new Vector2(position.x, position.y);
		lastPosition.set(last.x, last.y);
		position.set(next.x, next.y);

		if (position.x >= gameFieldSize.width) {
			position.x = 0;
		}

		if (position.x < 0) {
			position.x = gameFieldSize.width - 1;
		}

		if (position.y >= gameFieldSize.height) {
			position.y = 0;
		}

		if (position.y < 0) {
			position.y = gameFieldSize.height - 1;
		}

		if (segments.length) {
			const tail = segments.pop();
			tail.entity.position.set(last.x, last.y);
			segments.unshift(tail);
		}
	}
};
