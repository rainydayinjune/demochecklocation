const express = require('express');
var cors = require('cors')
require('dotenv/config');
const bodyParser = require('body-parser');
const path = require('path');
const errorHandler = require('./src/middlewares/error')

const app = express();

app.use(cors())

// Body parser
app.use(bodyParser.json());

// Set security headers
// app.use(helmet())

// Prevent XSS attacks
// app.use(xss())

// Rate limiting
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 100, // 10 mins
//     max: 100
// })
// app.use(limiter)

// Prevent http param pollution
// app.use(hpp())

// Enable CORS
// app.use(cors())

// Public static file
app.use(express.static('src/images/public'))
app.use(express.static('src/public'))

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Mount routes
require('./src/routers/routers')(app);

// Middleware error handler
app.use(errorHandler)

app.listen(process.env.PORT || '4000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
})

// const listEndpoints = require('express-list-endpoints');
// console.log(listEndpoints(app));