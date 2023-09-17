export function getUnique(array: unknown[]) {
	return Array.from((new Set(array)));
}

export function deepClone<T>(object: T) {
	return JSON.parse(JSON.stringify(object)) as T;
}
