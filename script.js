// import MetaMaskOnboarding from '/node_modules/@metamask/onboarding'
//1. connect metamask to site, get user's address
var account = null;
var contract = null;
const ABI = [
{
"inputs": [],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "approved",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "Approval",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }
],
"name": "ApprovalForAll",
"type": "event"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "approve",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }
],
"name": "OwnershipTransferred",
"type": "event"
},
{
"inputs": [],
"name": "renounceOwnership",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }
],
"name": "safeMint",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "safeTransferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "internalType": "bytes",
    "name": "_data",
    "type": "bytes"
  }
],
"name": "safeTransferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }
],
"name": "setApprovalForAll",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "Transfer",
"type": "event"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "transferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }
],
"name": "transferOwnership",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "withdraw",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }
],
"name": "balanceOf",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "getApproved",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }
],
"name": "isApprovedForAll",
"outputs": [
  {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "MAX_SUPPLY",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "mintRate",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "name",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "owner",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "ownerOf",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "bytes4",
    "name": "interfaceId",
    "type": "bytes4"
  }
],
"name": "supportsInterface",
"outputs": [
  {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "symbol",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }
],
"name": "tokenByIndex",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }
],
"name": "tokenOfOwnerByIndex",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "tokenURI",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "totalSupply",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
}
];
const ADDRESS = "0x4c93eDf225D2be8FcbA90A1dEF7A272391a17C4D";

(async () => {
  // const currentUrl = new URL(window.location.href)
  // const forwarderOrigin = currentUrl.hostname === 'localhost'
  //   ? 'http://localhost:8000'
  //   : undefined
  const mintButton = document.getElementById('mint');
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);

    contract = new web3.eth.Contract(ABI, ADDRESS);

    const onClickConnect = async () => {
        try {
          // Will open the MetaMask UI
          // You should disable this button while the request is pending!
          await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error(error);
        }
        checkStatus();
      };

    const checkStatus = async () => {
        var accounts = await web3.eth.getAccounts();
        account = accounts[0]
        if (accounts.length == 0){
            mintButton.innerText = 'Connect Wallet';
            mintButton.onclick = () => {
                onClickConnect();
              }
        } else {
            mintButton.innerText = 'Mint';
            mintButton.onclick = () => {
                contract.methods.safeMint(account).send({ from: account, value : "10000000000000000"});
              }
        }
    }

    checkStatus();

  }
})();
