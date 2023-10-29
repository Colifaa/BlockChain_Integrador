

require("dotenv").config();

const { 
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp,
  deploySCNoUp1,
} = require("../utils");
 

async function deployGoerli() {
    try {
        var relAddGoerli = "0x0E37f689d0F1C93dbb0E96d3D367Ad13fB18A24B"
        var _bbTokenAddress = "0x48910Ef5aae06159dd9eE091a8707f2C0Ecc5e9c"
        var _usdcTokenAddress = '0xe0038366BCF45F1ECcCaCa9eA2a01839f9c17A35'
        var  _uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
         
        const publicSaleAddress = await deploySCNoUp1("PublicSale", "PSALE", relAddGoerli,  _bbTokenAddress,
        _usdcTokenAddress,
        _uniswapRouterAddress);
        console.log("Contrato PublicSale desplegado en Goerli en la dirección:", publicSaleAddress);
    } catch (error) {
        console.error("Error al desplegar contratos en Goerli:", error);
        process.exit(1);
    }
}

// Llama a la función para desplegar los contratos en Goerli
deployGoerli().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});