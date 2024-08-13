import axios from "src/services";

const chartAPI = {
    getToltalMoneyDayinMonth: (monthInput, yearInput) => {
        const url = `/Chart/GetToltalMoneyDayinMonth?monthInput=${monthInput}&yearInput=${yearInput}`;
        return axios.get(url);
    },
    getTopBestSaleProduct: (topProduct) => {
        const url = `/Chart/GetTopBestSaleProduct?topProduct=${topProduct}`;
        return axios.get(url);
    },
    getTopLowSaleProduct: (topProduct) => {
        const url = `/Chart/GetTopLowSaleProduct?topProduct=${topProduct}`;
        return axios.get(url);
    },
};

export default chartAPI;