const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const url = "mongodb+srv://poojana_s:Poojana2212@poojana.frp42.mongodb.net/MyBlog";

const App = express();
App.use(cors({origin: 'https://project-blog-app-mern.vercel.app', credentials: false}));
App.use(express.json());

mongoose.connect(url).then(()=>{
    console.log("Mongo DB Connected\nDatabase Created...");
}).catch((err)=>{
    console.log("Connection Failed...", err);
});

const UserSchema = new mongoose.Schema({username: { type: String, required: true, unique: true }, password: { type: String, required: true }});
const User = mongoose.model('User', UserSchema);

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    externalLink: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', BlogSchema);

App.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'UserName Already Exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: 'Registration Successful' });
    } catch {
        console.log("Registration Failed...");
    }
});

App.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User Not Found!' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid Password' });
        res.status(200).json({ message: 'Login Successful', username: user.username });
    } catch (err) {
        res.status(500).json({ message: 'Login Failed!' });
    }
});

App.post('/blogs/create', async (req, res) => {
    const { title, content, author, category, externalLink } = req.body;
    if (!title || !content || !author || !category) return res.status(400).json({ message: 'Please fill all the required fields' });
    try {
        const newBlog = new Blog({ title, content, author, category, externalLink });
        await newBlog.save();
        res.status(200).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog, please try again' });
    }
});

App.get('/blogs/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs' });
    }
});

App.get('/myblogs/:author', async (req, res) => {
    const { author } = req.params;
    try {
        const blogs = await Blog.find({ author });
        if (blogs.length === 0) return res.status(404).json({ message: "No blogs found for this author." });
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs' });
    }
});

App.delete('/myblogs/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog" });
    }
});

App.put('/myblogs/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, category, externalLink } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, category, externalLink }, { new: true });
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog' });
    }
});

const port = process.env.PORT || 8000; 
App.listen(port, () => {
    console.log("Server Started at port "+port+" successfully");
});
