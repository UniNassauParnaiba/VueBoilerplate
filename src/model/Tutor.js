export default class Tutor {

  constructor(tutor) {
    this.id = tutor.key;
    this.nome = tutor.data.nome.toUpperCase();
    this.inicial = tutor.data.nome.charAt(0).toUpperCase();
    this.endereco = tutor.data.endereco;
    this.telefones = tutor.data.telefones;
    this.pais = tutor.data?.pais?.toUpperCase().trim();
  }

}
