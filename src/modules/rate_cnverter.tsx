

export function convertRate(rate: number) {

    if (rate >= 1000) {
        let calcRate = rate / 1000;
        let r: string = calcRate.toString() + 'K'
        return r;
    }
    else if (rate >= 1000000) {
        let calcRate = rate / 1000000;
        let r: string = calcRate.toString() + 'M';
        return r
    }
    else if (rate >= 1000000000) {
        let calcRate = rate / 1000000000;
        let r: string = calcRate.toString() + 'B';
        return r
    }
    else {
        return rate.toString()
    }

}