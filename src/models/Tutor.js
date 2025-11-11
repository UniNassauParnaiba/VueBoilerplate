
export default class Tutor {
  constructor(chave, nomeCompleto, endereco) {
    this.id = chave || null;
    this.nomeCompleto = nomeCompleto.toUpperCase().trim();
    this.endereco = endereco;
  }
}
