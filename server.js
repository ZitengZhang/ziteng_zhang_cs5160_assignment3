const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

const postRouter = require('./routes/posts');
const userRouter = require('./routes/user');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb+srv://ziteng:zzt262620@zzproject3cluster.zh6hl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors({
    origin: '*',
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);


// react -> /home
//       -> /about
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});