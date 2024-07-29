import mongoose from 'mongoose';

const connect_to_DB = async () => {
    try {
        const uri = 'mongodb+srv://samsonkaleti:Shyam%401234@blog.g32xtdy.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=blog';

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

export default connect_to_DB;
