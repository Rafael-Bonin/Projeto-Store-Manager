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
  describe('testa a funcao de adicionar um novo produto', () => {
    describe('quando a requisicao e bem sucedida', () => {
      const resolved = {
        "id": 4,
        "name": "brother",
        "quantity": 5
      };
      const req = {};
      const res = {};
      req.body = {
        "name": "brother",
        "quantity": 5
      }
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services, 'newProduct')
        .resolves(resolved);

      });
      afterEach(() => {
        services.newProduct.restore();
      });

      it('deve receber a resposta com status 201', async () => {
        await controllers.insertProduct(req, res);

        expect(res.status.calledWith(201)).to.be.equal(true);
      });
      it('deve receber um objeto com o produto criado', async () => {
        await controllers.insertProduct(req, res);

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
    describe('quando o produto com mesmo nome ja foi cadastrado', () => {
      const resolved = 'Product already exists';
      const req = {};
      const res = {};
      req.body = {
        "name": "Martelo de Thor",
        "quantity": 5
      }
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services, 'newProduct')
        .throws(resolved);

      });
      afterEach(() => {
        services.newProduct.restore();
      });
      it('deve retornar a resposta com status 409', async () => {
        await controllers.insertProduct(req, res);

        expect(res.status.calledWith(409)).to.be.equal(true);
      });
      it('deve retornar um objeto de erro', async () => {
        await controllers.insertProduct(req, res);

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  }); 
  describe('testa a funcao de editar um produto', () => {
    describe('quando a atualizacao e bem sucedida', () => {
      const resolved = {
        "id": "1",
        "name": "Broder",
        "quantity": 5
      };
      const req = {};
      const res = {};
      req.params = { id: 1 };
      req.body = {
        "name": "Broder",
        "quantity": 5
      };
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
  
        sinon.stub(services, 'changeProduct')
        .resolves(resolved);
  
      });
      afterEach(() => {
        services.changeProduct.restore();
      });
      it('deve retornar a resposta com status 200', async () => {
        await controllers.editProduct(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});
