import Tutor from "@/model/Tutor";
import DBService from "@/services/DBService"

export default {

  colecao: 'tutores',

  async listarTutores() {
    const tutors = await DBService.listar(this.colecao);
    return tutors.map(tutor => new Tutor(tutor))
  },

  async deletarTutor(chave) {
    return await DBService.deletar(this.colecao, chave);
  }

}
