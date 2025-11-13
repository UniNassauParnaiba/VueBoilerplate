import Tutor from "@/models/Tutor";
import DBService from "@/services/DBService"

export default {

  async listar() {
    const tutors = await DBService.listar("tutores");
    return (tutors.length) ? tutors.map(tutor => new Tutor(tutor)) : [];
  },

  async deletar(chave) {
    return await DBService.deletar("tutores", chave);
  }

}
