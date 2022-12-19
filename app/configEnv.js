import path from 'path';
import dotenv from 'dotenv';

// Load the current file's directory
const baseDir = path.basename(import.meta.url);

// Define the absolute path to the .env file in the root project directory
const envFilePath = path.resolve(path.dirname(baseDir), '.env');

// Load the Environment Variables from the .env file in the root project directory
dotenv.config({ path: envFilePath})
