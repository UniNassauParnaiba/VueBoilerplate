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

}

export default new DBService('db');
