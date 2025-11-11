
export default class Tutor {
  constructor(chave, nomeCompleto, endereco) {
    this.id = chave || null;
    this.nomeCompleto = nomeCompleto.toUpperCase();
    this.endereco = endereco;
  }
}
