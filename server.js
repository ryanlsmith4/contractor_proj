const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor_proj');

//Here I am creating a model for the Blogs in the DB
const Blog = mongoose.model('Blog', {
    title: String,
    blogTitle: String
})
// reviews is blogs
// let blogs = [
//     { title: "What's America Thinking?", newsArticle: "Trumps does somthing stupid"},
//     { title: "Today was a sad day.", newsArticle: "kavanugh is terrible"},
//     { title: "Today in San Francisco", newsArticle: "There was a strike"}
// ]
// console.log(Blog);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    Blog.find()
    .then(reviews => {
        res.render('blogs-index', { blogs: blogs})
    })
    .catch(err => {
        console.log(err);
    })
})



app.listen(3000, () => {
    console.log('App Listening on port 3000');
});
