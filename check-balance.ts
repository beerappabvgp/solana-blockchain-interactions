import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey("3s4cUSVViZGs7k8ndRH2wgJesSAUkHTnso2cpezTwyCH");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
console.log(`The balance of the wallet at address ${publicKey} is ${balanceInSol}`);

