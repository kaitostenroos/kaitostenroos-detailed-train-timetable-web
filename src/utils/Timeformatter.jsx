function FormatIsoDate(isodate) {
    
    const date = new Date(isodate);

    const formattedTime = date.toLocaleDateString("fi-FI", {
        timeZone: "Europe/Helsinki",
        hour: "2-digit",
        minute: "2-digit"
    });

    return <p>{formattedTime.substring(10, 16)}</p>
}
export default FormatIsoDate