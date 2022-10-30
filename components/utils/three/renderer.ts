import type {Camera, Scene, WebGLRendererParameters} from 'three';
import {sRGBEncoding, WebGLRenderer} from 'three';

export const webGlRenderer = (
	width: number,
	height: number,
	parameters: WebGLRendererParameters = {antialias: true}) => {
	const instance = new WebGLRenderer(parameters);

	instance.shadowMap.enabled = true;

	instance.setPixelRatio(window.devicePixelRatio);
	instance.setSize(width, height);
	instance.outputEncoding = sRGBEncoding;

	return instance;
};

let renderRequested = false;
export const renderScene = (
	renderer: WebGLRenderer,
	scene: Scene,
	camera: Camera,
) => {
	renderRequested = false;
	renderer.render(scene, camera);
};

export const requestRender = (
	renderer: WebGLRenderer,
	scene: Scene,
	camera: Camera,
) => {
	if (!renderRequested) {
		renderRequested = true;
		requestAnimationFrame(() => {
			renderScene(renderer, scene, camera);
		});
	}
};
