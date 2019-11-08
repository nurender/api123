// origin Set 
var cors = require('cors')

// origin function
origin = (app) =>{
    app.use(cors())
    app.options('*', cors());
    // origin.origindata(app)
    var allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'example.com');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }
}



module.exports = { origin };