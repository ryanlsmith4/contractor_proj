const methodOverride = require('method-override');
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


//override with POST having ?_method=DELETE or ?_method=put
app.use(methodOverride('_method'));
// Show blogs unique route
app.get('/blogs/view/:id', (req, res) => {
    Blog.findById(req.params.id).then((blog) => {
        res.render('blogs-show', { blog: blog })
    }).catch((err) => {
        console.log(err.message);
    })
});



app.get('/blogs/view/:id/edit', (req, res) => {
    Blog.findById(req.params.id, function(err, blog) {
        res.render('blogs-edit', { blog: blog });
    })
})

// Create New database object for a blog
app.post('/blogs/view', (req, res) => {
    Blog.create(req.body).then((blog) => {
        console.log(blog);
        res.redirect(`/blogs/view/${blog._id}`); // redirect to blogs/:id
    }).catch((err) => {
        console.log(err.message);
    })
})


app.put('/blogs/view/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(blog => {
        res.redirect(`/blogs/view/${blog._id}`)
    })
    .catch(err => {
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
