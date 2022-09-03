const express = require('express');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);
app.use(blogRoutes);

app.use( (err , req , res , next) => {
  res.status(err.status).json({ error: true, message: err.message });
});


mongoose.connect('mongodb://localhost/blogDB')
.then(() => {
  app.listen(PORT , () => console.log(`DB Connection Successfull , Server Running at Port ${PORT}`));
})
.catch( err => console.log('DB Connection Failed'))


