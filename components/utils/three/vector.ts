import {Vector2} from 'three';

export const randomVector2 = (maxX: number, maxY: number) =>
	new Vector2(Math.floor(Math.random() * maxX), Math.floor(Math.random() * maxY));
