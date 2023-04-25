const Notepad = artifacts.require("Notepad");

module.exports = function (deployer) {
  deployer.deploy(Notepad);
};
