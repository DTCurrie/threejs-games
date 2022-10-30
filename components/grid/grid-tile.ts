import type {Vector2} from 'three';

export type GridTileProperties = Record<string, unknown>;
export const gridTile = <Properties extends GridTileProperties>(coordinates: Vector2, properties: Properties) => ({
	coordinates,
	...properties,
});
