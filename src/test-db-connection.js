// test-db-connection.js
const connect_to_DB = require('./database');

const testConnection = async () => {
    try {
        await connect_to_DB();
        console.log('Database connection test successful');
    } catch (error) {
        console.error('Database connection test failed:', error);
    }
};

testConnection();
