// eventually: remove unnecessary fields on incoming data so that table can be made adaptive to incoming data's structure

document.querySelector("#grab-all-orders-btn").addEventListener("click", () => {
  grabOrderDataAndThenDisplay();
});

function grabOrderDataAndThenDisplay() {
  console.log("grabOrderAndDisplay Called");
  fetch("/api/orders")
    .then(res => res.json())
    .then(d => {
      const dataDisplay = createTable(d.data);
      console.log("dataDisplay: ", dataDisplay);
      document.querySelector("#orders-table").appendChild(dataDisplay);
    }).catch(err => console.log(err))
}

function createTable(data) {
  console.log("-------------------------------")
  console.log("createTable called with argument");
  console.log(data);
  console.log("-------------------------------")
  // create a table element
  const table = document.createElement("table");
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
  console.log("-------------------------------")
  console.log("makeHeaderRow called with arguments")
  console.log(f);
  console.log("-------------------------------");
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
  console.log("-------------------------------")
  console.log("make data row called with arguments:")
  console.log(obj);
  console.log(fields);
  console.log("-------------------------------")
  // create a row for the data
  const row = document.createElement("tr");
  // for every key (except the last) in the obj:
  for (let j = 0; j < fields.length - 1; j++) {
    // make a td
    const td = document.createElement("td");
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
  console.log("-------------------------------")
  console.log("_makeSubTable called with arguments:");
  console.log(orders, fields);
  console.log("-------------------------------")
  // create the td for holding the sub-table
  const outTd = document.createElement("td");
  const table = document.createElement("table");
  // fields = ["item", "quantity"]
  const headerRow = makeHeaderRow(fields);
  table.appendChild(headerRow);
  for (let i = 0; i < orders.length; i++) {
    let dataRow = document.createElement("tr");
    for (let j = 0; j < fields.length; j++) {
      let td = document.createElement("td");
      td.textContent = orders[i][fields[j]];
      dataRow.appendChild(td);
    }

    table.appendChild(dataRow);
  }
  outTd.appendChild(table);
  return outTd;
}