const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../services/salesService');
const controllers = require('../../../controllers/salesController');

describe('testa os controllers das sales', () => {
  describe('testa a funcao de resgatar todos as sales', () => {
    const resolved = [
      {
        "saleId": 1,
        "date": "2022-05-14T00:35:11.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 2,
        "date": "2022-05-14T00:35:11.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(services, 'getAll').resolves(resolved);
    });

    afterEach(() => {
      services.getAll.restore();
    });
    it('testa se e retornado o metodo status passando codigo 200', async () => {
      await controllers.allSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('testa se e retornado um json contendo um array', async () => {
      await controllers.allSales(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
    describe('testas a funcao de busca por id', () => {
      describe('quando a requisicao e bem sucedida', () => {
      const res = {};
      const req = {};
      req.params = { id: 1 };
      const resolved = [
        {
          "date": "2022-05-14T00:43:52.000Z",
          "productId": 1,
          "quantity": 5
        }
      ];

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services, 'byId').resolves(resolved);
      });
      afterEach(() => {
        services.byId.restore();
      });
      it('retorna um array com as sales', async () => {
        await controllers.salesById(req, res);

        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
      it('possui a resposta com status 200', async () => {
        await controllers.salesById(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
    describe('quando a requisicao e mal sucedida', () => {
      const res = {};
      const req = {};
      req.params = { id: 500 };
      const resolved = 'Sale not found';

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services, 'byId').throws(resolved);
      });
      afterEach(() => {
        services.byId.restore();
      });

      it('retorna status 404', async () => {
        await controllers.salesById(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('retorna um objeto de erro', async () => {
        await controllers.salesById(req, res);

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

    });
  });
});