export function getFirstElemOrUndefined<T>(array: any[]): T | undefined {
    if (array.length > 0) {
        return array[0];
    }
    return undefined;
}

export function checkTTL(datetime: string) {
    return new Date().getTime() <= Date.parse(datetime);
}

export function getNumberWithZero(n: number): string {
    if (n > 9) {
        return n.toString()
    }
    return `0${n}`
}

export function formattedPrice(price?: number) {
    if (price == undefined) {
        return '0';
    }
    return price!.toLocaleString().replace(/,/g, ' ');
}

export function getTime(rawDate?: string) {

    if (rawDate == undefined) {
        return '00:00'
    }
    const date = new Date(Date.parse(rawDate));
    return `${getNumberWithZero(date!.getHours())}:${getNumberWithZero(date!.getSeconds())}`
}