// eventually: remove unnecessary fields on incoming data so that table can be made adaptive to incoming data's structure

function grabOrderDataAndThenDisplay() {
  const orderViewArea = document.querySelector("#orders-list");
  fetch("/api/orders")
    .then(res => res.json())
    .then(d => {
      const table = document.createElement("table");

      // make head row
      const headRow = document.createElement("tr");
      let fields = ["complete", "createdAt", "updatedAt", "email", "name", "orders"]
      fields.map(x => {
        let head = document.createElement("th");
        head.classList.add("table-head");
        head.textContent = x;
        headRow.appendChild(head);
      });
      table.appendChild(headRow);

      // make data rows
      const numOfOrders = d.data.length;
      for (let i = 0; i < numOfOrders; i++) {
        const dataRow = document.createElement("tr");
        // eh
        // const completeTd = document.createElement("td").textContent = d.data[i].complete;
        // const nameTd = document.createElement("td").textContent = d.data[i].name;
        // const emailTd = document.createElement("td").textContent = d.data[i].email;
        // const updatedAtTd = document.createElement("td").textContent = d.data[i].updatedAt;
        // const createdAtTd = document.createElement("td").textContent = d.data[i].createdAt;
        // const orderTd = document.createElement("td");
        // const orderTable = document.createElement("table");
        for (let j = 0; j < fields.length - 1; j++) {
          const td = document.createElement("td");
          console.log(d.data[i])
          td.textContent = d.data[i][fields[j]];
          dataRow.appendChild(td)
        }
        const ordersTd = document.createElement("td");
        const subTable = document.createElement("table");
        //item, quantity
        const subTableHeadRow = document.createElement("tr");

        fields = ["item", "quantity"];
        fields.map(x => {
          let head = document.createElement("th");
          head.classList.add("table-head");
          head.textContent = x;
          subTableHeadRow.appendChild(head);
        });
        subTable.appendChild(subTableHeadRow);
        ordersTd.appendChild(subTable);
        dataRow.appendChild(ordersTd);

        console.log(dataRow);
        table.appendChild(dataRow);

      }
    console.log(table);
    document.querySelector("#orders-table").appendChild(table);

    }).catch(e => console.log(e));
}

document.querySelector("#grab-all-orders-btn").addEventListener("click", () => {
  grabOrderDataAndThenDisplay();
})