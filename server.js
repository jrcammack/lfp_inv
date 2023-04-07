const {Client} = require('pg');
const client = new Client({
    connectionString: 'postgres://rginsovtyjyftl:2985f824783ec0d74a99c632fa0f6af3341111c9b31955b9b4f2fea7f51631a4@ec2-34-202-127-5.compute-1.amazonaws.com:5432/d834vb4v3rn4aa', //process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();
var express = require('express'),
    app = express();

app.use(express.static('dist'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    console.log('inside app.all');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// API Routes
// app.get('/blah', routeHandler);
app.get('/categories', (req, res) => {
    client.query('Select * from categories;').then(result => {res.send(JSON.stringify(result))});
})

app.get('/subcategories', (req, res) => {
    client.query('Select * from sub_categories;').then(result => {res.send(JSON.stringify(result))});
})

app.set('port', process.env.PORT || 4201);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
