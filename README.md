# Polyquest Wormhole smart contract

## Installation
Install all packages using
```
npm i -f
```
Then, create `.env` file with variables based on key-value pairs `.env.example` file
```
PUBLIC_KEY=
PRIVATE_KEY=
INFURA_KEY=
```

## Send betting message to Solana market program
Go to `scripts\sendMessageToSolana.ts` for messaging cross chain, adjust chainId and betting data.
```
const amount = 1000, marketKey = 1, answerKey = 1; // CHANGE
const sendChain = CHAINS.arbitrum_sepolia; // CHANGE
const bettingToken = "0x66a00769800E651E9DbbA384d2B41A45A9660912" // CHANGE
```
Then run:
```
npx hardhat run scripts\sendMessageToSolana.ts
```

## Receive reward token from Solana market program
Go to `scripts\rewardTokenFromSolana.ts` for transferring token cross chain, adjust chainId and simulated reward amount.
```
const recipientChain = CHAINS.base_sepolia; // CHANGE
const amount = 1_000_000; // CHANGE
```
Then run:
```
npx hardhat run scripts\rewardTokenFromSolana.ts
```