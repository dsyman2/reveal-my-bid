var RevelationAgreement = artifacts.require("./RevelationAgreement.sol");
var web3 = RevelationAgreement.web3;
contract('', function(accounts) {
    it("When a new RevelationAgreement is created", function(done) {
      RevelationAgreement.deployed().then(function(instance) {
        return instance.revelationFee.call();
      }).then(function(balance) {
        assert.equal(balance.valueOf(), web3.toWei(1, 'ether'), "THEN the revelation fee is submitted");
        done();
      });
    });
    it("WHEN the revealer submits the Revelation Failure Fine", function(done) {
      var agreement;
      RevelationAgreement.deployed().then(function(instance) {
        agreement = instance;
        return agreement.commitToReveal({value: web3.toWei(2, 'ether')});
      }).then(function(balance) {
        return agreement.revelationFailureFine.call();
      }).then(function(balance) {
        assert.equal(balance.valueOf(), web3.toWei(2, 'ether'), "THEN the Failure Fine is stored");
        return agreement.status.call();
      }).then(function(status) {
        assert.equal(status, 1, "THEN it should be in new state");
        done();
      });
    });
  });
