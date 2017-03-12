var RevelationAgreement = artifacts.require("./RevelationAgreement.sol");
//var AbstractENS = artifacts.require("./AbstractENS.sol");
var ENS = artifacts.require("./ENS.sol");


module.exports = function(deployer) {
  var node= ENS.web3.sha3("testname");
  console.log("'testname' node=", node);
  deployer.deploy(ENS).then(function() {
    return deployer.deploy(RevelationAgreement, ENS.address, node, {value: web3.toWei("1", "ether")});
  });

};
