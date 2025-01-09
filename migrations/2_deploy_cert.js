// 2_deploy_cert.js
const Cert = artifacts.require("Cert");

module.exports = async function(deployer) {
  try {
    await deployer.deploy(Cert);
  } catch (error) {
    console.error("Cert deployment failed:", error);
    throw error;
  }
};