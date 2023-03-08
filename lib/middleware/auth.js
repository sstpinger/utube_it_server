import UserModel from "../../lib/models/user.model";

const _canAuth = async ({ key, deviceId }) => {
  if (!rows.length) {
    throw new Error("DB is initializing, try again after 30 seconds");
  }

  if (!key || !deviceId) {
    throw new Error("Some parameters is missing");
  }

  const row = rows.find((e) => e.key === key);

  if (!row) {
    throw new Error("Key is not found");
  }

  if (!row.deviceId) {
    row.deviceId = deviceId;
    await row.save();
    console.log("New device is registered " + deviceId);
  }

  if (row.deviceId !== deviceId) {
    throw new Error("Device not matched with old");
  }

  if (!row.expireTime) {
    throw new Error("Expire time not included on device: " + deviceId);
  }

  const now = new Date().getTime();
  const expireTime = new Date(row.expireTime).getTime();

  if (expireTime < now) {
    throw new Error("Auth key is expired");
  }

  return true;
};

export const canAuth = async (...args) => {
  return _canAuth(...args);
};
