// importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbmessages.js'
import Pusher from 'pusher'

// app config
const app = express();
const port = process.env.PORT || 9000;


const pusher = new Pusher({
  appId: "1100221",
  key: "b1cf0a7abbc2c975b4d2",
  secret: "fe8cb251259d68d36c1c",
  cluster: "us2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

//middlewares
app.use(express.json())


// DB config
const conn_url = 'mongodb+srv://admin:XoiJMYOtryKYcFKd@cluster0.q3qqu.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(conn_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//?????

// api routes
app.get('/', (req, res)=> res.status(200).send("hello world"));

app.get('/messages/sync', (req, res)=>{
    Messages.find((err, data)=> {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        } 
    });
});


app.post('/messages/new', (req, res)=>{
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data)=>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});



// listener
app.listen(port, ()=> console.log(`listening on localhost: ${port}`));
