const crypto = require("crypto");
const algorithm = "aes-256-cbc"; /// the algoithm to be used
const initVector = crypto.randomBytes(16); // initialize vector
const SecurityKey = process.env.SECURITY_KEY; // security key

exports.encryptData = (field) => {
  // 1- Create the cipher key
  const cipher = crypto.createCipheriv(algorithm, SecurityKey, initVector);
  // 2- Encrypt the data
  let encryptedData = cipher.update(field, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  const base64data = Buffer.from(initVector, "binary").toString("base64");

  let data = { encryptedData: encryptedData, iv: base64data };
  return data;
};

exports.decryptData = (encryptedField) => {
  const iv = Buffer.from(encryptedField.iv, "base64");

  const decipher = crypto.createDecipheriv(algorithm, SecurityKey, iv);

  let decryptedData = decipher.update(
    encryptedField.encryptedData,
    "hex",
    "utf-8"
  );
  decryptedData += decipher.final("utf8");

  return decryptedData;
};
