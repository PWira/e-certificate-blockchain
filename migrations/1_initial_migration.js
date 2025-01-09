// 1_initial_migration.js
const Migrations = artifacts.require("Migrations");

module.exports = async function(deployer) {
  try {
    await deployer.deploy(Migrations);
  } catch (error) {
    console.error("Migration deployment failed:", error);
    throw error;
  }
};