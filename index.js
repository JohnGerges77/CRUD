//calling by ids
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let temp;

// get total
function getTotal() {
    if(price.value!=""){
        total.innerHTML = ` ${(+price.value + +taxes.value + +ads.value)- +discount.value}`
        total.style.background = "green"
        }
        else{
            total.innerHTML="";
          
        }
}

// create product and //save localstorage

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  total.style.background = "rgb(175, 32, 32)";
  //count
  if (title.value != "" && price.value != "" && newPro.count <= 100) {
    if (mode === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[temp] = newPro;
      mode = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
      clearData();
    }
    clearData();
  }

  // dataPro.push(newPro);
  localStorage.setItem("product", JSON.stringify(dataPro));

  showData();
};

//clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">Update</button></td>
        <td><button onclick="deleteData( ${i} )" id="Delete">Delete</button></td>
    </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteall");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
            <button class="deleteAllBtn" onclick="deleteall()">Delete All (${dataPro.length})</button>
            `;
    btnDelete.className = "deleteAllBtn";
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();

//delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteall() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;

  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mode = "update";
  temp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//Search
let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "search_by_title") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  } else if (id == "search_by_category") {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMode === "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="Delete">Delete</button></td>
                </tr>
                    `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData( ${i} )" id="Delete">Delete</button></td>
            </tr>
                `;
      }
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
