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

let gridApi, myChart;
const availableFreqCharts = ['week', 'month', 'year', '3-years'];
const baseUrl = 'http://127.0.0.1:8001/';
let currentFreqChart = 'week';
let currentFreqRate = '';
let chartsData = {};

const gridOptions = {
    columnDefs: [
        {headerName: "", field: "type", flex: 3, spanRows: true, sortable: false},
        {headerName: "", field: "rate", flex: 2, filter: true,
            cellRenderer: params => {
                return `<div class="rate-name" id="${params.data['rate-name']}">
                ${params.value}
                </div>`;
            }
        },
        {headerName: 'today', field: "today"},
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

document.addEventListener("DOMContentLoaded", function () {
    const currentRateUrl = baseUrl + "current/rates";
    fetch(currentRateUrl)
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
                    "rate-name": rate.name,
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

            gridOptions['rowData'] = rowData;
            gridOptions['columnDefs'][2]['headerName'] = today;
            const gridDiv = document.querySelector("#myGrid");
            gridApi = agGrid.createGrid(gridDiv, gridOptions);
            setTimeout(function () {
                $(".ag-row:first-of-type").click();
            }, 100);
        });


    const ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                borderWidth: 2,
                fill: 'start'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});


$(document).on("click", ".ag-row", function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    const rateName = $(this).find(".rate-name").attr('id');
    if (rateNameObj[rateName]) {
        const rateUrl = baseUrl + "rates?name=" + rateName;
        currentFreqRate = rateName;
        if (chartsData[currentFreqRate]) {
            updateChart(chartsData[currentFreqRate]);
        } else {
            fetch(rateUrl)
                .then((response) => response.json())
                .then((data) => {
                    chartsData[rateName] = data;
                    updateChart(data);
                });
        }
    }
})

$(".btn-group .btn-item").click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    if (availableFreqCharts.includes($(this).data('value'))) {
        currentFreqChart = $(this).data('value');
        updateChart(chartsData[currentFreqRate]);
    }
});


function formatValue(value, rateName) {
    const notPercentageValue = ['Dow Industrial Avg.', 'S&P 500', 'USD/EUR', 'USD/JPY', 'USD/GBP', 'USD/MXN'];
    if (notPercentageValue.includes(rateName)) {
        return value === null ? '-' : (value).toLocaleString();
    }
    return value === null ? '-' : (value * 100).toFixed(2) + '%';
}

function updateChart(data) {
    let chartData = data;
    if (currentFreqChart === 'week') {
        chartData = data.slice(-7);
        myChart.options.scales.x.ticks = {
            callback: function(val, index) {
                return chartData[index]['rate_date'];
            }
        }
    } else if (currentFreqChart === 'month') {
        chartData = data.slice(-30);
        myChart.options.scales.x.ticks = {
            callback: function(val, index) {
                return index % 7 === 0 ? chartData[index]['rate_date'] : '';
            }
        }
    } else if (currentFreqChart === 'year') {
        chartData = data.slice(-365);
        myChart.options.scales.x.ticks = {
            callback: function(val, index) {
                return index % 10 === 0 ? chartData[index]['rate_date'] : '';
            }
        }
    } else {
        myChart.options.scales.x.ticks = {
            callback: function(val, index) {
                return index % 30 === 0 ? chartData[index]['rate_date'] : '';
            }
        }
    }

    myChart.data.labels = chartData.map(item => item['rate_date']);
    if (myChart.data.datasets.length > 0) {
        myChart.data.datasets[0].label = rateNameObj[currentFreqRate]['name'];
        myChart.data.datasets[0].data = chartData.map(item => item['interest_rate']);
    }

    myChart.update();
}