const express = require('express');
const cookieParser = require('cookie-parser');

const aboutRouter = require('./routes/about');
const apiTestRouter = require('./routes/apiTest');
const peopleRouter = require('./routes/people');
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const defaultRouter = require('./routes/default');

const { logger } = require('./middleware/logger');

const app = express();
const port = 3000;

app.use(express.static('./methods-public'));
app.use('/', logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/about', aboutRouter);
app.use('/api/v1/test', apiTestRouter);
app.use('/api/v1/people', peopleRouter);
app.use('/api/v1/products', productRouter);
app.use(cookieParser());
app.use(['/logon', '/logoff', '/test'], authRouter);
app.use('*', defaultRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
