document.querySelector("#grab-all-orders-btn").addEventListener("click", () => {
  grabOrderDataAndThenDisplay();
});

function grabOrderDataAndThenDisplay() {
  fetch("/api/orders")
    .then(res => res.json())
    .then(d => {
      const dataDisplay = createTable(d.data);
      console.log("dataDisplay: ", dataDisplay);
      document.querySelector("#orders-table").appendChild(dataDisplay);
    }).catch(err => console.log(err))
}

function createTable(data) {
  // create a table element
  const table = document.createElement("table");
  table.classList.add("table-main")
  // make header row
  let fields = ["complete", "createdAt", "updatedAt", "email", "name", "orders"]
  const headerRow = makeHeaderRow(fields);
  // append the row to the table
  table.appendChild(headerRow);
  for (let i = 0; i < data.length; i++) {
    let dataRow = makeDataRow(data[i], fields);
    table.appendChild(dataRow);
  }
  return table;
}

function makeHeaderRow(f) {
  const headerRow = document.createElement("tr");
  headerRow.classList.add("header-row");
  f.map(x => {
    let head = document.createElement("th");
    head.classList.add("table-head");
    head.textContent = x;
    // append the headers to the row
    headerRow.appendChild(head);
  });
  return headerRow;
}

function makeDataRow(obj, fields) {
  // create a row for the data
  const row = document.createElement("tr");
  row.classList.add("table-row")
  // for every key (except the last) in the obj:
  for (let j = 0; j < fields.length - 1; j++) {
    // make a td
    const td = document.createElement("td");
    td.classList.add("table-data-cell")
    // set content of td to be obj[key]
    td.textContent = obj[fields[j]];
    // add the td to the row
    row.appendChild(td);
  }
  const subTableTd = _makeSubTableInTd(obj.orders, ["item", "quantity"]);
  row.appendChild(subTableTd);
  return row;
}

function _makeSubTableInTd(orders, fields) {
  // create the td for holding the sub-table
  const outTd = document.createElement("td");
  const table = document.createElement("table");
  table.classList.add("sub-table")
  // fields = ["item", "quantity"]
  const headerRow = makeHeaderRow(fields);
  headerRow.classList.add("sub-table-header-row")
  table.appendChild(headerRow);
  for (let i = 0; i < orders.length; i++) {
    let dataRow = document.createElement("tr");
    dataRow.classList.add("sub-table-data-row")
    for (let j = 0; j < fields.length; j++) {
      let td = document.createElement("td");
      td.classList.add("sub-table-td")
      td.textContent = orders[i][fields[j]];
      dataRow.appendChild(td);
    }
    table.appendChild(dataRow);
  }
  outTd.appendChild(table);
  return outTd;
}