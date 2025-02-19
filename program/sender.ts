/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/forecast_exchange.json`.
 */
export type Sender = {
    "address": "AJP1RsEpRyErFthAU4tanVeMNtm7PghtzaPNu3wRLXvM",
    "metadata": {
      "name": "sender",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "buyPoint",
        "discriminator": [
          40,
          209,
          193,
          51,
          158,
          17,
          90,
          87
        ],
        "accounts": [
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "configAccount",
            "writable": true
          },
          {
            "name": "tokenMint",
            "writable": true
          },
          {
            "name": "pointMint",
            "writable": true
          },
          {
            "name": "userTokenAccount",
            "writable": true
          },
          {
            "name": "userPointAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "user"
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
                  "path": "pointMint"
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
            "name": "ownerPointAccount",
            "writable": true
          },
          {
            "name": "vaultTokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "configAccount"
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
                  "path": "tokenMint"
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
            "name": "tokenProgram"
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
            "name": "amount",
            "type": "u64"
          }
        ]
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
            "name": "pointMint",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
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
        "name": "sellPoint",
        "discriminator": [
          170,
          94,
          128,
          91,
          28,
          65,
          154,
          169
        ],
        "accounts": [
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "configAccount",
            "writable": true
          },
          {
            "name": "tokenMint",
            "writable": true
          },
          {
            "name": "pointMint",
            "writable": true
          },
          {
            "name": "userPointAccount",
            "writable": true
          },
          {
            "name": "userTokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "user"
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
                  "path": "tokenMint"
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
            "name": "ownerTokenAccount",
            "writable": true
          },
          {
            "name": "vaultPointAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "configAccount"
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
                  "path": "pointMint"
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
            "name": "tokenProgram"
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
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "transferCrossChain",
        "discriminator": [
          156,
          254,
          121,
          90,
          64,
          192,
          182,
          110
        ],
        "accounts": [
          {
            "name": "payer",
            "docs": [
              "Payer will pay Wormhole fee to transfer tokens and create temporary",
              "token account."
            ],
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
            "name": "mint",
            "docs": [
              "Mint info. This is the SPL token that will be bridged over to the",
              "foreign contract. Mutable."
            ],
            "writable": true
          },
          {
            "name": "fromTokenAccount",
            "docs": [
              "Payer's associated token account. We may want to make this a generic",
              "token account in the future."
            ],
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "payer"
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
                  "path": "mint"
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
                  "path": "mint"
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
                  "path": "mint"
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
            "name": "systemProgram",
            "docs": [
              "System program."
            ],
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "docs": [
              "Token program."
            ],
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "docs": [
              "Associated Token program."
            ],
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
          }
        ],
        "args": [
          {
            "name": "batchId",
            "type": "u32"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "recipientAddress",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "recipientChain",
            "type": "u16"
          },
          {
            "name": "recipentContract",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    ],
    "accounts": [
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
        "name": "bought",
        "discriminator": [
          193,
          56,
          215,
          24,
          156,
          76,
          42,
          104
        ]
      },
      {
        "name": "sold",
        "discriminator": [
          205,
          203,
          210,
          202,
          96,
          11,
          192,
          10
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
        "name": "amountZero",
        "msg": "Amount must be greater than 0"
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
        "name": "answerKeyNotRight",
        "msg": "Market/Receive: Answer key is not succeeded answer key"
      },
      {
        "code": 6012,
        "name": "invalidTokenBridgeConfig",
        "msg": "Invalid token bridge config"
      },
      {
        "code": 6013,
        "name": "invalidTokenBridgeAuthoritySigner",
        "msg": "Invalid token bridge authority signer"
      },
      {
        "code": 6014,
        "name": "invalidTokenBridgeSequence",
        "msg": "Invalid token bridge sequence"
      },
      {
        "code": 6015,
        "name": "invalidWormholeBridge",
        "msg": "Invalid token bridge wormhole bridge"
      },
      {
        "code": 6016,
        "name": "invalidWormholeFeeCollector",
        "msg": "Invalid token bridge wormhole fee collector"
      },
      {
        "code": 6017,
        "name": "invalidTokenBridgeWrappedMint",
        "msg": "Invalid token bridge wrapped mint"
      },
      {
        "code": 6018,
        "name": "invalidMessage",
        "msg": "Invalid message"
      },
      {
        "code": 6019,
        "name": "invalidForeignEmitter",
        "msg": "Invalid foreign emitter"
      },
      {
        "code": 6020,
        "name": "invalidTokenBridgeEmitter",
        "msg": "Invalid token bridge emitter"
      },
      {
        "code": 6021,
        "name": "zeroBridgeAmount",
        "msg": "Zero bridge amount"
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
        "name": "invalidForeignContract",
        "msg": "Invalid foreign contract"
      }
    ],
    "types": [
      {
        "name": "bought",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "user",
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
              "name": "pointMint",
              "type": "pubkey"
            },
            {
              "name": "tokenMint",
              "type": "pubkey"
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
        "name": "sold",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "user",
              "type": "pubkey"
            },
            {
              "name": "amount",
              "type": "u64"
            }
          ]
        }
      }
    ]
  };
  