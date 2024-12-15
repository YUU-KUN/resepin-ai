const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${HOST}:${PORT}`);
    });
});
