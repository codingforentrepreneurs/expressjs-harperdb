import fetch, {Headers} from 'node-fetch';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Define Connection Details
const DB_URL = process.env.HARPERDB_URL;
const DB_PASS = process.env.HARPERDB_PW;
const DB_USER = process.env.HARPERDB_USER;

const getAuthToken = () => {
    // Get the HarperDB username and password from the environment variables
    if (!DB_URL || !DB_PASS || !DB_USER) {
        console.log('Error: .env variables are undefined or not setup correctly.');
        throw 'Internal server error';
      }
    // Convert the username and password to base64
    const auth = Buffer.from(`${DB_USER}:${DB_PASS}`).toString('base64')
    return auth;
}

const client = async (data, method) => {
  // A database client method that takes an object of data and a method (GET, POST, PUT, DELETE) then sends it to our
  // HarperDB instance and returns the result.
  const authString = getAuthToken()
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Basic ${authString}`);
  const jsonBodyContent = JSON.stringify(data);
  const requestOptions = {
    method: method ? method : 'POST',
    headers: myHeaders,
    body: jsonBodyContent,
    redirect: 'follow',
    rejectUnauthorized: false,
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return result;
};

export default client
