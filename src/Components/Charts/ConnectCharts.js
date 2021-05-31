import React, { useState } from 'react';

export const ConnectChartContext = React.createContext({
    updateMagnifyingFocusData: (magnifyingFocusData) => null,
    magnifyingFocusData: [],
});

const ConnectChart = ({ children }) => {
    const [magnifyingFocusData, setMagnifyingFocusData] = useState([]);

    const updateMagnifyingFocusData = (data) => {
        setMagnifyingFocusData(data);
    };

    return (
        <ConnectChartContext.Provider 
            value={{ 
                updateMagnifyingFocusData, 
                magnifyingFocusData 
            }}
        >
            {children}
        </ConnectChartContext.Provider>
    );
};

export default ConnectChart;