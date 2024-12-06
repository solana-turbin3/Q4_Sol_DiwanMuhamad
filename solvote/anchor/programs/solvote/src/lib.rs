use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod solvote {
    use super::*;

    pub fn initialize_vote_poll(
      ctx: Context<InitializeVotePoll>, 
      description: String,
      title: String
    ) -> Result<()> {
      ctx.accounts.vote_poll_account.title = title;
      ctx.accounts.vote_poll_account.description = description;
      ctx.accounts.vote_poll_account.vote_up = 0;
      ctx.accounts.vote_poll_account.vote_down = 0;
      Ok(())
    }

    pub fn vote(ctx: Context<Vote>, istrue: bool) -> Result<()> {
      let vote_poll = &mut ctx.accounts.vote_poll_account;
      let voter = &mut ctx.accounts.voter;

      require!(!voter.has_voted, CustomError::AlreadyVoted);

      if istrue {
        vote_poll.vote_up += 1;
      } else {
        vote_poll.vote_down += 1;
      }

      voter.has_voted = true;

      Ok(())
    }

}

#[derive(Accounts)]
pub struct InitializeVotePoll<'info> {
  #[account(mut)]
  pub signer: Signer<'info>,
  #[account(
    init,
    payer = signer,
    space = 8 + VotePoll::INIT_SPACE,
  )]
  pub vote_poll_account: Account<'info, VotePoll>,
  pub system_program: Program<'info, System>
}

#[account]
#[derive(InitSpace)]
pub struct VotePoll {
  #[max_len(20)]
  pub title: String,
  #[max_len(100)]
  pub description: String,
  pub vote_up: u64,
  pub vote_down: u64
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub vote_poll_account: Account<'info, VotePoll>,

    #[account(
        init,
        payer = signer,
        space = 8 + Voter::INIT_SPACE)]
    pub voter: Account<'info, Voter>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Voter {
    #[max_len(32)]
    pub voter_name: String,
    pub has_voted: bool
}

#[error_code]
pub enum CustomError {
    #[msg("You have already voted on this poll.")]
    AlreadyVoted,
}