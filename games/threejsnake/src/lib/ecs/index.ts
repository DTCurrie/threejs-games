import {World} from 'miniplex';
import type {PositionComponent, MeshComponent, DirectionComponent, SegmentsComponent} from './components';

export type Entity = PositionComponent & MeshComponent & Partial<DirectionComponent & SegmentsComponent>;

export const world = new World<Entity>();
