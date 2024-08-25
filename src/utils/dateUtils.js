function isoToTimestamp(isoDate) {
    return new Date(isoDate).getTime();
}

module.exports = {
    isoToTimestamp
};
