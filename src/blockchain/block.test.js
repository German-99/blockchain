import { exportAllDeclaration } from '@babel/types';
import Block from './block';

describe('Block', () => {
    let timestamp;
    let previousBlock;
    let data;
    let hash;

    beforeEach(() => {
        timestamp = new Date(2000, 0, 1);
        previousBlock = Block.genesis;
        data = 'transaction0';
        hash = 'hash0';
    });


    it("Crear instancia con parametros", () => {
        const block = new Block(timestamp, previousBlock.hash, hash, data);

        expect(block.timestamp).toEqual(timestamp);
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);

    });
    it('Usando static mine', () =>{
        const block = Block.mine(previousBlock, data);


        expect(block.hash.length).toEqual(64);
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(data).toEqual(data);
    });

    it('Usando static hash', () =>{
        hash = Block.hash(timestamp, previousBlock.hash, data);
        const hashOutput = "4e5365a98ceae982dfc6bf7bdca6c45cc1ee3fd894befb6361544db3b03d0589";

        expect(hash).toEqual(hashOutput);

    });

    it('Usando  metodo toString', () =>{
        const block = Block.mine(previousBlock, data);

        expect(typeof block.toString()).toEqual('string');
    });
});