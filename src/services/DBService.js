import Localbase from "localbase";

class DBService
{

  constructor(dbName){
    this.db = new Localbase(dbName)
  }

  async listar(colecao) {
    try {
      return await this.db.collection(colecao).get({ keys: true });
    } catch (error) {
      return error
    }
  }

  async adicionar(colecao, documento) {
    try {
      await this.db.collection(colecao).add(documento)
    } catch (error) {
      return error
    }
  }

  async capturarDocumento(colecao, chave) {
    try {
      return await this.db.collection(colecao).doc(chave).get()
    } catch (error) {
      return error
    }
  }

  async atualizar(colecao, chave, documento) {
    try {
      await this.db.collection(colecao).doc(chave).set(documento)
    } catch (error) {
      return error
    }
  }

}

export default new DBService('clinica-veterinaria');
