require("dotenv").config();

const { 
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp1,
  deploySCNoUp
} = require("../utils");


async function deployMumbai() {
  try {
    // Dirección del relayer en Goerli
    var relAddMumbai = "0x0E37f689d0F1C93dbb0E96d3D367Ad13fB18A24B";

    // Define name y symbol para el contrato CuyCollectionNft
    var _name = "CuyCollectionNft"; // Nombre del contrato
    var _symbol = "CUYNFT";
    var _bbtknContract ='0x48910Ef5aae06159dd9eE091a8707f2C0Ecc5e9c';

    // Despliega el contrato CuyCollectionNft en Mumbai utilizando deploySCNoUp
    const CuyCollectionNftAddress = await deploySCNoUp1(
      "CuyCollectionNft", // Nombre del contrato
      _name, _symbol, _bbtknContract, relAddMumbai// Argumentos del constructor como un arreglo
    );

    console.log("Contrato CuyCollectionNft desplegado en Mumbai en la dirección:", CuyCollectionNftAddress);

    // Verifica el contrato en Mumbai si es necesario
     await verify(CuyCollectionNftAddress.target, "CuyCollectionNft");
    
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