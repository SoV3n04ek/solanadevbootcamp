import "dotenv/config";
import {
	Keypair,
	LAMPORTS_PER_SOL,
	SystemProgram,
	Transaction,
	clusterApiUrl,
	Connection,
	sendAndConfirmTransaction
} from "@solana/web3.js";

let privateKey = process.env["SECRET_KEY"];
if (!privateKey) {
	console.log("add sectret_key to env");
	process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);
connection = new Connection(clusterApiUrl("devnet"))
