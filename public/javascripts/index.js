let plantStock = document.getElementById("plant-stock");
plantStock = plantStock.textContent.split(" ");
plantStock = Number(plantStock[1]);

let plantPrice = document.getElementById("plant-price");
plantPrice = plantPrice.textContent.split("$");
plantPrice = Number(plantPrice[1]);

let subTotal = document.getElementById("sub-total");
let subTotalAmount = subTotal.textContent.split("$");
subTotalAmount = Number(subTotalAmount[1]);

let amount = document.getElementById("amount");

const handleChange = (e) => {
  subTotal.textContent = "$" + plantPrice * e.target.value;
};

amount.addEventListener("change", handleChange);
