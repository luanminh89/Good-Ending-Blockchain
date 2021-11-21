import SHA256 from 'crypto-js/sha256';

class Transaction{
        constructor(fromAddress, toAddress, amount){
                this.fromAddress = fromAddress;
                this.toAddress = toAddress;
                this.amount = amount;
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
                let block = new Block(Date.noew(), this.pendingTransaction);
                block.mineBlock(this.difficulty);

                console.log('Yuki successfully mined!');
                this.chain.push(block);

                this.pendingTransaction = [
                        new Transaction(null, this.miningRewardAddress, this.miningReward)
                ];
        }

        createTransaction(transaction){
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
