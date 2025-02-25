# Polyquest Wormhole smart contract

## Installation
Install all packages using
```
npm i -f
```
Then, create `.env` file with variables based on key-value pairs from `.env.example`
```
PUBLIC_KEY=
PRIVATE_KEY=
INFURA_KEY=
```

## BSC, Base, ARB, Avax Wormhole integration code

### Smart contract addresses
```
Wormhole integration BSC testnet: 0xA081972981013799A5fB5b573CaC6cc75Dc4F1Eb
Wormhole integration Base Sepolia: 0xEBbB9316B91D8dCEA5BcC472F9c43163F96A9007
Wormhole integration Arbitrum Sepolia: 0x6dFbA3394EE4Cf592c2aD72712DE9892F0aa1433
Wormhole integration Avalanche: 0x90a999c7c9e50ed9F46Eaf3a9f9996E166b040Be
```
For more addresses of each chain, go to `scripts\constant`

### Backend code
- Betting messaging backend in: `backend\BettingCrossChain`
- Token transferring backend in: `backend\RewardCrossChain`

### Frontend code
Not done yet.

## Test scripts

### Send betting message to Solana market program
Go to `scripts\sendMessageToSolana.ts` for messaging cross-chain simulation, adjust the chainId and betting data from the lines bellow if needed.
```
const amount = 1000, marketKey = 1, answerKey = 1; // CHANGE
const sendChain = CHAINS.arbitrum_sepolia; // CHANGE
const bettingToken = "0x66a00769800E651E9DbbA384d2B41A45A9660912" // CHANGE
```
Then run:
```
npx hardhat run scripts\sendMessageToSolana.ts
```
The betting cross-chain messaging's flow will be shown on the terminal.

### Receive reward token from Solana market program
Go to `scripts\rewardTokenFromSolana.ts` for transferring token cross-chain simulation, adjust chainId and simulated reward amount from the lines bellow if needed.
```
const recipientChain = CHAINS.base_sepolia; // CHANGE
const amount = 1_000_000; // CHANGE
```
Then run:
```
npx hardhat run scripts\rewardTokenFromSolana.ts
```
The token transfer's flow will be shown on the terminal.

## User guide

### Getting started
This repository is an EVM smart contract for users who make predictions to Polyquest's markets from BSC, Base, Arbitrum and Avanlanche. There are 2 user flow:
- Betting cross-chain: Users will interact with this smart contract, and the smart contract will send a cross-chain message to Polyquest by backend.
- Rewarding cross-chain: Users will call the backend to make a token transferring transaction from Solana. Then users will interact with this smart contract to redeem transferring message and collect the reward.

### Betting cross-chain
Users from BSC, Base, Arbitrum and Avalanche can normally access Polyquest by connecting their wallet.
Users can visit `/prediction` site to explore active markets.
Users can select a market and press `Vote` button to make their predictions. Their assets will be locked in this smart contract, and their cross-chain betting data will be transferred to Solana market.
### Receiving reward cross-chain
After a market success, users can visit `/myPage` site to look for their reward.
User can press `Claim` button to claim their reward from Solana.