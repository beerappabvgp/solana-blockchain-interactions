import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config"

async function main() {
    let destinationAddress = process.argv[2];
    if (!destinationAddress) {
        console.log('Please enter the destination address to transfer SOL.');
        process.exit(1);
    }

    const payer = getKeypairFromEnvironment('SECRET_KEY');
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const newBalance = await airdropIfRequired(connection, payer.publicKey, 3 * LAMPORTS_PER_SOL, 2 * LAMPORTS_PER_SOL);
    const receiver = new PublicKey(destinationAddress);
    const transaction = new Transaction();
    const amountLamports = 1 * LAMPORTS_PER_SOL;

    const transferInstruction = SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: receiver,
        lamports: amountLamports
    });

    transaction.add(transferInstruction);
    try {
        const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
        console.log(`Transaction sent and confirmed with signature: ${signature}`);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

main().catch(console.error);
