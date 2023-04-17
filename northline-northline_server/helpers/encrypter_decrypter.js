// // crypto module
// const crypto = require("crypto");
// const algorithm = "aes-256-cbc";
//let iv = crypto.randomBytes(16);
// const Securitykey = crypto.randomBytes(32);

// exports.encrpyt = (field) => {
//   const secKey = Securitykey;
//   const cipher = crypto.createCipheriv(algorithm, secKey, initVector);

//   let encryptedData = cipher.update(field, "utf-8", "hex");

//   encryptedData += cipher.final("hex");

//   return encryptedData;
// };

// exports.decrypt = (field) => {
//   const secKey = Securitykey;
//   const decipher = crypto.createDecipheriv(algorithm, secKey, initVector);

//   let decryptedData = decipher.update(field, "hex", "utf-8");

//   decryptedData += decipher.final("utf8");

//   return decryptedData;
// };

//Checking the crypto module
const crypto = require("crypto");
const key = crypto.randomBytes(32);
const iv = "swaklrdvymvxop2l";
const Securitykey = crypto.randomBytes(32);
//Encrypting text
exports.encrypt = (text) => {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

// Decrypting text
exports.decrypt = (text) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Securitykey, iv);

  let decryptedData = decipher.update(text, "hex", "utf-8");

  decryptedData += decipher.final("utf8");

  return decryptedData;
};
