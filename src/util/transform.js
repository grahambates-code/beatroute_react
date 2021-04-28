export const getRandomDeg = (i) => {
    if (i % 2 === 0) {
        return (Math.random() - 1.5) * 4;
    }

    return Math.random() * 8;
};
