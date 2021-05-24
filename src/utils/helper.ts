const formatNumber = (value: any) => {
    return (value && (value as number).toLocaleString("en-US")) || "0";
};

const randomDate = (start: any, end: any, startHour: any, endHour: any) => {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
    date.setHours(hour);
    return date;
};

export { formatNumber, randomDate };
