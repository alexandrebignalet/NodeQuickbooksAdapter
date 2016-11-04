'use strict';

import express      from 'express'
import bodyParser   from 'body-parser'
import morgan       from 'morgan'
import session      from 'express-session'
import cors         from 'cors'

import config       from './config'
import routes       from './routes'

const app = express()


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// init session
app.use(session({resave: false, saveUninitialized: false, secret: 'jfcjgjlg39780345332343435.234535()/&(R%'}))

// use morgan to log requests to the console
app.use(morgan('dev'))

// handle cors request
app.use(cors())

// Route loading
routes.map( (controller) => {
    app.use('/' + controller.name , require(controller.require))
} )

app.listen(config.env.port)
console.log('WebServer listening on http://localhost:' + config.env.port)