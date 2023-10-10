require("dotenv").config();

const { 
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp,
} = require("../utils");

const { getRootFromMT } = require("../utils/merkleTree");
var MINTER_ROLE = getRole("MINTER_ROLE");
var BURNER_ROLE = getRole("BURNER_ROLE");



async function deployMumbai() {
  try {
    // Dirección del relayer en Goerli
    var relAddMumbai = "0x0E37f689d0F1C93dbb0E96d3D367Ad13fB18A24B";

    // Define name y symbol para el contrato CuyCollectionNft
    var _name = "CuyCollectionNft"; // Nombre del contrato
    var _symbol = "CUYNFT";
    const _bbtknContract ='0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

    // Despliega el contrato CuyCollectionNft en Mumbai utilizando deploySCNoUp
    const CuyCollectionNftAddress = await deploySCNoUp(
      "CuyCollectionNft", // Nombre del contrato
      [_name, _symbol, _bbtknContract], relAddMumbai// Argumentos del constructor como un arreglo
    );

    console.log("Contrato CuyCollectionNft desplegado en Mumbai en la dirección:", CuyCollectionNftAddress);

    // Verifica el contrato en Mumbai si es necesario
    // await verify(CuyCollectionNftAddress.target, "CuyCollectionNft");
    
  } catch (error) {
    console.error("Error al desplegar contratos en Mumbai:", error);
    process.exit(1);
  }
}


// Llama a la función para desplegar los contratos en Mumbai
deployMumbai()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });