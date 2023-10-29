import { Contract, ethers } from "ethers";

import usdcTknAbi from "../artifacts/contracts/USDCoin.sol/USDCoin.json";
 import bbitesTokenAbi from "../artifacts/contracts/BBitesToken.sol/BBitesToken.json" 
 import publicSaleAbi from "../artifacts/contracts/PublicSale.sol/PublicSale.json"
import nftTknAbi from "../artifacts/contracts/CuyCollectionNft.sol/CuyCollectionNft.json"

// SUGERENCIA: vuelve a armar el MerkleTree en frontend
// Utiliza la libreria buffer
import buffer from "buffer/";
import walletAndIds from "../wallets/walletList";
import { MerkleTree } from "merkletreejs";
var Buffer = buffer.Buffer;
var merkleTree;

function hashToken(tokenId, account) {
  return Buffer.from(
    ethers
      .solidityPackedKeccak256(["uint256", "address"], [tokenId, account])
      .slice(2),
    "hex"
  );
}
function buildMerkleTree() {
  var elementosHasheados;
  merkleTree = new MerkleTree(elementosHasheados, ethers.keccak256, {
    sortPairs: true,
  });
}

var provider, signer, account;
var usdcTkContract, bbitesTknContract, pubSContract, nftContract;
var usdcAddress, bbitesTknAdd, pubSContractAdd;

function initSCsGoerli() {
  provider = new ethers.BrowserProvider(window.ethereum);

  console.log("USDC Address:", usdcAddress);
  console.log("BBites Token Address:", bbitesTknAdd);
  console.log("Public Sale Contract Address:", pubSContractAdd);
  

  usdcAddress = "0xe0038366BCF45F1ECcCaCa9eA2a01839f9c17A35";
  bbitesTknAdd = "0x48910Ef5aae06159dd9eE091a8707f2C0Ecc5e9c";
  pubSContractAdd = "0xFB688C8C253f734E96F63544F91bDbF0dCfa1c7b";

 signer = provider.getSigner(account);
  usdcTkContract = new ethers.Contract(usdcAddress, usdcTknAbi, signer);
  bbitesTknContract = new ethers.Contract(bbitesTknAdd, bbitesTokenAbi, signer);
  pubSContract = new ethers.Contract(pubSContractAdd, publicSaleAbi, signer);


  
  // Imprime los ABI para verificar si están cargados correctamente
  console.log("USDC ABI:", usdcTknAbi);
  console.log("BBites Token ABI:", bbitesTokenAbi);
  console.log("Public Sale ABI:", publicSaleAbi);
  
}

function initSCsMumbai() {
  provider = new ethers.BrowserProvider(window.ethereum);

  var nftAddress = "0x8Ed1b03957e308aE51A0FcE430C8a08062fB8A9f";

  nftContract = new ethers.Contract(nftAddress, nftTknAbi, signer);
}

  // Connect to Metamask
  var bttn = document.getElementById("connect");
  var walletIdEl = document.getElementById("walletId");
 
  bttn.addEventListener("click", async function () {
    if (window.ethereum) {
      [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Billetera metamask", account);
      walletIdEl.innerHTML = account;
 
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner(account);
      
 }
 });
  // USDC Balance - balanceOf
  var bttn = document.getElementById("usdcUpdate");
  bttn.addEventListener("click", async function () {
    var balance = await usdcTkContract.balanceOf(account);
    var balanceEl = document.getElementById("usdcBalance");
    balanceEl.innerHTML = ethers.formatUnits(balance, 6);
  });

  // Bbites token Balance - balanceOf

  // APPROVE BBTKN
  // bbitesTknContract.approve
  var bttn = document.getElementById("approveButtonBBTkn");

  // APPROVE USDC
  // usdcTkContract.approve
  var bttn = document.getElementById("approveButtonUSDC");

  // purchaseWithTokens
  var bttn = document.getElementById("purchaseButton");

  // purchaseWithUSDC
  var bttn = document.getElementById("purchaseButtonUSDC");

  // purchaseWithEtherAndId
  var bttn = document.getElementById("purchaseButtonEtherId");

  // send Ether
  var bttn = document.getElementById("sendEtherButton");

  // getPriceForId
  var bttn = document.getElementById("getPriceNftByIdBttn");

  // getProofs
  var bttn = document.getElementById("getProofsButtonId");
  bttn.addEventListener("click", async () => {
    var id;
    var address;
    var proofs = merkleTree.getHexProof(hashToken(id, address));
    navigator.clipboard.writeText(JSON.stringify(proofs));
  });

  // safeMintWhiteList
  var bttn = document.getElementById("safeMintWhiteListBttnId");
  // usar ethers.hexlify porque es un array de bytes
  // var proofs = document.getElementById("whiteListToInputProofsId").value;
  // proofs = JSON.parse(proofs).map(ethers.hexlify);

  // buyBack
  var bttn = document.getElementById("buyBackBttn");


function setUpEventsContracts() {
  var pubSList = document.getElementById("pubSList");
  // pubSContract - "PurchaseNftWithId"

  var bbitesListEl = document.getElementById("bbitesTList");
  // bbitesCListener - "Transfer"

  var nftList = document.getElementById("nftList");
  // nftCListener - "Transfer"

  var burnList = document.getElementById("burnList");
  // nftCListener - "Burn"
}

async function setUp() {
  window.ethereum.on("chainChanged", (chainId) => {
    window.location.reload();
  });

  initSCsGoerli();

   initSCsMumbai();

 setUpListeners();

  setUpEventsContracts();

  buildMerkleTree();
}

setUp()
  .then()
  .catch((e) => console.log(e));
