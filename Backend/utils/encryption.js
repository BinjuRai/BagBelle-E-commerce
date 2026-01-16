const CryptoJS = require("crypto-js");

// Get encryption key from environment variable
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  console.error("⚠️  WARNING: ENCRYPTION_KEY not set in .env file!");
}

/**
 * Encrypt sensitive data
 * @param {string} data - Plain text to encrypt
 * @returns {string} - Encrypted data
 */
exports.encrypt = (data) => {
  if (!data) return null;
  
  try {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
};

/**
 * Decrypt sensitive data
 * @param {string} encryptedData - Encrypted text
 * @returns {string} - Decrypted plain text
 */
exports.decrypt = (encryptedData) => {
  if (!encryptedData) return null;
  
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
};

/**
 * Encrypt an object's fields
 * @param {object} obj - Object with fields to encrypt
 * @param {array} fields - Array of field names to encrypt
 * @returns {object} - Object with encrypted fields
 */
exports.encryptFields = (obj, fields) => {
  const encrypted = { ...obj };
  
  fields.forEach(field => {
    if (encrypted[field]) {
      encrypted[field] = exports.encrypt(encrypted[field]);
    }
  });
  
  return encrypted;
};

/**
 * Decrypt an object's fields
 * @param {object} obj - Object with encrypted fields
 * @param {array} fields - Array of field names to decrypt
 * @returns {object} - Object with decrypted fields
 */
exports.decryptFields = (obj, fields) => {
  const decrypted = { ...obj };
  
  fields.forEach(field => {
    if (decrypted[field]) {
      decrypted[field] = exports.decrypt(decrypted[field]);
    }
  });
  
  return decrypted;
};