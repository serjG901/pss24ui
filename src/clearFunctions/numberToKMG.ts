export default function numberToKMG(num: number) {
    if (num < 1000) return `${num}`;
    if (num < 1000000) return `${Math.round(num/100)/10}K`;
    if (num < 1000000000) return `${Math.round(num/100000)/10}M`;
    return `${Math.round(num/100000000)/10}G`;
}