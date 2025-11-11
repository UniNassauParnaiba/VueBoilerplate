import DBService from "@/services/DBService"

export default {

  async listar() {
    return await DBService.listar("tutores");
  },

  async deletar(chave) {
    return await DBService.deletar("tutores", chave);
  }

}
