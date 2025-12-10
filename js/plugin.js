// Initialize grid with options
const grid = GridStack.init({
    acceptWidgets: true, // Allow dragging between grids
    removable: false,     // Allow removal
    float: true,         // Allow free floating
    minRow: 1,           // Minimum rows
    dragIn: '.external-widget' // Drag from external elements
});

const rateNameObj = {
    "FEDFUNDS": {name: "Federal Funds", type: "Short Term Rates"},
    "SOFR": {name: "SOFR Overnight", type: "Short Term Rates"},
    "SOFRTERM_M1": {name: "1-month Term SOFR", type: "Short Term Rates"},
    "SOFRTERM_M3": {name: "3-month Term SOFR", type: "Short Term Rates"},
    "SOFR_M1": {name: "30-Day Average SOFR", type: "Short Term Rates"},
    "WSJ PRIME": {name: "WSJ Prime", type: "Short Term Rates"},
    "SOFRSWAPM1 Y1": {name: "1-Year", type: "SOFR Swap Rates (1-Month)"},
    "SOFRSWAPM1 Y2": {name: "2-Year", type: "SOFR Swap Rates (1-Month)"},
    "SOFRSWAPM1 Y3": {name: "3-Year", type: "SOFR Swap Rates (1-Month)"},
    "SOFRSWAPM1 Y5": {name: "5-Year", type: "SOFR Swap Rates (1-Month)"},
    "SOFRSWAPM1 Y7": {name: "7-Year", type: "SOFR Swap Rates (1-Month)"},
    "SOFRSWAPM1 Y10": {name: "10-Year", type: "SOFR Swap Rates (1-Month)"},
    "SOFRSWAPM1 Y15": {name: "15-Year", type: "SOFR Swap Rates (1-Month)"},
    "SOFRSWAPM1 Y30": {name: "30-Year", type: "SOFR Swap Rates (1-Month)"},
    "SOFRSWAP Y2": {name: "2-Year", type: "SOFR Swap Rates (Annual)"},
    "SOFRSWAP Y3": {name: "3-Year", type: "SOFR Swap Rates (Annual)"},
    "SOFRSWAP Y5": {name: "5-Year", type: "SOFR Swap Rates (Annual)"},
    "SOFRSWAP Y7": {name: "7-Year", type: "SOFR Swap Rates (Annual)"},
    "SOFRSWAP Y10": {name: "10-Year", type: "SOFR Swap Rates (Annual)"},
    "TREASURY Y2": {name: "2-Year Treasury", type: "Treasuries"},
    "TREASURY Y3": {name: "3-Year Treasury", type: "Treasuries"},
    "TREASURY Y5": {name: "5-Year Treasury", type: "Treasuries"},
    "TREASURY Y7": {name: "7-Year Treasury", type: "Treasuries"},
    "TREASURY Y10": {name: "10-Year Treasury", type: "Treasuries"},
    "TREASURY Y30": {name: "30-Year Treasury", type: "Treasuries"},
    "DJIA_EOD": {name: "Dow Industrial Avg.", type: "Notable"},
    "SP500_EOD": {name: "S&P 500", type: "Notable"},
    "A_FXD_Y30_US": {name: "30-Yr Fixed Rate Mtge.", type: "Notable"},
    "USDEUR FT0": {name: "USD/EUR", type: "Foreign Exchange"},
    "USDJPY FT0": {name: "USD/JPY", type: "Foreign Exchange"},
    "USDGBP FT0": {name: "USD/GBP", type: "Foreign Exchange"},
    "USDMXP FT0": {name: "USD/MXN", type: "Foreign Exchange"},
};

let gridApi;

const gridOptions = {
    columnDefs: [
        {headerName: "", field: "type", flex: 3, spanRows: true, sortable: false},
        {headerName: "", field: "rate", flex: 2, filter: true},
        {headerName: '9-Dec-2025', field: "today"},
        {headerName: "Yest", field: "yesterday"},
        {headerName: "Chg", field: "chg-yesterday"},
        {headerName: "Last Week", field: "last-week"},
        {headerName: "Chg", field: "chg-last-week"},
        {headerName: "Last Month", field: "last-month"},
        {headerName: "Chg", field: "chg-last-month"},
        {headerName: "Last Year", field: "last-year"},
        {headerName: "Chg", field: "chg-last-year"}
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
    },
    enableCellSpan: true,
    suppressExcelExport: true,
    popupParent: document.body
};

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    const url = "http://127.0.0.1:8001/current/rates";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const sortedResponse = data.sort((a, b) => {
                const keys = Object.keys(rateNameObj);
                const indexA = keys.indexOf(a.name);
                const indexB = keys.indexOf(b.name);

                // Handle items not found in reference (put them at the end)
                if (indexA === -1 && indexB === -1) return 0;
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;

                return indexA - indexB;
            });

            let rowData = [];
            let today = null;
            for (const rate of sortedResponse) {
                today = rate['current_date'];
                let rateName = rateNameObj[rate.name]['name'];
                rowData.push({
                    "type": rateNameObj[rate.name]['type'],
                    "rate": rateName,
                    "today": formatValue(rate['current_value'], rateName),
                    "yesterday": formatValue(rate['yesterday_value'], rateName),
                    "chg-yesterday": formatValue(rate['change_yesterday'], rateName),
                    "last-week": formatValue(rate['last_week_value'], rateName),
                    "chg-last-week": formatValue(rate['change_week'], rateName),
                    "last-month": formatValue(rate['last_month_value'], rateName),
                    "chg-last-month": formatValue(rate['change_month'], rateName),
                    "last-year": formatValue(rate['last_year_value'], rateName),
                    "chg-last-year": formatValue(rate['change_year'], rateName)
                });
            }

            function formatValue(value, rateName) {
                const notPercentageValue = ['Dow Industrial Avg.', 'S&P 500', 'USD/EUR', 'USD/JPY', 'USD/GBP', 'USD/MXN'];
                if (notPercentageValue.includes(rateName)) {
                    return value === null ? '-' : (value).toLocaleString();
                }
                return value === null ? '-' : (value * 100).toFixed(2) + '%';
            }

            gridOptions['rowData'] = rowData;
            gridOptions['columnDefs'][2]['headerName'] = today;
            const gridDiv = document.querySelector("#myGrid");
            gridApi = agGrid.createGrid(gridDiv, gridOptions);
        });
});


const {AgCharts} = agCharts;

// Chart Options
const options = {
    container: document.getElementById("myChart"), // Container: HTML Element to hold the chart
    // Data: Data to be displayed in the chart
    data: [
        {month: "Jan", avgTemp: 2.3, iceCreamSales: 162000},
        {month: "Mar", avgTemp: 6.3, iceCreamSales: 302000},
        {month: "May", avgTemp: 16.2, iceCreamSales: 800000},
        {month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000},
        {month: "Sep", avgTemp: 14.5, iceCreamSales: 950000},
        {month: "Nov", avgTemp: 8.9, iceCreamSales: 200000},
    ],
    // Series: Defines which chart type and data to use
    series: [{type: "bar", xKey: "month", yKey: "iceCreamSales"}],
};

// Create Chart
AgCharts.create(options);
