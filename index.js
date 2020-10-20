const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require('./middleware/Logger');
const members = require('./Members');
const app = express();

//hds middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Init middleware
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({extended:false}))

//home page route
app.get('/',(req,res) => res.render('index',{
    title: 'Member Apps',
    members
}));

app.use(express.static(path.join(__dirname,'public')))

//member api route
app.use('/api/members',require('./routes/api/members'));

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => console.log(`Server Started on Port ${PORT}`));