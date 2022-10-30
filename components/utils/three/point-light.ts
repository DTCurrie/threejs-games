import {Vector3, type ColorRepresentation} from 'three';
import {PointLight} from 'three';

export const pointLight = (
	color: ColorRepresentation = 0xffffff,
	intensity = 1,
	distance = 0,
	{x, y, z}: Vector3 = new Vector3(0, 100, 100),
) => {
	const directionalLight = new PointLight(color, intensity, distance);
	directionalLight.position.set(x, y, z);
	return directionalLight;
};
