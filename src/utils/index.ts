export function getFirstElemOrUndefined<T>(array: any[]): T | undefined {
    if (array.length > 0) {
        return array[0];
    }
    return undefined;
}