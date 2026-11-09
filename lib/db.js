import mongoose from "mongoose";

const cache = global._mongoose || (global._mongoose = { conn: null, promise: null });

export async function connect() {
  if (cache.conn) return cache.conn;
  cache.promise ||= mongoose.connect(process.env.MONGODB_URI);
  cache.conn = await cache.promise;
  return cache.conn;
}
