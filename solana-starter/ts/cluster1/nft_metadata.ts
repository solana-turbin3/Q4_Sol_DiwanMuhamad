import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const imageUri =
      "https://devnet.irys.xyz/FdUAUwkPXBbkcZkBt6TnGKciaS1YDLkTyAuh74ZRrP3";
    const metadata = {
      name: "NFT RUGGOD",
      symbol: "RG",
      description: "This rug is awesome.",
      image: imageUri,
      attributes: [
        { trait_type: "Awesomeness", value: "100" },
        { trait_type: "Rugness", value: "100" },
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: imageUri,
          },
        ],
      },
    };

    const uri = await umi.uploader.uploadJson(metadata);
    console.log(`Metadata JSON uploaded. URI: ${uri}`);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
