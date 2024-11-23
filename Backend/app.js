const express = require('express');

const router = require('./router/routes.js')
const authRouter = require('./router/authRoutes.js')
const complaintRouter = require('./router/complaintRoutes.js');
const connectionRouter = require('./router/connection.js');
const reportsRouter = require('./router/reportsRoutes.js')
const workerRouter = require('./router/workers.js');

const databaseConnect = require('./config/databaseConfig.js')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
databaseConnect();

app.use('/api', router);
app.use('/auth', authRouter);
app.use('/complaints', complaintRouter);
app.use('/connection', connectionRouter);
app.use('/reports', reportsRouter);
app.use('/workers', workerRouter);

app.use('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Sucessfully connected"
    });
})

module.exports = app;