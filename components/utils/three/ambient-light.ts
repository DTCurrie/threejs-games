
import type {ColorRepresentation} from 'three';
import {AmbientLight} from 'three';

export const ambientLight = (
	color: ColorRepresentation = 0x000000,
	intensity = 0.25,
) => {
	const ambientLight = new AmbientLight(color, intensity);
	return ambientLight;
};
