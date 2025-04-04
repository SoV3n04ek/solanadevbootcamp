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
console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const recipient = new PublicKey("4iE8y7RuUEiu231FU38ur48Ehi343uR0324rjJ"); // edit
console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: 0.01 * LAMPORTS_PER_SOL,
});
transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`✅ Transaction confirmed, signature: ${signature}!`);
