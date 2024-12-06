/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solvote.json`.
 */
export type Solvote = {
  "address": "AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ",
  "metadata": {
    "name": "solvote",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializeVotePoll",
      "discriminator": [
        78,
        207,
        143,
        181,
        32,
        103,
        124,
        238
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "votePollAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "vote",
      "discriminator": [
        227,
        110,
        155,
        23,
        136,
        126,
        172,
        25
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "votePollAccount",
          "writable": true
        },
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "istrue",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "votePoll",
      "discriminator": [
        94,
        22,
        115,
        63,
        2,
        122,
        218,
        66
      ]
    },
    {
      "name": "voter",
      "discriminator": [
        241,
        93,
        35,
        191,
        254,
        147,
        17,
        202
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "alreadyVoted",
      "msg": "You have already voted on this poll."
    }
  ],
  "types": [
    {
      "name": "votePoll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "voteUp",
            "type": "u64"
          },
          {
            "name": "voteDown",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "voter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voterName",
            "type": "string"
          },
          {
            "name": "hasVoted",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
