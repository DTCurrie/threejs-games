import {Vector2} from 'three';
import type {GridTileProperties} from './grid-tile';
import {gridTile} from './grid-tile';

export type GridTilePropertiesMap = Record<number, Record<number, GridTileProperties>>;
export const grid = <TileProperties extends GridTilePropertiesMap>(width: number, height: number, tileProperties?: TileProperties) => {
	const tiles = Array.from({length: width}, (_, x) =>
		Array.from({length: height}, (_, y) =>
			gridTile(new Vector2(x, y), tileProperties?.[x][y] ?? {})));

	const randomTile = () => {
		const {x, y} = new Vector2(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
		const tile = tiles[x][y];
		return tile;
	};

	const getTile = ({x, y}: Vector2) => tiles[x][y];

	return {tiles, randomTile, getTile};
};
