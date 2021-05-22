// 3.變數宣告
const menu = document.getElementById("menu");
const cart = document.getElementById("cart");
const totalAmount = document.getElementById("total-amount");
const submitBtn = document.getElementById("submit-button");
let products = [];
let cartItems = [];
let total = 0;
let order = "";

// 4.GET API 菜單產品資料
axios
  .get("https://ac-w3-dom-pos.firebaseio.com/products.json")
  .then((res) => {
    products = res.data;
    displayMenu(products);
  })
  .catch((err) => console.log(err));
// 5.將產品資料加入菜單區塊

function displayMenu(products) {
  products.forEach((product) => {
    menu.innerHTML += ` <div class="col-3" ">
      <div class="card">
        <img src="${product.imgUrl}" class="card-img-top" alt="...">
        <div class="body">
          <h5 class="name">${product.name}</h5>
          <p class="price">${product.price}</p>
          <a href="#" class="btn btn-primary" id="${product.id}">加入購物車</a>
        </div>
      </div>
    </div> `;
  });
}

// 6.加入購物車
function addToCart(event) {
  // 找到觸發event的node元素，並得到其產品id
  const id = event.target.id;
  //在產品清單中取出單一產品，比對他的ID是否符合被選取的id，符合就放進去addedProduct
  const addedProduct = products.find((product) => product.id === id);
  // 在productData的資料裡，找到點擊的產品資訊 name, price
  const name = addedProduct.name;
  const price = addedProduct.price;

  // 加入購物車變數cartItems 分：有按過、沒按過
  //設定目標加入的物品，在購物車裡面是否有相同id，用find會回傳整個物件
  const targetItem = cartItems.find((item) => item.id === id);

  if (targetItem) {
    //有找到一樣的物件，只對數量加一
    targetItem.quantity += 1;
  } else {
    //沒有找到，則要把資料加入購物車中
    cartItems.push({
      id,
      name,
      price,
      quantity: 1
    });
  }

  // 畫面顯示購物車清單
  cart.innerHTML = cartItems
    .map(
      (item) =>
        ` <li class="list-group-item">${item.name} X ${item.quantity} 小計：${
          item.price * item.quantity
        }</li>`
    )
    .join("");

  // 計算總金額
  calculateAmount(price);
}
submit();

// 7.計算總金額
function calculateAmount(price) {
  total += price;
  totalAmount.textContent = total;
}

// 8.送出訂單
function submit(order) {
  submitBtn.addEventListener("click", (event) => {
    if (total == 0) {
      alert("請先將商品放入購物車");
    } else {
      order = cart.innerText + "\n\n總金額：" + totalAmount.textContent;
      alert(`感謝購買！\n\n${order}`);
      reset();
    }
  });
}

// 9.重置資料
function reset() {
  cart.innerHTML = "";
  totalAmount.innerHTML = "--";
  cartItems = [];
  total = 0;
}

// 10. 加入事件監聽
menu.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    addToCart(event);
  }
});
