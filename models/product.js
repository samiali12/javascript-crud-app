
const productDB = (dbName, tableName) =>{
    const db = new Dexie(dbName);
    db.version(1).stores(tableName);
    db.open()

    return db;
}

// insert function 

function bulkCreate(dbTable, data){
    let flag = isEmpty(data)
    if(flag){
        dbTable.bulkAdd([data])
    }
    return flag;
}

function isEmpty(data){
    for(let val in data){
        if (data[val] == ""){
            return false;
        }
    }
    return true;
}


// get data function 
const getData = (dbTable,func) => {
    let obj = {}
    let index = 0;
    dbTable.count((count) => {
        if(count){
            dbTable.each(table => (
                obj = {
                    product_id: table.id,
                    product_name: table.product_name,
                    product_price: table.product_price,
                    product_seller: table.product_seller,
                },
                func(obj,index++)
            ))
        }else{
            func(0)
        }
    })
}

// create Element
const createElement = (child, parent,func) => {
    const element = document.createElement(child)
    parent.appendChild(element);
    func(element)
}
export default productDB;
export{
    bulkCreate,
    getData,
    createElement
}