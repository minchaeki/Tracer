const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TraceabilityModule", (m) => {
  const contract = m.contract("Traceability");

  return { contract };
});