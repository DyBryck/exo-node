import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/exo-node";

export const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connecté à MongoDB pour les users");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB", err);
    process.exit(1);
  }
};
