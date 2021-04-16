
import productDB , {bulkCreate, getData, createElement } from './product.js';

let db = productDB("productDB", {
    products: '++id, product_name, product_seller, product_price'
})

// DOM form input
const productId = document.getElementById("product_id");
const productName = document.getElementById("product_name");
const productSeller = document.getElementById("product_seller");
const productPrice = document.getElementById("product_price");

// DOM buttons
const btnInsert = document.getElementById("btn-create");
const btnRead = document.getElementById("btn-read");
const btnUpdate = document.getElementById("btn-update");
const btnDelete = document.getElementById("btn-delete");


const insertRecord= (event) => {
    let flag = bulkCreate(db.products, {
        product_name: productName.value,
        product_price: "$ "+productPrice.value,
        product_seller: productSeller.value
    })
    getData(db.products, (data) => {
        productId.value = (data.product_id + 1) || 1
    })
    productName.value  = product_seller.value = "";
    product_price.value = 0;
    
    readRecord()

    let insertMsg = document.querySelector('.insert-msg');
    displayMsg(flag, insertMsg)
}


const readRecord = () => {
    const tbody = document.getElementById("tbody");

    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild)
    }
    getData(db.products, data => {
        if(data){
            createElement("tr", tbody, tr => {
                for(let val in data){
                    createElement("td",tr, (td) => {
                        td.textContent = data.price === data[val] ? `$ ${data[val]} ` : data[val];
                    })
                }
                createElement("td",tr , td => {
                    td.className += "edit text-info"
                    createElement("i",td, i => {
                        i.className += "fas fa-edit btnedit"
                        i.setAttribute("data-id",data.product_id)
                        i.onclick = btnEdit;
                    })
                })
                createElement("td",tr , td => {
                    td.className += "delete text-dangerous"
                    createElement("i",td, i => {
                        i.className += "fas fa-trash-alt btndel"
                        i.setAttribute("data-id",data.product_id)
                        i.onclick = btnDel;
                    })
                })
            });
        }
    })
}

const btnEdit = (event) => {
    let id = parseInt(event.target.dataset.id);
    console.log(id)
    db.products.get(id, data => {
        productId.value = id;
        productName.value = data.product_name || "";
        productPrice.value = data.product_price || "";
        productSeller.value = data.product_seller || "";
    })
}

// update record
const updateRecord = (event) => {
    let id = parseInt(productId.value) || 0;
    console.log(id)
    if(id){
        db.products.update(id, {
            product_name: productName.value,
            product_seller: productSeller.value,
            product_price: productPrice.value
        }).then((updated) => {
            let flag = updated ? true : false;
            let updateMsg = document.querySelector('.update-msg');
            displayMsg(flag, updateMsg)
        })
    }
    productName.value  = product_seller.value = "";
    product_price.value = 0;
}

const deleteRecord = () => {
    db.delete()
    //after delete all record we need to make database again
    db = productDB("productDB", {
        products: '++id, product_name, product_seller, product_price'
    })
    db.open()
    readRecord();
    let deleteMsg = document.querySelector('.delete-msg');
    displayMsg(true, deleteMsg)
}
// delete record by id
const btnDel = (event) => {
    let id = parseInt(event.target.dataset.id);
    ldb.products.delete(id)
    readRecord()
}


const displayMsg = (flag, element) => {
    if(flag){
        element.className += "movedown";
        
        setTimeout( 
            () => {
                element.classList.forEach(classname => {
                    if(classname == "movedown"){
                        element.classList.remove("movedown")
                    }
                });
            },4000);
    }
 
}
// button events
btnInsert.onclick = insertRecord;
btnRead.onclick = readRecord;
btnUpdate.onclick = updateRecord;
btnDelete.onclick = deleteRecord
