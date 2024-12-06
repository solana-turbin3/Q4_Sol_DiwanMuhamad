// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolvoteIDL from '../target/idl/solvote.json'
import type { Solvote } from '../target/types/solvote'

// Re-export the generated IDL and type
export { Solvote, SolvoteIDL }

// The programId is imported from the program IDL.
export const SOLVOTE_PROGRAM_ID = new PublicKey(SolvoteIDL.address)

// This is a helper function to get the Solvote Anchor program.
export function getSolvoteProgram(provider: AnchorProvider) {
  return new Program(SolvoteIDL as Solvote, provider)
}

// This is a helper function to get the program ID for the Solvote program depending on the cluster.
export function getSolvoteProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solvote program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return SOLVOTE_PROGRAM_ID
  }
}
