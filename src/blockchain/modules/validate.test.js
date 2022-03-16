import Blockchain from "../blockchain";
import validate from "./validate";

describe('validate()', () =>{
    let blockchain;

    beforeEach(() =>{
        blockchain = new Blockchain();
});

it ('Crear cadena valida', () => {

    blockchain.addBlock('transact00');
    blockchain.addBlock('transact01');

    expect(validate(blockchain.blocks)).toBe(true);
    });

    it('Invalidando cadena con un genesis block corrupto', () => {
      blockchain.blocks[0].data = 'h4ck-data'; 

      expect(() =>{
        validate(blockchain.blocks);
      }).toThrowError('Bloque genesis Invalido');
    });

    it('Invalidando con una cadena previousHash corrupto en un block', () => {
        blockchain.addBlock('transact02');
        blockchain.blocks[1].previousHash = 'h4ck-previousHash';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('El previous hash es invalido')
    });

    it('Invalidando con una cadena con un block con hash corrupto', () => {
        blockchain.addBlock('transact03');
        blockchain.blocks[1].hash = 'h4ck-hash';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Hash invalido');
    });
});

