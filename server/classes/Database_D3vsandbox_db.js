// Import Sequelize
import Sequelize from "sequelize";
import InitSchema from "../models/schema_d3vsandbox_db";
import UserModel from "../models/D3vsandbox_db/UserModel";

// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info(
      "Database connected at: " +
        properties.d3vsandbox_db.host +
        ":" +
        properties.d3vsandbox_db.port +
        "//" +
        properties.d3vsandbox_db.user +
        "@" +
        properties.d3vsandbox_db.name
    );

    // Import schema
    InitSchema();

    await UserModel.createAdminUser();

  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");

    const sequelize = new Sequelize(
      properties.d3vsandbox_db.name,
      properties.d3vsandbox_db.user,
      properties.d3vsandbox_db.password,
      {
        host: properties.d3vsandbox_db.host,
        dialect: properties.d3vsandbox_db.dialect,
        port: properties.d3vsandbox_db.port,
        logging: false
      }
    );
    this.dbConnection_d3vsandbox_db = sequelize;

    try {
      await sequelize.sync();
    } catch (err) {
      // Catch error here
      Logger.error(`Failed connection to the DB`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_d3vsandbox_db;
  }
}

export default new Database();
