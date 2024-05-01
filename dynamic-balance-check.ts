import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if(!suppliedPublicKey) {
    throw new Error('You must provide an public key to fetch the address');
}
const publicKey = new PublicKey(suppliedPublicKey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
console.log(`The balance for the wallet address provided is ${publicKey} - ${balanceInSol}`);