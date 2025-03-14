/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/forecast_market.json`.
 */
export type ForecastMarket = {
  "address": "biKoNwBzPVkGnQoT18NPaA2V3iUxtyxr4Y1o87gkJfJ",
  "metadata": {
    "name": "forecastMarket",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addAnswerKeys",
      "discriminator": [
        89,
        115,
        155,
        223,
        0,
        19,
        17,
        59
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "answerAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  110,
                  115,
                  119,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "market_account.market_key",
                "account": "marketAccount"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "anwserKeys",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "addForeignEmitter",
      "discriminator": [
        205,
        114,
        116,
        141,
        182,
        104,
        230,
        9
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "emitterAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  114,
                  101,
                  105,
                  103,
                  110,
                  95,
                  101,
                  109,
                  105,
                  116,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "chain"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "chain",
          "type": "u16"
        },
        {
          "name": "address",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "adjournMarket",
      "discriminator": [
        122,
        223,
        248,
        29,
        26,
        4,
        248,
        39
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "approveMarket",
      "discriminator": [
        195,
        83,
        73,
        224,
        150,
        237,
        150,
        5
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "bet",
      "discriminator": [
        94,
        203,
        166,
        126,
        20,
        243,
        169,
        82
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "betMint",
          "writable": true
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketAccount"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "betMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "answerAccount",
          "writable": true
        },
        {
          "name": "betAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "voter"
              },
              {
                "kind": "account",
                "path": "market_account.market_key",
                "account": "marketAccount"
              },
              {
                "kind": "arg",
                "path": "answerKey"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "anwserKey",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "betCrossChain",
      "discriminator": [
        231,
        36,
        13,
        188,
        199,
        93,
        185,
        84
      ],
      "accounts": [
        {
          "name": "polyquestOwner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "answerAccount",
          "writable": true
        },
        {
          "name": "wormholeProgram",
          "address": "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5"
        },
        {
          "name": "posted",
          "docs": [
            "Verified Wormhole message account. The Wormhole program verified",
            "signatures and posted the account data here. Read-only."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  80,
                  111,
                  115,
                  116,
                  101,
                  100,
                  86,
                  65,
                  65
                ]
              },
              {
                "kind": "arg",
                "path": "vaaHash"
              }
            ]
          }
        },
        {
          "name": "betCrossChainAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  95,
                  99,
                  114,
                  111,
                  115,
                  115,
                  95,
                  99,
                  104,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "posted"
              },
              {
                "kind": "account",
                "path": "market_account.market_key",
                "account": "marketAccount"
              },
              {
                "kind": "arg",
                "path": "answerKey"
              },
              {
                "kind": "arg",
                "path": "voterAddress"
              }
            ]
          }
        },
        {
          "name": "foreignEmitter",
          "docs": [
            "Foreign emitter account. The posted message's `emitter_address` must",
            "agree with the one we have registered for this message's `emitter_chain`",
            "(chain ID). Read-only."
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "vaaHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "voter",
          "type": {
            "array": [
              "u8",
              20
            ]
          }
        },
        {
          "name": "answerKey",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimCrossChain",
      "discriminator": [
        216,
        51,
        166,
        225,
        222,
        46,
        13,
        163
      ],
      "accounts": [
        {
          "name": "polyquestOwner",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "docs": [
            "Sender Config account. Acts as the signer for the Token Bridge token",
            "transfer. Read-only."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  101,
                  110,
                  100,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "betMint",
          "writable": true
        },
        {
          "name": "rewardMint",
          "writable": true
        },
        {
          "name": "vaultBetTokenAccount",
          "writable": true
        },
        {
          "name": "vaultRewardTokenAccount",
          "writable": true
        },
        {
          "name": "tmpTokenAccount",
          "docs": [
            "Program's temporary token account. This account is created before the",
            "instruction is invoked to temporarily take custody of the payer's",
            "tokens. When the tokens are finally bridged out, the token account",
            "will have zero balance and can be closed."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  109,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "betMint"
              }
            ]
          }
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "betAccount",
          "writable": true
        },
        {
          "name": "answerAccount",
          "writable": true
        },
        {
          "name": "foreignEmitter",
          "docs": [
            "Foreign emitter account. The posted message's `emitter_address` must",
            "agree with the one we have registered for this message's `emitter_chain`",
            "(chain ID). Read-only."
          ]
        },
        {
          "name": "tokenBridgeProgram",
          "docs": [
            "Token Bridge program."
          ],
          "address": "DZnkkTmCiFWfYTfT41X3Rd1kDgozqzxWaHqsw6W4x2oe"
        },
        {
          "name": "tokenBridgeConfig",
          "docs": [
            "Token Bridge config. Read-only."
          ]
        },
        {
          "name": "tokenBridgeCustody",
          "docs": [
            "account that holds this mint's balance. This account needs to be",
            "unchecked because a token account may not have been created for this",
            "mint yet. Mutable."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "betMint"
              }
            ]
          }
        },
        {
          "name": "tokenBridgeAuthoritySigner"
        },
        {
          "name": "tokenBridgeCustodySigner"
        },
        {
          "name": "wormholeBridge",
          "docs": [
            "Wormhole bridge data. Mutable."
          ],
          "writable": true
        },
        {
          "name": "wormholeMessage",
          "docs": [
            "tokens transferred in this account for our program. Mutable."
          ],
          "writable": true
        },
        {
          "name": "tokenBridgeEmitter",
          "writable": true
        },
        {
          "name": "tokenBridgeSequence",
          "writable": true
        },
        {
          "name": "wormholeFeeCollector",
          "docs": [
            "Wormhole fee collector. Mutable."
          ],
          "writable": true
        },
        {
          "name": "clock",
          "docs": [
            "Clock sysvar."
          ],
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "Rent sysvar."
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "wormholeProgram",
          "docs": [
            "Wormhole program."
          ],
          "address": "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "lockedAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimToken",
      "discriminator": [
        116,
        206,
        27,
        191,
        166,
        19,
        0,
        73
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "betMint",
          "writable": true
        },
        {
          "name": "rewardMint",
          "writable": true
        },
        {
          "name": "userBetTokenAccount",
          "writable": true
        },
        {
          "name": "vaultBetTokenAccount",
          "writable": true
        },
        {
          "name": "userRewardTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voter"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "rewardMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "vaultRewardTokenAccount",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "betAccount",
          "writable": true
        },
        {
          "name": "answerAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "draftMarket",
      "discriminator": [
        251,
        196,
        130,
        72,
        251,
        64,
        188,
        39
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "betMint",
          "writable": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "marketKey"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "marketKey",
          "type": "u64"
        },
        {
          "name": "creator",
          "type": "pubkey"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "createFee",
          "type": "u64"
        },
        {
          "name": "creatorFeePercentage",
          "type": "u64"
        },
        {
          "name": "cojamFeePercentage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finishMarket",
      "discriminator": [
        200,
        216,
        58,
        2,
        224,
        204,
        151,
        26
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "rewardMint",
          "type": "pubkey"
        },
        {
          "name": "rewardApr",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeBridge",
      "discriminator": [
        6,
        173,
        152,
        229,
        35,
        112,
        127,
        151
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "Whoever initializes the config will be the owner of the program. Signer",
            "for creating the [`SenderConfig`] and [`RedeemerConfig`] accounts."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "senderConfig",
          "docs": [
            "Sender Config account, which saves program data useful for other",
            "instructions, specifically for outbound transfers. Also saves the payer",
            "of the [`initialize`](crate::initialize) instruction as the program's",
            "owner."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  101,
                  110,
                  100,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "wormholeProgram",
          "docs": [
            "Wormhole program."
          ],
          "address": "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5"
        },
        {
          "name": "tokenBridgeProgram",
          "docs": [
            "Token Bridge program."
          ],
          "address": "DZnkkTmCiFWfYTfT41X3Rd1kDgozqzxWaHqsw6W4x2oe"
        },
        {
          "name": "tokenBridgeConfig",
          "docs": [
            "Token Bridge config. Token Bridge program needs this account to",
            "invoke the Wormhole program to post messages. Even though it is a",
            "required account for redeeming token transfers, it is not actually",
            "used for completing these transfers."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "tokenBridgeAuthoritySigner",
          "docs": [
            "data; it is purely just a signer for SPL tranfers when it is delegated",
            "spending approval for the SPL token."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121,
                  95,
                  115,
                  105,
                  103,
                  110,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "tokenBridgeCustodySigner",
          "docs": [
            "data; it is purely just a signer for Token Bridge SPL tranfers."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  117,
                  115,
                  116,
                  111,
                  100,
                  121,
                  95,
                  115,
                  105,
                  103,
                  110,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "tokenBridgeMintAuthority",
          "docs": [
            "data; it is purely just a signer (SPL mint authority) for Token Bridge",
            "wrapped assets."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  115,
                  105,
                  103,
                  110,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "wormholeBridge",
          "docs": [
            "Wormhole bridge data account (a.k.a. its config)."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  114,
                  105,
                  100,
                  103,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "tokenBridgeEmitter",
          "docs": [
            "that holds data; it is purely just a signer for posting Wormhole",
            "messages on behalf of the Token Bridge program."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  109,
                  105,
                  116,
                  116,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "wormholeFeeCollector",
          "docs": [
            "Wormhole fee collector account, which requires lamports before the",
            "program can post a message (if there is a fee). Token Bridge program",
            "handles the fee payments."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  111,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "tokenBridgeSequence",
          "docs": [
            "Token Bridge emitter's sequence account. Like with all Wormhole",
            "emitters, this account keeps track of the sequence number of the last",
            "posted message."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  83,
                  101,
                  113,
                  117,
                  101,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "tokenBridgeEmitter"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "relayerFee",
          "type": "u32"
        },
        {
          "name": "relayerFeePrecision",
          "type": "u32"
        }
      ]
    },
    {
      "name": "retrieveTokens",
      "discriminator": [
        208,
        194,
        68,
        55,
        183,
        22,
        93,
        135
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "remainsTokenAccount",
          "writable": true
        },
        {
          "name": "betMint",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associateTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "setAccount",
      "discriminator": [
        100,
        58,
        16,
        200,
        83,
        84,
        162,
        203
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "serviceFeeAccount",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "remainAccount",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "successMarket",
      "discriminator": [
        252,
        13,
        1,
        40,
        160,
        91,
        131,
        212
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true
        },
        {
          "name": "betMint",
          "writable": true
        },
        {
          "name": "creatorTokenAccount",
          "writable": true
        },
        {
          "name": "serviceTokenAccount",
          "writable": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "answerAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "answerKey",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateOwner",
      "discriminator": [
        164,
        188,
        124,
        254,
        132,
        26,
        198,
        178
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateRewardConfig",
      "discriminator": [
        35,
        111,
        215,
        56,
        135,
        228,
        232,
        50
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "configAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "rewardMint",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "rewardApr",
          "type": {
            "option": "u64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "answerAccount",
      "discriminator": [
        75,
        175,
        139,
        96,
        119,
        135,
        123,
        71
      ]
    },
    {
      "name": "bettingAccount",
      "discriminator": [
        128,
        101,
        147,
        11,
        71,
        96,
        22,
        160
      ]
    },
    {
      "name": "bettingCrossChainAccount",
      "discriminator": [
        5,
        98,
        80,
        234,
        52,
        75,
        10,
        217
      ]
    },
    {
      "name": "configAccount",
      "discriminator": [
        189,
        255,
        97,
        70,
        186,
        189,
        24,
        102
      ]
    },
    {
      "name": "foreignEmitter",
      "discriminator": [
        209,
        139,
        241,
        247,
        96,
        178,
        159,
        2
      ]
    },
    {
      "name": "marketAccount",
      "discriminator": [
        201,
        78,
        187,
        225,
        240,
        198,
        201,
        251
      ]
    },
    {
      "name": "senderConfig",
      "discriminator": [
        0,
        241,
        220,
        77,
        167,
        128,
        79,
        152
      ]
    }
  ],
  "events": [
    {
      "name": "answerAdded",
      "discriminator": [
        82,
        95,
        97,
        36,
        223,
        127,
        175,
        26
      ]
    },
    {
      "name": "betCrossChainPlaced",
      "discriminator": [
        63,
        38,
        211,
        31,
        161,
        93,
        181,
        48
      ]
    },
    {
      "name": "betPlaced",
      "discriminator": [
        88,
        88,
        145,
        226,
        126,
        206,
        32,
        0
      ]
    },
    {
      "name": "foreignEmitterAdded",
      "discriminator": [
        19,
        26,
        216,
        213,
        59,
        60,
        91,
        87
      ]
    },
    {
      "name": "marketAdjourned",
      "discriminator": [
        255,
        9,
        83,
        139,
        244,
        130,
        217,
        61
      ]
    },
    {
      "name": "marketApproved",
      "discriminator": [
        213,
        222,
        68,
        97,
        16,
        1,
        31,
        38
      ]
    },
    {
      "name": "marketDrafted",
      "discriminator": [
        165,
        166,
        240,
        170,
        76,
        56,
        133,
        177
      ]
    },
    {
      "name": "marketFinished",
      "discriminator": [
        55,
        252,
        141,
        64,
        190,
        178,
        104,
        34
      ]
    },
    {
      "name": "marketSuccess",
      "discriminator": [
        28,
        146,
        105,
        87,
        226,
        249,
        99,
        105
      ]
    },
    {
      "name": "rewardClaimed",
      "discriminator": [
        49,
        28,
        87,
        84,
        158,
        48,
        229,
        175
      ]
    },
    {
      "name": "tokenClaimed",
      "discriminator": [
        49,
        144,
        233,
        63,
        84,
        154,
        232,
        26
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "alreadyInitialized",
      "msg": "The configuration account is already initialized."
    },
    {
      "code": 6001,
      "name": "unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6002,
      "name": "mathOperationError",
      "msg": "Operation resulted in an error."
    },
    {
      "code": 6003,
      "name": "marketNotFinished",
      "msg": "Market/AdjournMarket: Market is not finished"
    },
    {
      "code": 6004,
      "name": "marketDoesExist",
      "msg": "Market/DraftMarket: Market key does exist"
    },
    {
      "code": 6005,
      "name": "marketNotApproved",
      "msg": "Market/Bet: Market is not approved"
    },
    {
      "code": 6006,
      "name": "maxAnswersReached",
      "msg": "The maximum number of answers has been reached."
    },
    {
      "code": 6007,
      "name": "answerAlreadyExists",
      "msg": "The answer key already exists."
    },
    {
      "code": 6008,
      "name": "answerNotExists",
      "msg": "The answer key does not exist."
    },
    {
      "code": 6009,
      "name": "marketDoesNotContainAnswerKey",
      "msg": "Market/SuccessMarket: Market does not contain answerKey"
    },
    {
      "code": 6010,
      "name": "cannotClaimToken",
      "msg": "Market/Receive: Cannot receive token"
    },
    {
      "code": 6011,
      "name": "cannotRetrieveToken",
      "msg": "Market/Retrieve: Cannot Retrieve not finished market"
    },
    {
      "code": 6012,
      "name": "cannotRetrieveBeforeDate",
      "msg": "Market/Retrieve: Cannot Retrieve before 180 days"
    },
    {
      "code": 6013,
      "name": "answerKeyNotRight",
      "msg": "Market/Receive: Answer key is not succeeded answer key"
    },
    {
      "code": 6014,
      "name": "invalidBetMint",
      "msg": "Market/Bet: Invalid bet mint"
    },
    {
      "code": 6015,
      "name": "invalidTimeRange",
      "msg": "Market/ClaimToken: Invalid time range"
    },
    {
      "code": 6016,
      "name": "invalidAnswerKey",
      "msg": "Market/ClaimToken: Invalid answer key"
    },
    {
      "code": 6017,
      "name": "invalidBetAccount",
      "msg": "Market/ClaimToken: Invalid betting account"
    },
    {
      "code": 6018,
      "name": "overflow",
      "msg": "Operation Error: Overflow"
    },
    {
      "code": 6019,
      "name": "invalidRewardMint",
      "msg": "Invalid reward mint"
    },
    {
      "code": 6020,
      "name": "invalidForeignEmitter",
      "msg": "Invalid foreign emitter"
    },
    {
      "code": 6021,
      "name": "invalidMessage",
      "msg": "Invalid message"
    },
    {
      "code": 6022,
      "name": "invalidRecipient",
      "msg": "Invalid recipient"
    },
    {
      "code": 6023,
      "name": "invalidRelayerFee",
      "msg": "Invalid relayer fee"
    },
    {
      "code": 6024,
      "name": "invalidTokenBridgeCustodySigner",
      "msg": "Invalid token bridge custody signer"
    },
    {
      "code": 6025,
      "name": "invalidTokenBridgeAuthoritySigner",
      "msg": "Invalid token bridge authority signer"
    },
    {
      "code": 6026,
      "name": "invalidTokenBridgeConfig",
      "msg": "Invalid token bridge config"
    },
    {
      "code": 6027,
      "name": "invalidTokenBridgeEmitter",
      "msg": "Invalid token bridge emitter"
    },
    {
      "code": 6028,
      "name": "invalidTokenBridgeSequence",
      "msg": "Invalid token bridge sequence"
    },
    {
      "code": 6029,
      "name": "invalidWormholeBridge",
      "msg": "Invalid token bridge wormhole bridge"
    },
    {
      "code": 6030,
      "name": "invalidWormholeFeeCollector",
      "msg": "Invalid token bridge wormhole fee collector"
    }
  ],
  "types": [
    {
      "name": "answer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "answerKey",
            "type": "u64"
          },
          {
            "name": "answerTotalTokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "answerAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "answers",
            "type": {
              "vec": {
                "defined": {
                  "name": "answer"
                }
              }
            }
          },
          {
            "name": "exist",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "answerAdded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketKey",
            "type": "u64"
          },
          {
            "name": "newAnswers",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "betCrossChainPlaced",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voterWalletAddress",
            "type": "string"
          },
          {
            "name": "chainId",
            "type": "u16"
          },
          {
            "name": "marketKey",
            "type": "u64"
          },
          {
            "name": "answerKey",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "betPlaced",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voter",
            "type": "pubkey"
          },
          {
            "name": "marketKey",
            "type": "pubkey"
          },
          {
            "name": "answerKey",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "bettingAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "marketKey",
            "type": "u64"
          },
          {
            "name": "answerKey",
            "type": "u64"
          },
          {
            "name": "voter",
            "type": "pubkey"
          },
          {
            "name": "tokens",
            "type": "u64"
          },
          {
            "name": "createTime",
            "type": "u64"
          },
          {
            "name": "exist",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "bettingCrossChainAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "marketKey",
            "type": "u64"
          },
          {
            "name": "answerKey",
            "type": "u64"
          },
          {
            "name": "createTime",
            "type": "u64"
          },
          {
            "name": "exist",
            "type": "bool"
          },
          {
            "name": "chainId",
            "type": "u16"
          },
          {
            "name": "voterWalletAddress",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenAddress",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "configAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "rewardMint",
            "type": "pubkey"
          },
          {
            "name": "rewardApr",
            "type": "u64"
          },
          {
            "name": "serviceFeeAccount",
            "type": "pubkey"
          },
          {
            "name": "remainAccount",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "foreignEmitter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "chain",
            "docs": [
              "Emitter chain. Cannot equal `1` (Solana's Chain ID)."
            ],
            "type": "u16"
          },
          {
            "name": "address",
            "docs": [
              "Emitter address. Cannot be zero address."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "foreignEmitterAdded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "chain",
            "type": "u16"
          },
          {
            "name": "address",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "marketAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "exist",
            "type": "bool"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "betMint",
            "type": "pubkey"
          },
          {
            "name": "marketKey",
            "type": "u64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "marketStatus"
              }
            }
          },
          {
            "name": "creatorFee",
            "type": "u64"
          },
          {
            "name": "creatorFeePercentage",
            "type": "u64"
          },
          {
            "name": "serviceFeePercentage",
            "type": "u64"
          },
          {
            "name": "approveTime",
            "type": "u64"
          },
          {
            "name": "finishTime",
            "type": "u64"
          },
          {
            "name": "adjournTime",
            "type": "u64"
          },
          {
            "name": "successTime",
            "type": "u64"
          },
          {
            "name": "marketTotalTokens",
            "type": "u64"
          },
          {
            "name": "marketRemainTokens",
            "type": "u64"
          },
          {
            "name": "correctAnswerKey",
            "type": "u64"
          },
          {
            "name": "marketRewardBaseTokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketAdjourned",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketKey",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketApproved",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketKey",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketDrafted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "createFee",
            "type": "u64"
          },
          {
            "name": "creatorFeePercentage",
            "type": "u64"
          },
          {
            "name": "serviceFeePercentage",
            "type": "u64"
          },
          {
            "name": "approveTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketFinished",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketKey",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "remainTokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "draft"
          },
          {
            "name": "approve"
          },
          {
            "name": "finished"
          },
          {
            "name": "success"
          },
          {
            "name": "adjourn"
          }
        ]
      }
    },
    {
      "name": "marketSuccess",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketKey",
            "type": "u64"
          },
          {
            "name": "answerKey",
            "type": "u64"
          },
          {
            "name": "creatorFee",
            "type": "u64"
          },
          {
            "name": "serviceFee",
            "type": "u64"
          },
          {
            "name": "marketRemainTokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "outboundTokenBridgeAddresses",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "config",
            "type": "pubkey"
          },
          {
            "name": "authoritySigner",
            "type": "pubkey"
          },
          {
            "name": "custodySigner",
            "type": "pubkey"
          },
          {
            "name": "emitter",
            "type": "pubkey"
          },
          {
            "name": "sequence",
            "type": "pubkey"
          },
          {
            "name": "wormholeBridge",
            "docs": [
              "[BridgeData](wormhole_anchor_sdk::wormhole::BridgeData) address."
            ],
            "type": "pubkey"
          },
          {
            "name": "wormholeFeeCollector",
            "docs": [
              "[FeeCollector](wormhole_anchor_sdk::wormhole::FeeCollector) address."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "rewardClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "receiver",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "senderConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "docs": [
              "Program's owner."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump."
            ],
            "type": "u8"
          },
          {
            "name": "tokenBridge",
            "docs": [
              "Token Bridge program's relevant addresses."
            ],
            "type": {
              "defined": {
                "name": "outboundTokenBridgeAddresses"
              }
            }
          },
          {
            "name": "finality",
            "docs": [
              "AKA consistency level. u8 representation of Solana's",
              "[Finality](wormhole_anchor_sdk::wormhole::Finality)."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tokenClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "receiver",
            "type": "pubkey"
          },
          {
            "name": "marketKey",
            "type": "u64"
          },
          {
            "name": "bettingKey",
            "type": "u64"
          },
          {
            "name": "receivedTokens",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
