const crypto = require("crypto");

const key = Buffer.from(process.env.ENCRYPTION_KEY, "base64");
if (key.length !== 32) throw new Error("ENCRYPTION_KEY must be 32 bytes (base64-encoded)");

const encryptData = (data) => {
  const iv = crypto.randomBytes(12); // GCM usa 12 bytes
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);

  const authTag = cipher.getAuthTag();

  // Concatena tudo em uma única string base64
  const payload = Buffer.concat([iv, authTag, encrypted]).toString("base64");
  return payload;
};

const decryptData = (encryptedString) => {
  const data = Buffer.from(encryptedString, "base64");

  const iv = data.subarray(0, 12);
  const authTag = data.subarray(12, 28);
  const encrypted = data.subarray(28);

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return JSON.parse(decrypted.toString("utf8"));
};

const encryptPayload = (payload) => {
  const encrypted = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  return encrypted;
};

module.exports = { encryptData, decryptData, encryptPayload };
