import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, SystemInstruction, SystemProgram, Transaction, sendAndConfirmRawTransaction, sendAndConfirmTransaction } from "@solana/web3.js";
import "dotenv/config"
const suppliedToPubkey = process.argv[2] || null;
if (!suppliedToPubkey) {
    console.log('please send a public key to send sol');
    process.exit(1);
}

const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");
console.log(`suppliedToPubKey: ${suppliedToPubkey}`);
const toPubkey = new PublicKey(suppliedToPubkey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const balance = await connection.getBalance(senderKeyPair.publicKey);
console.log(balance);
console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );

const transaction = new Transaction();
const LAMPORTS_To_SEND = 5000;
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey,
    lamports:LAMPORTS_To_SEND
})
transaction.add(sendSolInstruction);
const signature = await sendAndConfirmTransaction(connection , transaction , [senderKeyPair])
console.log(signature);
console.log(
    `💸 Finished! Sent ${LAMPORTS_To_SEND} to the address ${toPubkey}. `
  );
console.log(`Transaction signature is ${signature}!`);