pragma solidity ^0.4.4;

import "./ENS.sol";

contract RevelationAgreement {
  uint256 public constant EXPECTED_REVELATION_FEE= 1 ether;
  uint256 public constant EXPECTED_REVELATION_FAILURE_FINE= 2 ether;
  uint256 public revelationFee;
  uint256 public revelationFailureFine;
  uint256 public revelationStart;
  enum Statii {NEGOTIATE, ACTIVE, RESOLVED}
  Statii public status;
  AbstractENS public ens;
  bytes32 public nodeToReveal;

  /***
  @notice the name bidder has to pay a fee to the revealer
  ***/
  function RevelationAgreement(address _ens, bytes32 _node) payable{
    if (msg.value != EXPECTED_REVELATION_FEE) throw;
    revelationFee = msg.value;
    ens = ENS(_ens);
    nodeToReveal= _node;
  }

  function commitToReveal() payable{
    if (msg.value != EXPECTED_REVELATION_FAILURE_FINE) throw;
    revelationFailureFine = msg.value;
    status = Statii.ACTIVE;
  }


}
