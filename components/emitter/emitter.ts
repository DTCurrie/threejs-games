export type EventData = Record<string, unknown>;
export type Listener<Data extends EventData> = (event: Data) => void;

export type Disposable = {
	dispose(): void;
};

export const emitter = <DataType extends EventData>() => {
	const listeners: Array<Listener<DataType>> = [];
	const triggers: Array<Listener<DataType>> = [];

	const clear = () => {
		listeners.length = 0;
		triggers.length = 0;
	};

	const on = (listener: Listener<DataType>): Disposable => {
		listeners.push(listener);
		return {dispose() {
			off(listener);
		}};
	};

	const once = (listener: Listener<DataType>): number => triggers.push(listener);

	const off = (listener: Listener<DataType>): void => {
		const index = listeners.indexOf(listener);
		if (index > -1) {
			listeners.splice(index, 1);
		}
	};

	const emit = (event: DataType): void => {
		listeners.forEach((listener: Listener<DataType>) => {
			listener(event);
		});

		for (let i = triggers.length; i > 0; i--) {
			triggers.pop()?.(event);
		}
	};

	return {
		clear,
		on,
		once,
		off,
		emit,
	};
};
