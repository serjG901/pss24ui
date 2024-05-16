export default function durationToClock(duration: number) {
    const hours = Math.trunc(duration / 60);
    if (hours) {
        const minutes = duration - hours * 60;
        return `${hours}h ${minutes < 10 ? "0" + minutes : minutes}m`;
    }
    return `${duration}m`;
}
