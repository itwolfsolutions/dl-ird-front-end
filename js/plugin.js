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


const response = [
  {
    "name": "A_FXD_Y30_US",
    "current_date": "3-Dec-25",
    "current_value": 0.0675,
    "yesterday_value": 0.0676,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0001,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "DJIA_EOD",
    "current_date": "3-Dec-25",
    "current_value": 47548.15,
    "yesterday_value": 46259.29,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 1288.86,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "FEDFUNDS",
    "current_date": "3-Dec-25",
    "current_value": 0.04,
    "yesterday_value": 0.04,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFR",
    "current_date": "3-Dec-25",
    "current_value": 0.0401,
    "yesterday_value": 0.0391,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.001,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFR_M1",
    "current_date": "3-Dec-25",
    "current_value": 0.0399,
    "yesterday_value": 0.0407,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0008,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAPM1 Y1",
    "current_date": "3-Dec-25",
    "current_value": 0.0346,
    "yesterday_value": 0.0349,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0003,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAPM1 Y10",
    "current_date": "3-Dec-25",
    "current_value": 0.0361,
    "yesterday_value": 0.0359,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0002,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAPM1 Y15",
    "current_date": "3-Dec-25",
    "current_value": 0.0386,
    "yesterday_value": 0.0382,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0004,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAPM1 Y2",
    "current_date": "3-Dec-25",
    "current_value": 0.0326,
    "yesterday_value": 0.0326,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAPM1 Y3",
    "current_date": "3-Dec-25",
    "current_value": 0.0324,
    "yesterday_value": 0.0322,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0002,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAPM1 Y30",
    "current_date": "3-Dec-25",
    "current_value": 0.0396,
    "yesterday_value": 0.0392,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0004,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAPM1 Y5",
    "current_date": "3-Dec-25",
    "current_value": 0.0331,
    "yesterday_value": 0.0329,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0002,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAPM1 Y7",
    "current_date": "3-Dec-25",
    "current_value": 0.0343,
    "yesterday_value": 0.0341,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0002,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAP Y10",
    "current_date": "3-Dec-25",
    "current_value": 0.0368,
    "yesterday_value": 0.0365,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0003,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAP Y2",
    "current_date": "3-Dec-25",
    "current_value": 0.0331,
    "yesterday_value": 0.0331,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAP Y3",
    "current_date": "3-Dec-25",
    "current_value": 0.0328,
    "yesterday_value": 0.0327,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0001,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAP Y5",
    "current_date": "3-Dec-25",
    "current_value": 0.0336,
    "yesterday_value": 0.0334,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0002,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRSWAP Y7",
    "current_date": "3-Dec-25",
    "current_value": 0.0348,
    "yesterday_value": 0.0346,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0002,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRTERM_M1",
    "current_date": "3-Dec-25",
    "current_value": 0.0383,
    "yesterday_value": 0.0395,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0012,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SOFRTERM_M3",
    "current_date": "3-Dec-25",
    "current_value": 0.0377,
    "yesterday_value": 0.0388,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0011,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "SP500_EOD",
    "current_date": "3-Dec-25",
    "current_value": 6848.37,
    "yesterday_value": 6614.35,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 234.02,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "TREASURY Y10",
    "current_date": "3-Dec-25",
    "current_value": 0.0406,
    "yesterday_value": 0.0407,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0001,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "TREASURY Y2",
    "current_date": "3-Dec-25",
    "current_value": 0.0349,
    "yesterday_value": 0.0351,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0002,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "TREASURY Y3",
    "current_date": "3-Dec-25",
    "current_value": 0.035,
    "yesterday_value": 0.035,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "TREASURY Y30",
    "current_date": "3-Dec-25",
    "current_value": 0.0473,
    "yesterday_value": 0.0472,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0.0001,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "TREASURY Y5",
    "current_date": "3-Dec-25",
    "current_value": 0.0362,
    "yesterday_value": 0.0362,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "TREASURY Y7",
    "current_date": "3-Dec-25",
    "current_value": 0.0382,
    "yesterday_value": 0.0382,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "USDEUR FT0",
    "current_date": "3-Dec-25",
    "current_value": 0.8631,
    "yesterday_value": 0.8673,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0042,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "USDGBP FT0",
    "current_date": "3-Dec-25",
    "current_value": 0.7587,
    "yesterday_value": 0.7653,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -0.0066,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "USDJPY FT0",
    "current_date": "3-Dec-25",
    "current_value": 156.0808,
    "yesterday_value": 157.4671,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": -1.3863,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "USDMXP FT0",
    "current_date": "3-Dec-25",
    "current_value": 18.3207,
    "yesterday_value": null,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": null,
    "change_week": null,
    "change_month": null,
    "change_year": null
  },
  {
    "name": "WSJ PRIME",
    "current_date": "3-Dec-25",
    "current_value": 0.07,
    "yesterday_value": 0.07,
    "last_week_value": null,
    "last_month_value": null,
    "last_year_value": null,
    "change_yesterday": 0,
    "change_week": null,
    "change_month": null,
    "change_year": null
  }
]

const sortedResponse = response.sort((a, b) => {
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
  today = rate.current_date;
  let rateName = rateNameObj[rate.name]['name'];
  rowData.push({
    "type": rateNameObj[rate.name]['type'], 
    "rate": rateName, 
    "today": formatValue(rate.current_value, rateName), 
    "yesterday": formatValue(rate.yesterday_value, rateName), 
    "chg-yesterday": formatValue(rate.change_yesterday, rateName), 
    "last-week": formatValue(rate.last_week_value, rateName), 
    "chg-last-week": formatValue(rate.change_week, rateName), 
    "last-month": formatValue(rate.last_month_value, rateName), 
    "chg-last-month": formatValue(rate.change_month, rateName), 
    "last-year": formatValue(rate.last_year_value, rateName), 
    "chg-last-year": formatValue(rate.change_year, rateName)
  });
}


function formatValue(value, rateName) {
  const notPercentageValue = ['Dow Industrial Avg.', 'S&P 500', 'USD/EUR', 'USD/JPY', 'USD/GBP', 'USD/MXN'];
  if (notPercentageValue.includes(rateName)) {
    return value === null ? '-' : (value).toLocaleString();
  }
  return value === null ? '-' : (value * 100).toFixed(2) + '%';
}





// Row Data Interface

// Grid API: Access to Grid API methods
let gridApi;

// Grid Options: Contains all of the grid configurations
const gridOptions = {
  // Data to be displayed
  rowData: rowData,
  // rowData: [
  //   // { isHeader: true, "rate": 'Short Term Rates' },
  //   { "type": "Short Term Rates", "rate": "Federal Funds", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "Short Term Rates", "rate": "SOFR Overnight", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "Short Term Rates", "rate": "1-month Term SOFR", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "Short Term Rates", "rate": "3-month Term SOFR", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "Short Term Rates", "rate": "30-Day Average SOFR", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "Short Term Rates", "rate": "WSJ Prime", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
    
  //   // { isHeader: true, "rate": 'Short Term Rates' },
  //   { "type": "SOFR Swap Rates (1-Month)", "rate": "Federal Funds", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "SOFR Swap Rates (1-Month)", "rate": "SOFR Overnight", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "SOFR Swap Rates (1-Month)", "rate": "1-month Term SOFR", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "SOFR Swap Rates (1-Month)", "rate": "3-month Term SOFR", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "SOFR Swap Rates (1-Month)", "rate": "30-Day Average SOFR", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  //   { "type": "SOFR Swap Rates (1-Month)", "rate": "WSJ Prime", "today": "4.00%", "yesterday": "4.00%", "chg-yesterday": "0.00%", "last-week": "4.00%", "chg-last-week": "0.00%", "last-month": "4.00%", "chg-last-month": "0.00%", "last-year": "4.00%", "chg-last-year": "0.00%" },
  // ],
  // Columns to be displayed (Should match rowData properties)
  columnDefs: [
    { headerName: "", field: "type", flex: 3, spanRows: true, sortable: false },
    { headerName: "", field: "rate", flex: 2, filter: true,
        cellRenderer: params => {
        if (params.data.isHeader) {
            return `<div style="font-weight: bold;">
                    ${params.value}
                    </div>`;
        }
        return params.value;
        }
    },
    { headerName: today, field: "today" },
    { headerName: "Yest", field: "yesterday" },
    { headerName: "Chg", field: "chg-yesterday" },
    { headerName: "Last Week", field: "last-week" },
    { headerName: "Chg", field: "chg-last-week" },
    { headerName: "Last Month", field: "last-month" },
    { headerName: "Chg", field: "chg-last-month" },
    { headerName: "Last Year", field: "last-year" },
    { headerName: "Chg", field: "chg-last-year" }
  ],
  enableCellSpan: true,
  suppressExcelExport: true,
  popupParent: document.body,
  defaultColDef: {
    flex: 1,
  },
  getRowStyle: params => {
        if (params.data.isHeader) {
            return { background: '#001A72', color: '#fff' };
        }
    },
};

function onBtnExport() {
  gridApi.exportDataAsCsv();
}
// Create Grid: Create new grid within the #myGrid div, using the Grid Options object
gridApi = agGrid.createGrid(document.querySelector("#myGrid"), gridOptions);






const { AgCharts } = agCharts;

// Chart Options
const options = {
  container: document.getElementById("myChart"), // Container: HTML Element to hold the chart
  // Data: Data to be displayed in the chart
  data: [
    { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
    { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
    { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
    { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
    { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
    { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
  ],
  // Series: Defines which chart type and data to use
  series: [{ type: "bar", xKey: "month", yKey: "iceCreamSales" }],
};

// Create Chart
AgCharts.create(options);
