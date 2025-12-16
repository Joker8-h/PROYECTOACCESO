const express = require('express');
require('dotenv').config();
const app = express();
const authRoutes = require('./router/auth.routes');
const cors = require('cors');

app.use(cors(
    {
      origin: 'http://localhost:5173',
      methods: 'get,post,put,delete',
    }
));

app.use(express.json());
app.use('/api', authRoutes);


app.listen(3000, () => {
  console.log('servidor corriendo en puerto 3000');
});