import {
    clusterApiUrl,
    Connection,
    Keypair,
    Transaction,
    NONCE_ACCOUNT_LENGTH,
    SystemProgram,
    LAMPORTS_PER_SOL
  } from "@solana/web3.js";
  import { getKeypairFromFile } from "@solana-developers/helpers";

  
  (async () => {
    // Setup our connection and wallet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const feePayer = Keypair.generate();
  
    // Fund our wallet with 1 SOL
    const airdropSignature = await connection.requestAirdrop(
      feePayer.publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airdropSignature);
  
    // you can use any keypair as nonce account authority,
    // this uses the default Solana keypair file (id.json) as the nonce account authority
    const nonceAccountAuth = await getKeypairFromFile();
  
    let nonceAccount = Keypair.generate();
    console.log(`nonce account: ${nonceAccount.publicKey.toBase58()}`);
  
    let tx = new Transaction().add(
      // create nonce account
      SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: nonceAccount.publicKey,
        lamports:
          await connection.getMinimumBalanceForRentExemption(
            NONCE_ACCOUNT_LENGTH
          ),
        space: NONCE_ACCOUNT_LENGTH,
        programId: SystemProgram.programId
      }),
      // init nonce account
      SystemProgram.nonceInitialize({
        noncePubkey: nonceAccount.publicKey, // nonce account pubkey
        authorizedPubkey: nonceAccountAuth.publicKey // nonce account authority (for advance and close)
      })
    );
  
    console.log(
      `txhash: ${await sendAndConfirmTransaction(connection, tx, [feePayer, nonceAccount])}`
    );
  })();