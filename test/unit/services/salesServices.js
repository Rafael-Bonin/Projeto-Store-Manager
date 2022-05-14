const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../services/salesService');
const models = require('../../../models/salesModel');

describe('testa os services da rota sales', () => {
  describe('testa a funcao de busca por id', () => {
    describe('quando a busca e bem sucedida', () => {
      const resolved = [
        {
          "date": "2022-05-15T02:28:53.000Z",
          "productId": 3,
          "quantity": 15
        }
      ];
      beforeEach(() => {
        sinon.stub(models, 'saleById')
        .resolves(resolved);
      });
      afterEach(() => {
        models.saleById.restore();
      });
      it('verifica se o retorno e um array', async () => {
        const saleId = await services.byId(2);

        expect(saleId).to.be.an('array');
      })
    });
  });
});

