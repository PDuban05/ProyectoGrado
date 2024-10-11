const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library for token handling
const crypto = require("crypto"); // Importing the crypto module for cryptographic operations
const fs = require("fs"); // Importing the filesystem module to interact with the file system
const path = require("path"); // Importing the path module for handling file paths
const multer = require("multer"); // Importing multer for handling file uploads

// Function to check if the token structure is valid
const isValidTokenStructure = (token) => {
  try {
    // Decode the token to check its structure
    const decoded = jwt.decode(token, { complete: true });
    // Check if the decoded token has both header and payload
    return decoded && decoded.header && decoded.payload;
  } catch (e) {
    return false; // If an error occurs, return false indicating an invalid structure
  }
};

// Function to generate a 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate and return a random 6-digit code
};

// Function to encrypt an ID using a public key
function encryptId(id, publicKey) {
  const buffer = Buffer.from(id, "utf8"); // Convert the ID to a buffer
  const encrypted = crypto.publicEncrypt(publicKey, buffer); // Encrypt the buffer with the public key
  return encrypted.toString("base64"); // Return the encrypted data as a base64 string
}

// Function to decrypt an encrypted ID using a private key
function decryptId(encryptedId, privateKey) {
  const buffer = Buffer.from(encryptedId, "base64"); // Convert the encrypted ID back to a buffer
  const decrypted = crypto.privateDecrypt(privateKey, buffer); // Decrypt the buffer with the private key
  return decrypted.toString("utf8"); // Return the decrypted ID as a UTF-8 string
}

// Function to generate a pair of RSA keys (public and private)
function generateKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // Size of the key in bits
    publicKeyEncoding: {
      type: "spki", // Structure of the public key
      format: "pem", // PEM format for the key
    },
    privateKeyEncoding: {
      type: "pkcs8", // Structure of the private key
      format: "pem", // PEM format for the key
    },
  });

  return { publicKey, privateKey }; // Return the generated public and private keys
}

// Function to get a pair of RSA keys
function getKeys() {
  return generateKeys(); // Call generateKeys and return the keys
}

// Configuring storage for file uploads using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.user_id; // Get the user_id from the URL parameters
    const type = req.params.type; // Get the type (profile or campaign) from the URL parameters

    // Validate that the type is valid (either profile or campaign)
    if (!["profile", "campaign"].includes(type)) {
      return cb(new Error("Invalid folder type"), null); // Return an error if the type is invalid
    }

    // Create the folder path based on the user_id and the type
    const folderPath = path.join(__dirname, `../uploads/${userId}_${type}`);

    // Check if the folder exists; if not, create it
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
    }

    // Define the final destination for the uploaded file
    cb(null, folderPath); // Callback with the folder path
  },
  filename: function (req, file, cb) {
    // Assign the filename for the uploaded file
    cb(null, "uploaded_file" + path.extname(file.originalname)); // Change "uploaded_file" as needed
  },
});


// Exporting functions and storage configuration for use in other modules
module.exports = {
  isValidTokenStructure,
  generateVerificationCode,
  generateKeys,
  getKeys,
  decryptId,
  encryptId,
  storage,
};
