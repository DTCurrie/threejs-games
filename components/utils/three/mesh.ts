import type {Mesh} from 'three';
import {Vector3} from 'three';

export const getBoundingBoxCenter = (mesh: Mesh) => {
	const {geometry} = mesh;
	geometry.computeBoundingBox();

	const center = new Vector3(
		(geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2,
		(geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2,
		(geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2,
	);

	mesh.localToWorld(center);
	return center;
};
