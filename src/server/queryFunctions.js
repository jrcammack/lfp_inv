function enterElectronicsItem(requestContent) {
  let sql = "";
}

function enterBulkItems(reqData) {
  let i = 1;
  let sql =
    "INSERT INTO product(product_sku, sub_category_id, shipment_id, has_details) VALUES ";
  let valuesTxt = "";
  for (let j = 1; j <= reqData.skuList.length; j++) {
    valuesTxt +=
      "($" +
      i +
      ", " +
      "$" +
      (i + 1) +
      ", " +
      "$" +
      (i + 2) +
      ", " +
      "$" +
      (i + 3) +
      ")";
    if (j + 1 > reqData.skuList.length) {
      valuesTxt += ";";
    } else {
      valuesTxt += ", ";
    }
    i += 4;
  }
  return sql + valuesTxt;
}

function editItem(reqBody, prodDetailsToUpdate) {
  let sqlTxtComplete = "";

  for (let [key, value] of prodDetailsToUpdate) {
    sqlTxt1 =
      "INSERT INTO product_detail (product_sku, detail_id, detail_value)\n" +
      "VALUES ";

    sqlTxt2 =
      "ON CONFLICT (product_sku, detail_id) DO UPDATE\n" +
      "SET detail_value = '";

    if (key == "sku" || key == "shipment") {
      continue;
    } else {
      sqlTxt1 +=
        "('" +
        prodDetailsToUpdate.get("sku") +
        "', " +
        key +
        ", '" +
        value +
        "')\n";

      sqlTxt2 +=
        value +
        "'\n" +
        "WHERE product_detail.product_sku = '" +
        prodDetailsToUpdate.get("sku") +
        "'\n" +
        "AND product_detail.detail_id = " +
        key +
        ";\n\n";

      sqlTxtComplete += sqlTxt1 + sqlTxt2;
    }
  }

  return sqlTxtComplete;
}

function getDetailTypesSql() {
  sql = "SELECT * FROM detail_type;";
  return sql;
}

module.exports = {
  enterElectronicsItem,
  enterBulkItems,
  editItem,
  getDetailTypesSql,
};
