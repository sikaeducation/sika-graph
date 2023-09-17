export function getUnique(array: unknown[]) {
	return Array.from((new Set(array)));
}

export function deepClone<T>(object: T) {
	return JSON.parse(JSON.stringify(object)) as T;
}

export function clampToInteger(
	value: number, lowerBound: number, upperBound: number,
) {
	return Math.round(Math.max(Math.min(value, upperBound),
		lowerBound));
}
