export default function premierDate(releaseDate: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(releaseDate).toLocaleDateString("en-US", options);
}
