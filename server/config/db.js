const { Sequelize } = require("sequelize");

// PostgreSQL connection using transaction pooler (IPv4 compatible)
const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres.duszswfdwgttqenmoeww",
  process.env.DB_PASSWORD || "csphotography123ajay",
  {
    host: process.env.DB_HOST || "aws-0-ap-south-1.pooler.supabase.com",
    port: process.env.DB_PORT || 6543,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected Successfully via Transaction Pooler");
    console.log(
      `Database: ${process.env.DB_NAME || "postgres"} at ${
        process.env.DB_HOST || "aws-0-ap-south-1.pooler.supabase.com"
      }`
    );

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("Database synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
