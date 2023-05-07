const queryFunctions = require("./src/server/queryFunctions.js");
const { Client } = require("pg");
var express = require("express"),
  app = express();
var bodyParser = require("body-parser"),
  jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
  connectionString:
    "postgres://rginsovtyjyftl:2985f824783ec0d74a99c632fa0f6af3341111c9b31955b9b4f2fea7f51631a4@ec2-34-202-127-5.compute-1.amazonaws.com:5432/d834vb4v3rn4aa", //process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

app.use(express.static("dist"));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// API Routes
// app.get('/blah', routeHandler);
app.get("/categories", (req, res) => {
  client.query("Select * from categories;").then((result) => {
    res.send(JSON.stringify(result));
  });
});

app.get("/subcategories", (req, res) => {
  client.query("Select * from sub_categories;").then((result) => {
    res.send(JSON.stringify(result));
  });
});

app.get("/shipments", (req, res) => {
  client.query("SELECT * from shipment;").then((result) => {
    res.send(JSON.stringify(result));
  });
});

app.get("/shipmentID", (req, res) => {
  client.query("SELECT MAX(shipment_id) from shipment;").then((result) => {
    res.send(JSON.stringify(result));
  });
});

app.post("/addShipment", jsonParser, (req, res) => {
  queryText =
    "INSERT INTO shipment(date_received, partner_id) VALUES ($1, $2);";
  values = [
    new Date(new Date(req.body.date).getTime() + 24 * 60 * 20 * 1000),
    req.body.partner,
  ];
  client.query(queryText, values).then((result) => {
    res.send(JSON.stringify(result));
  });
});

app.post("/bulkEntry", jsonParser, (req, res) => {
  let sql = queryFunctions.enterBulkItems(req.body);
  let values = [];
  for (sku of req.body.skuList) {
    values.push(sku);
    values.push(req.body.subCategoryContext.id);
    values.push(req.body.shipmentContext.shipmentID);
    values.push(false);
  }
  client.query(sql, values).then((result) => {
    res.send({ text: "got the data for bulk entry" });
  });
});

app.post("/searchProd", jsonParser, (req, res) => {
  let queryTxtForDetails =
    "SELECT p.product_sku, p.sub_category_id, p.shipment_id, p.chargerback_id, p.status_id, p.has_details, dt.detail_name, pd.detail_value" +
    " FROM product p, detail_type dt, product_detail pd" +
    " WHERE p.product_sku = pd.product_sku" +
    " AND pd.detail_id = dt.detail_id" +
    " AND p.product_sku = '" +
    req.body.search +
    "'" +
    " ORDER BY p.product_sku ASC;";

  let queryTxtForNoDetails =
    "SELECT * FROM product WHERE product_sku = '" + req.body.search + "'";

  client
    .query(
      "SELECT has_details FROM product WHERE product_sku = '" +
        req.body.search +
        "'"
    )
    .catch((error) => {
      console.log(
        "unable to determine if item: " + req.body.search + " has details"
      );
      console.log(error);
      res.send({ has_data: false, msg: error });
    })
    .then((result) => {
      if (result.rowCount == 1 && result.rows[0].has_details == true) {
        client
          .query(queryTxtForDetails)
          .catch((error) => {
            console.log(
              "there was an error finding the product with sku: " +
                req.body.search
            );
            console.log(error);
            res.send({ has_data: false, msg: error });
          })
          .then((result) => {
            res.send({ has_data: true, result: result });
          });
      } else if (result.rowCount == 1 && result.rows[0].has_details == false) {
        client
          .query(queryTxtForNoDetails)
          .catch((error) => {
            console.log(
              "there was an error finding the product with sku: " +
                req.body.search
            );
            console.log(error);
            res.send({ has_data: false, msg: error });
          })
          .then((result) => {
            res.send({ has_data: true, result: result });
          });
      } else {
        if (result.rowCount > 1) {
          res.send({
            msg: "more than one product was found for the submitted SKU",
          });
        } else if (result.rowCount == 0) {
          res.send({ has_data: false, msg: "no products were found" });
        } else {
          res.send({ has_data: false, msg: "something else happened" });
        }
      }
    });
});

app.get("/partners", (req, res) => {
  client.query("SELECT * from partners;").then((result) => {
    res.send(JSON.stringify(result));
  });
});

app.post("/enterItem", jsonParser, (req, res) => {
  console.log(
    "a new item entry has been requested for the following item and context: "
  );
  console.log(req.body);
  switch (req.body.subcategory.categoryID) {
    case 17:
      queryFunctions.enterElectronicsItem(req.body);
      break;
  }
  res.send(JSON.stringify("got your data"));
});

app.post("/editItem", jsonParser, (req, res) => {
  let query = queryFunctions.editItem(req.body);
});

app.set("port", process.env.PORT || 4201);

app.listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

/*
'SELECT p.product_sku, p.sub_category_id, p.shipment_id, p.chargerback_id, p.status_id, dt.detail_name, pd.detail_value
FROM product p, detail_type dt, product_detail pd
WHERE p.product_sku = pd.product_sku
AND pd.detail_id = dt.detail_id
AND p.product_sku = \'' + req.body.search + '\'
ORDER BY p.product_sku ASC;'
*/
