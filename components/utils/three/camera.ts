import {OrthographicCamera, PerspectiveCamera} from 'three';

export type PerspectiveCameraOptions = {
	fov?: number;
	aspect?: number;
	near?: number;
	far?: number;
	control?: boolean;
};

export const perspectiveCamera = ({
	fov = 60,
	aspect = 2,
	near = 0.1,
	far = 5000,
}: PerspectiveCameraOptions) => {
	const camera = new PerspectiveCamera(fov, aspect, near, far);
	return {camera};
};

export type OrthographicCameraOptions = {
	left?: number;
	right?: number;
	top?: number;
	bottom?: number;
	near?: number;
	far?: number;
	control?: boolean;
};

export const orthographicCamera = ({
	left,
	right,
	top,
	bottom,
	near = 1,
	far = 1000,
}: OrthographicCameraOptions) => {
	const camera = new OrthographicCamera(left, right, top, bottom, near, far);
	return {camera};
};
