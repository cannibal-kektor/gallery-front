export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
    };
    const time = date.toLocaleTimeString("ru", timeOptions);
    const formattedDate = date.toLocaleDateString();
    return `${time} ${formattedDate}`;
};