import {OrthographicCamera, PerspectiveCamera} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export type PerspectiveCameraOptions = {
	fov?: number;
	aspect?: number;
	near?: number;
	far?: number;
	control?: boolean;
};

export const perspectiveCamera = (rendererElement: HTMLCanvasElement, {
	fov = 60,
	aspect = 2,
	near = 0.1,
	far = 5000,
	control,
}: PerspectiveCameraOptions): {camera: PerspectiveCamera; controls: OrbitControls} => {
	const instance = new PerspectiveCamera(fov, aspect, near, far);

	const controls = new OrbitControls(instance, rendererElement);
	controls.enabled = Boolean(control);
	controls.enableDamping = true;
	controls.dampingFactor = 0.2;

	return {camera: instance, controls};
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

export const orthographicCamera = (rendererElement: HTMLCanvasElement, {
	left,
	right,
	top,
	bottom,
	near,
	far,
	control,
}: OrthographicCameraOptions) => {
	const instance = new OrthographicCamera(left, right, top, bottom, near, far);

	const controls = new OrbitControls(instance, rendererElement);
	controls.enabled = Boolean(control);
	controls.enableDamping = true;
	controls.dampingFactor = 0.2;

	return {camera: instance, controls};
};
