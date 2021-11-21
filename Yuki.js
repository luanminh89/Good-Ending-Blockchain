const hash = require('crypto-js/sha256');
class Block{
    constructor(prevHash, data ){ 
            this.prevHash = prevHash;
            this.data = data;
            this.timeStamp = new Date();

            this.hash = this.calculateHash();
            this.mineVar = 0;
    }
    calculateHash() {
            return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar).toString();
    }
    mine(difficulty) {
        while(!this.hash.startWith('0'.repeat(difficulty))) {
            this.mineVar++;
            this.hash = this.calculateHash();
        }
    }
  
}
class Blockchain {
        constructor(difficulty) {
                const Yuki = new Block('0',{isyuki: true})
                   
                this.difficulty = difficulty;
                this.chain = [Yuki];
        }
        getLastBlock() {
                return this.chain[this.chain.length-1];
        }
        addBlock(data) {
                const lastBlock = this.getLastBlock();
                const newBlock = new Block(lastBlock.hash, data);

                console.log ('start Yuki')
                console.time('mine')
                newBlock.mine(this.difficulty)
                console.timeEnd ('mine')
                console.log('good ending', newBlock)
                this.chain.push(newBlock);
        }

        isValid() {
            for(let i = 0; i < this.chain.length; i++) {
                    const currentBlock = this.chain[i];
                    const prevBlock = this.chain[i-1];

                    if (currentBlock.hash !== currentBlock.calculateHash()) {
                            return false;
                    }

                    if(currentBlock.prevHash !== prevBlock.hash ) {
                            return false;
                    }
        }
        return true;
    }
}
