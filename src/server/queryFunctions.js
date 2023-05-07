function enterElectronicsItem(requestContent) {
    let sql = ''
}

function enterBulkItems(reqData) {
    let i = 1;
    let sql = 'INSERT INTO product(product_sku, sub_category_id, shipment_id, has_details) VALUES ';
    let valuesTxt = '';
    for (let j = 1; j <= reqData.skuList.length; j++) {
        valuesTxt += '($' + i + ', ' + '$' + (i + 1) + ', ' + '$' + (i + 2) + ', ' + '$' + (i + 3) + ')';
        if ((j + 1) > reqData.skuList.length) {
            valuesTxt += ';'
        } else {
            valuesTxt += ', '
        }
        i += 4;
    }
    return sql + valuesTxt;
}

function editItem(reqBody) {
    let sql = '';
    switch(reqBody.prodContext.subCatContext.categoryID) {
        case 17:
        sql = 'UPDATE product_detail SET'    
    }

    return sql;
}

module.exports = { enterElectronicsItem, enterBulkItems, editItem };