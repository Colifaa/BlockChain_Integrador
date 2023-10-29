
require("dotenv").config();

const { 
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp,
  deploySCNoUp1
} = require("../utils");

/* const { getRootFromMT } = require("../utils/merkleTree");
var MINTER_ROLE = getRole("MINTER_ROLE");
var BURNER_ROLE = getRole("BURNER_ROLE"); */


async function deployGoerli() {
  try {
    var relAddGoerli = "0x0E37f689d0F1C93dbb0E96d3D367Ad13fB18A24B"; 

 


 // Despliega el contrato USDCoin en Goerli utilizando deploySC
 const USDCoinAddress = await deploySCNoUp1(
  "USDCoin", "USDC", 
   relAddGoerli);
 console.log("Contrato USDCoin desplegado en Goerli en la dirección:", USDCoinAddress);




 await verify(USDCoinAddress, "USDCoin");
} catch (error) {
 console.error("Error al desplegar contratos en Goerli:", error);
 process.exit(1);
}
}

// Llama a la función para desplegar los contratos en Goerli
deployGoerli()
.catch((error) => {
 console.error(error);
 process.exitCode = 1;
});