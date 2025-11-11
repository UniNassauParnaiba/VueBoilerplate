import Tutor from "@/models/Tutor";
import DBService from "@/services/DBService"

export default {

  async listar() {
    const tutors = await DBService.listar("tutores");
    return tutors.map(tutor => new Tutor(
      tutor.key,
      tutor.data.nome,
      tutor.data.endereco
    ));
  },

  async deletar(chave) {
    return await DBService.deletar("tutores", chave);
  }

}
