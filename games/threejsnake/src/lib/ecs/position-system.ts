import {world} from '.';

const positionedEntities = world.archetype('position', 'mesh');

export const positionSystem = () => {
	for (const {position, mesh} of positionedEntities) {
		mesh.position.set(position.x + 0.5, position.y + 0.5, mesh.position.z);
	}
};
