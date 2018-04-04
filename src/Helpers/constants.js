const MARKER_COLORS = ['#c5eefa', '#dcebfc', '#d1eeeb', '#cdf5d4', '#d9f5cb', '#eff1e0', '#efe1da', '#fcdede', '#fae1ca', '#faf4cf', '#dfdffa', '#fadff4', '#ede2f5', '#eee9e8'];

const ABI =
    [
        {
            "constant": true,
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "storageAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getFee",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "proposal",
                    "type": "uint256"
                }
            ],
            "name": "ProposalAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "votes",
                    "type": "uint256[]"
                }
            ],
            "name": "VotesRecorded",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "setStorageAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "val",
                    "type": "uint256"
                }
            ],
            "name": "setFee",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "proposal",
                    "type": "uint256"
                },
                {
                    "name": "votes",
                    "type": "uint256[]"
                }
            ],
            "name": "registerProposal",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }
    ];


const CONTRACT_ADDRESS = '0xAa82f3F0FF5026ABa2224A95A5f493ac4074BC06';


//0x94C6bf2D797C5adaAe6993b2EBad7aD72f9ff062

export {MARKER_COLORS, ABI, CONTRACT_ADDRESS};