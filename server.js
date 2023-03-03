// core dependencies
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

// Custom Dependencies
const { logger } = require('./src/utils/logger');
const { PORT } = require('./src/core/config');

//  app init
const app = express()

// milddleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(morgan('tiny'));


// middlewares
const user = require('./src/router/userRouter')
const post = require('./src/router/postRoute')
const comment = require('./src/router/commentRoute');
const { flutterResponse } = require('./src/integrations/flutterwave');
const mentorshipModel = require('./src/models/mentorshipModel');
const { BOOKING_STATUS } = require('./src/utils/constants');

app.use('/api/', user)
app.use('/api/', comment)
app.get('/flutterResponse', flutterResponse)
app.get("/api/mentor/comfirm", async (req,res) => {
    const {uniqueId} = req.query
    const mentorShip = await mentorshipModel.findOne({uniqueId})
    if (mentorShip) {
        await mentorshipModel.updateOne({uniqueId}, {status: BOOKING_STATUS.CONFIRMED})
        res.send({status: "Successful", msg: "Request Comfirmed"})
    }
})


require('./src/db/mongoose').db().then(()=> app.listen(PORT, () =>
logger.info(`Booking Backend Service Started on port ${PORT}`)
));