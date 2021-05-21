const formatNumber = (value: any) => {
    return (value && (value as number).toLocaleString("en-US")) || "";
};

export { formatNumber };
