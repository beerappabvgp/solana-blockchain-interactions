import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, Transaction, TransactionInstruction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import "dotenv/config"
import { PublicKey } from "@solana/web3.js";
const payer = getKeypairFromEnvironment('SECRET_KEY')
const connection = new Connection(clusterApiUrl('devnet'))
const newBalance = await airdropIfRequired(connection , payer.publicKey , 5 * LAMPORTS_PER_SOL , 2 * LAMPORTS_PER_SOL)
const PING_PROGRAM_ADDRESS = new PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
const PING_PROGRAM_DATA_ADDRESS =  new PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')
const programId = new PublicKey(PING_PROGRAM_ADDRESS)
const transaction = new Transaction()
const instruction = new TransactionInstruction({
    keys: [
        {
            pubkey: PING_PROGRAM_DATA_ADDRESS,
            isSigner: false,
            isWritable: true
        },
    ],
    programId
});
transaction.add(instruction)
const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
)

console.log(`✅ Transaction completed! Signature is ${signature}`)