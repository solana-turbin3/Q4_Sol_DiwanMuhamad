import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solvote } from "../target/types/solvote";
import assert from "assert";

describe("Solvote", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.Solvote as Program<Solvote>;

  it("Initialize Poll", async () => {
    const proposal = anchor.web3.Keypair.generate();
    await program.methods
      .initializeVotePoll("Vote Poll 1", "Vote Poll")
      .accounts({
        votePollAccount: proposal.publicKey,
        signer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .signers([proposal])
      .rpc();

    const account = await program.account.votePoll.fetch(proposal.publicKey);
    assert.equal(account.title, "Vote Poll");
  });

  it("Votes", async () => {
    const proposal = anchor.web3.Keypair.generate();
    const voter = anchor.web3.Keypair.generate();

    await program.methods
      .initializeVotePoll("Vote Poll 2", "Vote 2")
      .accounts({
        votePollAccount: proposal.publicKey,
        signer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .signers([proposal])
      .rpc();

    await program.methods
      .vote(true)
      .accounts({
        votePollAccount: proposal.publicKey,
        voter: voter.publicKey,
        signer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .signers([voter])
      .rpc();

    const account = await program.account.votePoll.fetch(proposal.publicKey);
    assert.equal(account.voteUp, 1);
  });
});
