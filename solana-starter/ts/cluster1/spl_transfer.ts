import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { token } from "@coral-xyz/anchor/dist/cjs/utils";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("2VEkxsFAas5DbztKE5vGMnCL3gWNJkYWqJA51bitDhHE");

// Recipient address
// const to = new PublicKey("2Yc9AwAe1LmzEBt6rNtYAr7LbjWGNzSQobnZEUiNo879");
const to = new PublicKey("AbVh32GTzzBuUYQEgZ2LjpX17StgxN5aPzqaYaxbLvB4");
const token_decimals = 1_000_000n;

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const ataFrom = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`Your ata is: ${ataFrom.address.toBase58()}`);
    // Get the token account of the toWallet address, and if it does not exist, create it
    const ataTo = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );
    console.log(`Your ata is: ${ataTo.address.toBase58()}`);
    // Transfer the new token to the "toTokenAccount" we just created

    const transferToken = await transfer(
      connection,
      keypair,
      ataFrom.address,
      ataTo.address,
      keypair.publicKey,
      2_000_000n
    );

    console.log(transferToken);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
