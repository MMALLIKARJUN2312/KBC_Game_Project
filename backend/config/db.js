const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mallik@MYSQL365',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');

    db.query('CREATE DATABASE IF NOT EXISTS kbc_game', (err) => {
        if (err) {
            console.error('Error creating database: ', err);
            return;
        }
        console.log('Database created or already exists');

        db.query('USE kbc_game', (err) => {
            if (err) {
                console.error('Error selecting database: ', err);
                return;
            }

            const createTableSQL = `
                CREATE TABLE IF NOT EXISTS questions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    question_text VARCHAR(255) NOT NULL UNIQUE,
                    option_a VARCHAR(255) NOT NULL,
                    option_b VARCHAR(255) NOT NULL,
                    option_c VARCHAR(255) NOT NULL,
                    option_d VARCHAR(255) NOT NULL,
                    correct_option CHAR(1) NOT NULL
                );
            `;

            db.query(createTableSQL, (err) => {
                if (err) {
                    console.error('Error creating questions table: ', err);
                    return;
                }
                console.log('Questions table created successfully');

                const insertQuestionsSQL = `
                    INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option) VALUES 
                    ('World Health Day is observed on?', 'A. Apr 7', 'B. Mar 6', 'C. Mar 15', 'D. Apr 28', 'A'),
                    ('Who is the author of the epic ''Meghdoot''?', 'A. Vishakhadatta', 'B. Panini', 'C. Banabhatta', 'D. Kalidas', 'D'),
                    ('Which was the first newspaper to be published in India?', 'A. Bombay Samachar', 'B. Bengal Gazette', 'C. Madras Courier', 'D. Bombay Herald', 'B'),
                    ('What is the name of highest civilian award in India?', 'A. Padma Bhushan', 'B. Padma Shri', 'C. Bharat Ratna', 'D. Padma Vibhushan', 'C'),
                    ('Who was the first Indian to win a Nobel Prize?', 'A. C.V. Raman', 'B. Rabindranath Tagore', 'C. Amartya Sen', 'D. Hargobind Khorana', 'A');
                `;

                db.query(insertQuestionsSQL, (err) => {
                    if (err) {
                        console.error('Error inserting data into questions table: ', err);
                        return;
                    }
                    console.log('Data inserted into questions table successfully');
                });
            });
        });
    });
});

module.exports = db;
