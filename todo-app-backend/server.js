import express from 'express';
import todoRouter from './routes/todoRoutes.js'
import userRouter from './routes/userRoutes.js';
import passport from 'passport';
import initializePassport from './config/passport.js'
import session from 'express-session';
import cors from 'cors'
const app = express()

const port = 3000

app.use(cors({
    origin: 'http://localhost:5173', // Your React app URL
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret:'top_secret_shit',
    resave: false,
    saveUninitialized: false
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('Hello fuckers!')
});

app.post('/',(req,res) => {
    res.send('this is a  post reques')
});

app.use('/static', express.static('public'))


app.use('/todo',todoRouter)
app.use('/auth',userRouter)

app.listen(port,() => {
    console.log('i am listening on port' + port);
})

