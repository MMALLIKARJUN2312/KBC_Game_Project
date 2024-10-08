CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL
);

INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option) VALUES 
    ('World Health Day is observed on?', 'A. Apr 7', 'B. Mar 6', 'C. Mar 15', 'D. Apr 28', 'A'),
    ('Who is the author of the epic ''Meghdoot''?', 'A. Vishakhadatta', 'B. Panini', 'C. Banabhatta', 'D. Kalidas', 'D'),
    ('Which was the first newspaper to be published in India?', 'A. Bombay Samachar', 'B. Bengal Gazette', 'C. Madras Courier', 'D. Bombay Herald', 'B'),
    ('What is the name of highest civilian award in India?', 'A. Padma Bhushan', 'B. Padma Shri', 'C. Bharat Ratna', 'D. Padma Vibhushan', 'C'),
    ('Who was the first Indian to win a Nobel Prize?', 'A. C.V. Raman', 'B. Rabindranath Tagore', 'C. Amartya Sen', 'D. Hargobind Khorana', 'A');
