document.getElementById("modal").style.display = 'none';
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

/*---------- Show All Products In UI ----------*/
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add('col');
    div.innerHTML = `
      <div class="card h-100 shadow-lg border-dark">
          <div class="card-body bg-card">
            <img style="height: 200px;" class="card-img-top img-fluid rounded" src=${image}></img>
            <h4 class="mt-3">${product.title}</h4>
          </div>
          <span class="p-3 bg-card">
            <h5>Category: ${product.category}</h5>
            <h4>Price: $ ${product.price}</h4>
            <p>
            <span class="icon fw-bold"><i class="fas fa-star"></i> ${product.rating.rate}</span>
            </p>
            <p>
            <span class="icon fw-bold"><i class="fas fa-user-check"></i> ${product.rating.count}</span>
            </p>
            <div class="d-flex justify-content-around">
              <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success fw-bold">Add To Cart</button>

              <button onclick="showDetails(${product.description})" id="showDetails" class="buy-now btn btn-warning fw-bold">Details</button>
            </div>
          </span>
      </div>`;
    document.getElementById("products").appendChild(div);
  }
};

/*----------  Price Conversion Function ----------*/
const getPrice = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

/*---------- Update Main Price Function ----------*/
const updatePrice = (id, value) => {
  const convertedOldPrice = getPrice(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};
 
/*---------- Set Prices Function ----------*/
const setPrice = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};
 
/*---------- Update Delivery charge and Total Tax ----------*/
const updateTaxAndCharge = () => {
  const priceConverted = getPrice("price");
  if (priceConverted <= 200) {
    setPrice("delivery-charge", 20);
    setPrice("total-tax", priceConverted * 0);
  }
  else if (priceConverted > 200 && priceConverted <= 400) {
    setPrice("delivery-charge", 30);
    setPrice("total-tax", priceConverted * 0.2);
  }
  else if (priceConverted > 400 && priceConverted <= 500) {
    setPrice("delivery-charge", 50);
    setPrice("total-tax", priceConverted * 0.3);
  }
  else if (priceConverted > 500) {
    setPrice("delivery-charge", 60);
    setPrice("total-tax", priceConverted * 0.4);
  }
};

/*---------- Update GrandTotal Function ----------*/
const updateTotal = () => {
  const grandTotal =
    parseFloat(getPrice("price") + getPrice("delivery-charge") +
    getPrice("total-tax"));
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

/*---------- Cart List Add Function ----------*/
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

/*---------- Show Details In Modal ----------*/
const showDetails = (description) => {
  console.log('details clicked');
  document.getElementById('details').innerText = description;
  document.getElementById('modal').style.display = 'block';
};