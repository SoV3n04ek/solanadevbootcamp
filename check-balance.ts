//require('dotenv').config();
//import 'dotenv/config';
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl
} from "@solana/web3.js";

async function checkBalance() {
const connection = new Connection(clusterApiUrl("devnet"));
    console.log(`Connected to devnet`);

    // TODO: REPLACE TO ENV 
    //let publicKeyValue = process.env["PUBLIC_KEY"];
    const publicKeyValue = "3WbG99E52gLaxAaK7beA6Ff11MUkvRu32cdr4EpctV1N";
    const publicKey = new PublicKey(publicKeyValue);
    if (!publicKeyValue) throw new Error("PUBLIC_KEY not found in .env");

    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
        `The balance for the wallet at adress ${publicKeyValue} is: ${balanceInSOL}`
    );
}

checkBalance().catch(console.error);