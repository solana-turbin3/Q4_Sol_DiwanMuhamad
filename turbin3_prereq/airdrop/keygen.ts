const { Keypair } = require("@solana/web3.js");

// Generate a new keypair
let kp = Keypair.generate();

// Log the public key (Solana wallet address)
console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`);
