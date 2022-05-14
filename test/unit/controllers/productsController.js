const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../services/productService');
const controllers = require('../../../controllers/productsController');

describe('testa os controllers dos products', () => {
  describe('testa a funcao getAll', () => {
    const resolved = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América",
        "quantity": 30
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
      await controllers.allProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('testa se e retornado um json contendo um array', async () => {
      await controllers.allProducts(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });
  describe('testa a funcao de busca por id', () => {
    describe('quando o produto existe no banco', () => {
      const res = {};
      const req = {};
      req.params = { id: 1 };
      const resolved = [{
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }];

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services, 'byId').resolves(resolved);
      });
      afterEach(() => {
        services.byId.restore();
      });

      it('retorna um objeto', async () => {
        await controllers.productById(req, res);

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
      it('possui a resposta com status 200', async () => {
        await controllers.productById(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('retorna um objeto com id, name e quantity', async () => {
        await controllers.productById(req, res);
      });
    });
    describe('quando o produto e inexistente', async () => {
      const res = {};
      const req = {};
      req.params = { id: 500 };
      const resolved = 'Product not found';

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services, 'byId').throws(resolved);
      });
      afterEach(() => {
        services.byId.restore();
      });

      it('retorna status 404', async () => {
        await controllers.productById(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('retorna um objeto de erro', async () => {
        await controllers.productById(req, res);

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
});
