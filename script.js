const cards = document.querySelector(".cards");

function showDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = 'block';

  }

function selectCategory(clickedEle, category) {
  const bttnInner = `
    <img src="./assets/${category}.svg" alt="vector" style="width: 30px; height: 30px; margin-right: 7px;">
    ${
      category === "men"
        ? "Mens"
        : category === "women"
        ? "Womens"
        : category === "kids"
        ? "Kids"
        : "Categories"
    }
    `;
  const bttn = document.querySelector(".dropbtn");
  bttn.innerHTML = bttnInner;
  var dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.style.display = 'none';

  //update the body based on category
  //first clear the cards

  cards.innerHTML = "";
  updatePage(category);
  
}



const select = document.querySelector(".select")
select.addEventListener("click", (e) => {
   
    Array.from(select.children).forEach(ele => 
       { if(ele === e.target){
            ele.style.backgroundColor = 'black'
            ele.style.color = 'white'
            ele.classList.remove('hidden')
            ele.style.borderRadius = "5px"
        }else{
            ele.style.backgroundColor = 'rgb(212, 212, 212)'
            ele.classList.add("hidden")
            ele.style.borderRadius = "0"
        }
    }
    )
})

const product = {
  id: "3",
  title: "Green Charm",
  price: "1399",
  compare_at_price: "1499",
  vendor: "Myntra",
  badge_text: "On offer",
  image:
    "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22372642/2023/3/16/52d27507-a870-456b-addd-e62aefa0f79a1678911375020ESSLogoRegularFitMensT-Shirt1.jpg",
  second_image: "empty",
};

//create a card based on given data

const createCard = (product) => {
  const originalPrice = parseInt(product.compare_at_price);
  const sellingPrice = parseInt(product.price);
  let percentageOff = ((originalPrice - sellingPrice) * 100) / originalPrice;
  percentageOff = percentageOff.toFixed(0);

  const card = `
<div class="card" id = ${product.id}>
      <div class="pic">
      ${`${
        product.badge_text
          ? '<div class="button"><p>' + product.badge_text + "</p></div>"
          : ""
      }`}
      </div>
      <div class="info">
        <div class="div1">

            <h2 class="title">${product.title}</h2>
            <div class="dot"></div>
            <h5 class="brand">${product.vendor}</h5>
        </div>
        <div class="div2">
            <p class="price">${`Rs ${product.price}`}</p>
            <p class="price2">${product.compare_at_price}</p>
            <div class="off">${`${percentageOff}% Off`}</div>
        </div>

      </div>
      <div class="button addToCart">
        Add to Cart
      </div>
    </div>
`;
  //add the product in the body
  cards.innerHTML += card;

  //get the element by id
  const ele = document.getElementById(product.id);
  const pic = ele.childNodes[1];

  //backgroundImage transition
  pic.style.backgroundImage = `url(${product.image})`;
};

//will work on transition later{
// if (product.second_image !== "empty") {
//     pic.addEventListener("mouseover", () => {
//       pic.style.backgroundImage = `url(${product.image})`;
//     });
//     pic.addEventListener("mouseout", () => {
//       pic.style.backgroundImage = `url(${product.second_image})`;
//     });
//   }

const updatePage = (category) => {
  //fetch the data first
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Data is the JSON object received from the API
      let fetchedData = { ...data };
      const mensProducts = fetchedData.categories[0]["category_products"];
      const womensProducts = fetchedData.categories[1]["category_products"];
      const kidsProducts = fetchedData.categories[2]["category_products"];

      //let us now populate the page with products

      if (category === "men") {
        mensProducts.forEach((product) => {
          if(product.id > 1){
            createCard(product);;
          }
          
        });
      }
      if (category === "women") {
        womensProducts.forEach((product) => createCard(product));
      }
      if (category === "kids") {
        kidsProducts.forEach((product) => createCard(product));
      }
    
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
