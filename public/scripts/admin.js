function grabOrderDataAndThenDisplay() {
  const orderViewArea = document.querySelector("#orders-list");
  fetch("/api/orders")
    .then(res => res.json())
    .then(d => {
      console.log(d);
    }).catch(e => console.log(e));
}

document.querySelector("#grab-all-orders-btn").addEventListener("click", () => {
  grabOrderDataAndThenDisplay();
})


