const {Client} = require('pg')
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
var express = require('express'),
    app = express();

app.use(express.static('dist'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// API Routes
// app.get('/blah', routeHandler);
app.get('/test', (req, res) => {
    res.send('congrats you got a response')
})

app.set('port', process.env.PORT || 4200);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
