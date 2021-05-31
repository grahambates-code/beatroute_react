export const parseToLineData = (data) => {
    const { features } = data;
    let lineData = [];

    for (let i = 0; i < features.length; i++) {
        const y = features[i].properties.elevation;

        lineData.push({ x: i, y });
    }

    return lineData;
};