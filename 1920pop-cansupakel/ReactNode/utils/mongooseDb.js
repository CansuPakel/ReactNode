import mongoose from "mongoose";
const connection = {};

async function mongooseDb() {
  const db = await mongoose.connect(process.env.MONGODB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  connection.isConnected = db.connections[0].readyState;
}

export default mongooseDb;
