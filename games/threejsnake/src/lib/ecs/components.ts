import type {BufferGeometry, Material} from 'three';
import {Mesh, Vector2} from 'three';
import type {Entity} from '.';
import type {Segment} from '../segment';

/// ///
// Required Components
///

// Position
export type PositionComponent = {position: Vector2};
export const positionComponent = (x = 0, y = 0): PositionComponent => ({position: new Vector2(x, y)});

// Mesh
export type MeshComponent = {mesh: Mesh};
export const meshComponent = <
	GeometryType extends BufferGeometry = BufferGeometry,
	MaterialType extends Material | Material[] = Material | Material[],
>(geometry?: GeometryType, material?: MaterialType): MeshComponent => ({mesh: new Mesh(geometry, material)});

/// ///
// Optional Components
///

// Direction
export type DirectionComponent = {nextDirection: Vector2; currentDirection: Vector2; lastPosition: Vector2};
export const directionComponent = (x = 0, y = 0): DirectionComponent => ({
	nextDirection: new Vector2(x, y),
	currentDirection: new Vector2(x, y),
	lastPosition: new Vector2(),
});

// Segments
export type SegmentsComponent = {
	segments: Segment[];
	segmentPositions: () => Vector2[];
};

export const segmentsComponent = (initial: Segment[] = []): SegmentsComponent => {
	const segments = [...initial];
	const segmentPositions = () => segments.map(({entity: {position}}) => position);

	return {
		segments,
		segmentPositions,
	};
};

