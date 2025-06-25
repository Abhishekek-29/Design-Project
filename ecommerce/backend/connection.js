const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rinsiya73:rinsi@cluster0.5u5qm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to mongodb'));
    
  

    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => console.log('Database connected successfully'))
      .catch((error) => console.error('Database connection error:', error));
    