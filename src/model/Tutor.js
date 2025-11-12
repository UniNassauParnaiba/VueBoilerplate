export default class Tutor {

  constructor(chave, nome, endereco, telefones) {
    this.id = chave;
    this.nome = nome.toUpperCase();
    this.endereco = endereco;
    this.telefones = telefones;
  }

}
