# Frontend Interview

Implement either 1 of the 1-3 challenge assignments. Please fork this repo and share it with us.

# TypeScript Test

Candidate must use typescript to complete challenges below.

## General Expectations

For the assignments, we expect candidates to:

- **Write clean, readable, and efficient** TypeScript code.

- **Don’t overuse features** provided by the standard library.

- **Don’t overcomplicate** the code.

- Organize the code into **well-defined components** and adhere to TypeScript best practices, using strong typing and modular organization.

- Follow the **TypeScript coding guidelines** and aim to make the code scalable and maintainable.

- Use modern TypeScript features, including **generics and advanced typing** where necessary.

- **Apply performance optimization techniques** and, if relevant, use Web Workers or other methods to handle computationally heavy tasks in a frontend environment.

## Challenges Base Criteria

- **All challenges below must be dockerized**: Make sure the frontend can be run in a container environment.

- **All challenges below must implement** light / dark mode without any glitch when moving into different parts of the website / tab.

- **All challenges below must consider browser behavior**: Make sure the platform runs smoothly on multiple browsers (Firefox, Chrome, Microsoft Edge, Opera, etc).

- **All challenges below must have error handling**: Any unexpected result must be handled, this will include failed to fetch data or data fetch failed when mid-scrolling (Implement Retry Mechanism), and empty data handling.

## 1. Video Streaming Platform

Design and implement interface for video streaming platform which have core functionality and these criteria:

1. Search:

- Implement debouncing to avoid excessive requests.

2. Filter:

- Implement multiple filtering so the user can filter videos by category, uploader.

3. Sorting:

- Implement sort by views, likes, and upload date. \***\*For search, filter, and sorting, implement an infinite scroll feature or “Load More” feature.**

4. Must Have Feature:

- Implement pre-loading video (thumbnail).

- Add to favorites, retain the user data so it remains available for future visits unless the user clears the browser data.

## 2. E-Commerce Platform

Design and implement interface for E-Commerce platform which have core functionality and these criteria:

1. Search:

- Implement debouncing to avoid excessive requests.

2. Filter:

- Implement multiple filtering so the user can filter items by category, seller, price range, availability (Available or Out of Stock), and rating.

3. Sorting:

- Implement sort by price high to low or low to high, recommended seller, and rating.

  \***\*For search, filter, and sorting, implement an infinite scroll feature or “Load More” feature.**

4. Must Have Feature:

- Implement pre-loading video for products with video (pre-loading when the user lands on home page).

- Add to cart feature, retain the user data so it remains available for future visits unless the user clears the browser data.

## 3. Crypto Tracker Website

Design and implement interface for Crypto Tracker Website which have core functionality and these criteria:

1. Search:

- Implement debouncing to avoid excessive requests.

2. Filter:

- Implement multiple filtering so the user can filter crypto by category such as AI / Memes / Solana Eco / ETH Eco, market cap, top gainer, and top loser.

3. Sorting:

- Implement sort by ticker name, market cap, 24h volume, 1h% price change, 24h% price change, 7d% price change, and circulating supply.

  \***\*For search, filter, and sorting, implement an infinite scroll feature or “Load More” feature.**

4. Must Have Feature:

- Implement web scraping, give some list of crypto news.

- Add to favorites, retain the user data so it remains available for future visits unless the user clears the browser data.

# Cryptocurrency Test

1. Explain what you know about layer 1 and layer 2. Use ELI5 to explain this.

answer:

Think of layer 1 and layer 2 as a highway system:

Layer 1 is like the main highway (e.g., Ethereum, Bitcoin). It's where most traffic goes, and it's responsible for maintaining the core infrastructure, security, and functionality. However, it can get crowded, leading to slow speeds and high costs (gas fees).

Layer 2 is like an express lane built on top of the main highway. It helps handle extra traffic by processing transactions faster and more cheaply. Examples include Arbitrum and Optimism, which are designed to work alongside Ethereum, taking some of the load off the main highway.

answer:

What will happen?

Arbitrum and Ethereum Mainnet addresses are identical, but the networks are different. The funds might still reach the provided Ethereum Mainnet address; however, they won't appear on the Ethereum Mainnet since the transaction was broadcast on the Arbitrum network.

Possibilities for Exchange B as the receiver:

The deposit system of Exchange B detects the transaction on the Arbitrum network.
The funds are credited to the user's Arbitrum One balance in Exchange B.
The deposit system of Exchange B does not support cross-chain transaction detection.
The funds are not credited automatically, and the user may need to contact customer support for manual recovery.

How to display this in the frontend:

If the transaction is detected:
Show the user's balance updated in the Arbitrum One network wallet.
Notify the user: "Deposit received on Arbitrum One."

If the transaction is not detected:
Display an alert: "Deposit not detected. Please verify the network used for the transaction or contact support."

3. Explain this transaction hash, include the details.

   - https://mantlescan.xyz/tx/0xd43ce2aa598a75d9595a2c2779e5bf4b0375eef72a69c6d8e2b0bf5f676c66af

answer:

- Transaction Status: Whether it succeeded or failed.

- Sender and Receiver: The from address initiating the transaction and the to address receiving it.

- Gas Fees: The amount of gas used and the gas price set for this transaction.

- Network: It was executed on the Mantle network.

- Purpose: It could involve transferring tokens, executing a smart contract, or other actions.

A proper analysis requires viewing the transaction details directly via the provided link.

4. Explain about the funding fee on exchange, how it works, and how you will as a frontend displaying this to the user?

answer:

Funding Fee:
It's a periodic fee exchanged between traders in perpetual futures markets to maintain the contract's price close to the underlying asset's spot price.

How it works:

- Positive funding rate: Long traders pay short traders.
- Negative funding rate: Short traders pay long traders.
- The fee is calculated based on the notional value of the position and the funding rate at the time.

Frontend Display:

Before Funding:

- Show the current funding rate and countdown to the next funding event.
- Example: "Funding rate: +0.05% | Next in 4 hours."

After Funding:

- Show the amount debited or credited to the user's account with a clear explanation.
- Example: "Funding fee: -$12.50 (credited from long positions)."

5. What is network congestion? As a frontend, how will you display this to the user?

Network Congestion:
Network congestion occurs when there are too many transactions waiting to be processed, leading to delays and higher fees (gas fees) to prioritize transactions.

Frontend Display:

Alert Messages:
"The network is currently congested. Transactions might take longer to process."

Fee Estimation:
Provide a dynamic gas fee calculator or warning: "Current gas fee is high: ~50 Gwei."

Queue Status:
Show the user's transaction queue status: "Your transaction is pending (5th in the queue)."

answer:

6. Why do you want to work for Bitwyre?

I want to learn more about web3 and bitcoin and I think Bitwyre is the right place
