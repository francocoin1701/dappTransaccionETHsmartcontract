const Migrations = artifacts.require("Migrations");
const francoToken = artifacts.require("francoToken")
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(francoToken, 'francoToken','FRT',8,2100000000000000)
};
