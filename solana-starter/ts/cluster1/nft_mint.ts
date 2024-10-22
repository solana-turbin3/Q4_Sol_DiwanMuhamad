import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
  const metadataUri =
    "https://devnet.irys.xyz/2fiF2nbW8DRKn8JvFvzNKapsNH7kUrwHwVCybc3vX2Ve";
  const tx = createNft(umi, {
    mint: mint,
    name: "NFT RUGGOD",
    symbol: "RG",
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(20.24),
  });

  const result = await tx.sendAndConfirm(umi);
  const sig = base58.encode(result.signature);
  console.log(
    `NFT created with mint account address ${mint.publicKey}. Transaction signature: ${sig}`
  );
})();
