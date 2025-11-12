import DBService from "@/services/DBService"

export default {

  async listarTutores() {
    return await DBService.listar('tutores');
  }

}
