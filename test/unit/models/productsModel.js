const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const { getAllProducts,
  productById,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductName } = require('../../../models/productsModel');

describe('testes da camada models dos products', () => {
  describe('verifica se e possivel resgatar todos os produtos', () => {

    const resolved = [[
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
    ], []];
    
    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resolved);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('testando se a funcao getAll retorna todos os produtos', async () => {
      const all = await getAllProducts();
      expect(all).to.have.lengthOf(3);
      expect(all).to.be.an('array');
    });
  });
  describe('testes de busca por nome', () => {
    const resolved = [[{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }], []]

    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resolved);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it('verifica se e possivel resgatar um produto por nome', async () => {
      const byName = await getProductName('Martelo de Thor');

      expect(byName).to.be.an('array');
      expect(byName).to.have.lengthOf(1);
    });
});
  describe('funcao de resgatar produto por id', () => {
    const resolved = [[{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }], []]

    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resolved);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('verifica a funcao de resgatar um produto por id', async () => {
      const byId1 = await productById(1);

      expect(byId1).to.have.lengthOf(1);
      expect(byId1).to.be.an('array');

    });
  });
  describe('funcao para adicionar produtos',() => {
    const resolved = [{ insertId: 1 }];
    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resolved);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('verifica se a funcao addProduct possui retorno correto', async () => {
      const newProduct = await addProduct('product', 50);

      expect(newProduct).to.be.an('object');
      expect(Object.keys(newProduct)).to.have.lengthOf(3);
      expect(newProduct).to.have.a.property('name');
      expect(newProduct).to.have.a.property('id');
      expect(newProduct).to.have.a.property('quantity');
    });
  });
  describe('testa a funcao de deletar produtos', () => {

    const resolved = '';

    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resolved);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it('verifica se e possivel deletar um produto via id', async () => {
      const id = 2;
      const deleted = await deleteProduct(id);

      expect(deleted).to.equal(`Produto ${id} deletado com sucesso`);
    });
  });

  describe('testes relacionados a update de produto', () => {

    const resolved = '';

    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resolved);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('verifica se e possivel atualizar um produto', async () => {
      const updated = await updateProduct(1, 'novo nome', 30);

      expect(updated).to.be.an('object');
      expect(updated).to.have.a.property('name');
      expect(updated).to.have.a.property('id');
      expect(updated).to.have.a.property('quantity');
    });
  });
});