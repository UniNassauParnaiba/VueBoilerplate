import Localbase from "localbase";

class DBService
{
  constructor(dbName = 'db'){
    this.db = new Localbase(dbName);
  }

  async listar(colecao = 'exemplo')
  {
    return await this.db.collection(colecao).get({ keys: true})
  }

  async adicionar(colecao, documento)
  {
    try {
      await this.db.collection(colecao).add(documento)
    } catch (error) {
      return error;
    }
  }

  async recuperarDocumento(colecao, chave)
  {
    return await this.db.collection(colecao).doc(chave).get({ keys: true})
  }

  async atualizar(colecao, documento, chave)
  {
    try {
      await this.db.collection(colecao)
                    .doc(chave)
                    .update(documento);
    } catch (error) {
      return error;
    }
  }

}

export default new DBService('db');
