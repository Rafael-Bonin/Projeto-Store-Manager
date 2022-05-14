const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../services/productService');
const connection = require('../../../models/connection');
const models = require('../../../models/productsModel');

describe('verifica o funcionamento da camada services products', () => {
  describe('verifica se e possivel resgatar todos os produtos', () => {
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
    beforeEach(() => {
      sinon.stub(models, 'getAllProducts')
      .resolves(resolved); 


    });
    afterEach(() => {
      models.getAllProducts.restore();
    });

   
    it('verifica o funcionamento da funcao getAll', async () => {
      const all = await services.getAll();
      console.log(all);

      expect(all).to.have.lengthOf(3);
      expect(all).to.be.an('array');
    });
  });
  describe('funcao de resgatar produto por id', () => {
    const resolved = [{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }]
    beforeEach(() => {
      sinon.stub(models, 'productById')
      .resolves(resolved);
    });
    afterEach(() => {
      models.productById.restore();
    });

    it('verifica a funcao de resgatar um produto por id', async () => {
      const byId1 = await services.byId(1);

      expect(byId1).to.have.lengthOf(1);
      expect(byId1).to.be.an('array');
    });
  });

  describe('testes update de produto', () => {
    const resolved = { id: 1, name: 'test', quantity: 10 };
    beforeEach(() => {
      sinon.stub(models, 'updateProduct')
      .resolves(resolved);
    });
    afterEach(() => {
      models.updateProduct.restore();
    });
    it('verifica se retorna os valores corretos ao atualizar um produto', async () => {
      const updated = await services.changeProduct(1, 'test', 10);

      expect(updated).to.be.an('object');
      expect(updated).to.have.a.property('name');
      expect(updated).to.have.a.property('id');
      expect(updated).to.have.a.property('quantity');
    });
  });
});

describe('testes com delete', () => {
  const resolved = `Produto 2 deletado com sucesso`;
  beforeEach(() => {
    sinon.stub(models, 'deleteProduct')
    .resolves(resolved);
  });
  afterEach(() => {
    models.deleteProduct.restore();
  });

  it('verifica se e retornado o valor correto ao tentar remover um produto', async () => {
    const removed = await services.removeProduct(2);

    expect(removed).to.equal(`Produto 2 deletado com sucesso`);
  });
});

describe('testa a funcao de criar um produto novo', () => {
  const resolved = { id: 1, name: 'nameProduct', quantity: 50 }
  beforeEach(() => {
    sinon.stub(models, 'addProduct')
    .resolves(resolved);
  });
  afterEach(() => {
    models.addProduct.restore();
  });


  it('verifica o valor retornado ao criar um novo produto', async () => {
    const news = await services.newProduct('nameProduct', 50);

    expect(news).to.be.an('object');
    expect(Object.keys(news)).to.have.lengthOf(3);
    expect(news).to.have.a.property('name');
    expect(news).to.have.a.property('id');
    expect(news).to.have.a.property('quantity');
  });
});