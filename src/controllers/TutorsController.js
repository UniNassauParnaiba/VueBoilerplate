import Tutor from "@/models/Tutor";
import DBService from "@/services/DBService"

export default {

  async listar() {
    const tutors = await DBService.listar("tutores");
    return (tutors.length) ? tutors.map(tutor => new Tutor(tutor.key, tutor.data.nome, tutor.data.endereco, tutor.data.telefones, tutor.data.status)) : [];
  },

  async buscarPorId(chave) {
    const tutor = await DBService.capturarDocumento("tutores", chave);
    return new Tutor(tutor.key, tutor.nome, tutor.endereco, tutor.telefones, tutor.status);
  },

  async deletar(chave) {
    return await DBService.deletar("tutores", chave);
  }

}
