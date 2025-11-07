import Localbase from "localbase";

class DBService
{
  constructor(dbName = 'banco-de-dados'){
    this.db = new Localbase(dbName);
  }

  async listar(colecao = 'teste')
  {
    return await this.db.collection(colecao).get({ keys: true})
  }

  async adicionar(colecao, documento)
  {
    try {
      this.db.collection(colecao).add(documento)
    } catch (error) {
      return error;
    }
  }

}

export default new DBService('db');
