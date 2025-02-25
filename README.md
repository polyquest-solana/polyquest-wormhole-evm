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

## Getting started
This repository is an EVM smart contract for users who make predictions to Polyquest's markets from BSC, Base, Arbitrum and Avanlanche. There are 2 user flow:
- Betting cross-chain: Users will interact with this smart contract, and the smart contract will send a cross-chain message to Polyquest by backend.
- Rewarding cross-chain: Users will call the backend to make a token transferring transaction from Solana. Then users will interact with this smart contract to redeem transferring message and collect the reward.

## Simulation

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

### Betting cross-chain
Users from BSC, Base, Arbitrum and Avalanche can normally access Polyquest by connecting their wallet.
Users can visit `/prediction` site to explore active markets.
Users can select a market and press `Vote` button to make their predictions. Their assets will be locked in this smart contract, and their cross-chain betting data will be transferred to Solana market.
### Receiving reward cross-chain
After a market success, users can visit `/myPage` site to look for their reward.
User can press `Claim` button to claim their reward from Solana.