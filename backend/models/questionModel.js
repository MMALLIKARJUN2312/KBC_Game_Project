const db = require('../config/db');

const getAllQuestions = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM questions', (error, results) => {
            if (error) {
                return reject(error);
            } else{
                resolve(results);
            };
        });
    });
};

module.exports = {getAllQuestions};