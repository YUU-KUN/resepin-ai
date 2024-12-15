const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: async (queryInterface) => {
        const hashedPassword = await bcrypt.hash('password123', 10);
        return queryInterface.bulkInsert('Users', [{
            id: uuidv4(),
            username: 'testuser',
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
