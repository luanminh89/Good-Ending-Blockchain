import SHA256 from 'crypto-js/sha256';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction{
        constructor(fromAddress, toAddress, amount){
                this.fromAddress = fromAddress;
                this.toAddress = toAddress;
                this.amount = amount;
        }
        calculateHash(){
                return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
        }

        signTransaction(signingKey){
                if(signingKey.getPublic('hex') !== this.fromAddress) {
                        throw new Error('You cannot sign transactions for other wallets');
                }

                const hashTx = this.calculateHash();
                const sig = signingKey.sign(hashTx, 'base64');
                this.signature =sig.toDER('hex');
        }
        isValid(){
                if(this.fromAddress == null) return true;

                if(!this.signature || this.signature.length === 0) {
                        throw new Error ('No signature in this transaction');
                }

                const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
                return publicKey.verify(this.calculateHash(), this.signature);
        }
}
class Block {
        constructor(timestamp, data, previousHash = '') {
                this.timestamp = timestamp;
                this.data = data;
                this.previousHash = previousHash;
                this.hash = thi.calculateHash();
                this.nonce = 0;
        }
        calculateHash() {
                return SHA256(this.index + this.previousHash+ this.timestamp + JSON.stringify(this.data) + this.nonce).toString(); 
        }

        mineBlock(difficulty){
                while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
                        this.nonce++;
                        this.hash = this.calculateHash();
                }

                console.log("Yuki mined:" +this.hash);
        }
        hasValidTransaction() {
                for(const tx of this.transaction) {
                        if(!tx.isValid()) {
                                return false;
                        }
                }

                return true;
        }
}

class Blockchain{
        constructor() {
                this.chain = [this.createYukiBlock];
                this.difficulty = 8;
                this.pendingTransaction = [];
                this.miningReward = 89;
        }

        createYukiBlock() {
                return new Block("12/07/2021","Yuki Kurokawa", "0");
        }
        getLatestBlock(){
                return this.chain[this.chain.length - 1];
        }

        minePendingTransaction(miningRewardAddress){
                const rewardTx = new Transaction (null, miningRewardAddress, this.miningReward);
                this.pendingTransaction.push(rewardTx);

                let block = new Block(Date.noew(), this.pendingTransaction);
                block.mineBlock(this.difficulty);

                console.log('Yuki successfully mined!');
                this.chain.push(block);

                this.pendingTransaction = [
                        new Transaction(null, this.miningRewardAddress, this.miningReward)
                ];
        }

        addTransaction(transaction){

                if(!transaction.fromAddress || !transaction.toAddress) {
                        throw new Error('Transaction must include from and to address');
                }

                if(!transaction.isValid()) {
                        throw new Error ('Cannot add invalid transaction to chain');
                }
                
                this.pendingTransaction.push(transaction);
        }
        
        getBalanceOfAddress(address) {
                let balance = 0;

                for(const block of this.chain) {
                        for(const trans of block.transaction) {
                                if(trans, fromAddress === address) {
                                        balance -= trans.amount;
                                }

                                if(trans.toAddress === address) {
                                        balance += trans.amount;
                                }
                        }
                }
                return balance;
        }
        
        addBlock(newBlock){
                newBlock.previousHash = this.getLatestBlock().hash;
                newBlock.mineBlock(this.difficulty);
                this.chain.push(newBlock);
        }
        isChainValid () {
                for(let i = 1; i < this.chain.length; i++) {
                        const currentBlock = this.chain[i];
                        const previousBlock = this.chain[i-1];

                        if(!currentBlock.hasValidTransaction()) {
                                return false;
                        }

                        if(currentBlock.hash !== currentBlock.calculateHash()) {
                                return false;
                        }

                        if(currentBlock.previopusHash !== previousBlock.hash) {
                                return false;
                        }
                }
                
                return true;
        }
}

module.exports.Blockchain =  Blockchain;
module.exports.Transaction = Transaction;
