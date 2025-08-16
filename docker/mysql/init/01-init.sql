-- Initialize database for StudyJpa project
CREATE DATABASE IF NOT EXISTS studyjpa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user if not exists
CREATE USER IF NOT EXISTS 'jpauser'@'%' IDENTIFIED BY 'jpapassword';

-- Grant privileges
GRANT ALL PRIVILEGES ON studyjpa.* TO 'jpauser'@'%';
FLUSH PRIVILEGES;

-- Switch to the studyjpa database
USE studyjpa;

-- Example: Create a sample table (JPA will handle this, but this is for reference)
-- CREATE TABLE IF NOT EXISTS users (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(50) NOT NULL UNIQUE,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );