import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
    throw new Error('Please provide the wallet address to check the balance for');
}
let publicKey : PublicKey | undefined;
function isValidSolanaAddress(address : string) {
    try {
        new PublicKey(suppliedPublicKey);
        return true;
    } catch (error) {
        console.error("Invalid Solana Address" , error.message);
        return false;
    }
}
if(isValidSolanaAddress(suppliedPublicKey)) {
    publicKey = new PublicKey(suppliedPublicKey);
} else {
    throw new Error("Invalid Solana public key provided.");
}
const connection = new Connection('https://api.mainnet-beta.solana.com' , 'confirmed');
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
console.log(`The balance in the account ${publicKey} - ${balanceInSol}`);


