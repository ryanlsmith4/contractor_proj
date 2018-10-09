const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor_proj');
const bodyParser = require('body-parser');

//This I required after the app = express()
// But before all other routes because it parses the data
app.use(bodyParser.urlencoded({ extended: true}));

//Here I am creating a model for the Blogs in the DB
const Blog = mongoose.model('Blog', {
    title: String,
    description: String,
    blogTitle: String,
    dropDown: Number,
})
// reviews is blogs
// let blogs = [
//     { title: "What's America Thinking?", newsArticle: "Trumps does somthing stupid"},
//     { title: "Today was a sad day.", newsArticle: "kavanugh is terrible"},
//     { title: "Today in San Francisco", newsArticle: "There was a strike"}
// ]

// Create New database object for a blog
app.post('/blogs', (req, res) => {
    Blog.create(req.body).then((blog) => {
        console.log(blog);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/blogs', (req, res) => {
    res.render('blogs-index', {})
})

// Route for a new Blog
app.get('/blogs/new', (req, res) => {
    res.render('blogs-new', {});
})

// console.log(Blog);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    Blog.find()
      .then(blogs => {
        res.render('blogs-index', { blogs: blogs})
    })
    .catch(err => {
        console.log(err);
    })
})



app.listen(3000, () => {
    console.log('App Listening on port 3000');
});
