
export default class Tutor {
  constructor(tutor) {
    this.id = tutor?.key || null;
    this.nomeCompleto = tutor.data?.nome.toUpperCase().trim();
    this.endereco = tutor.data?.endereco;
    this.telefones = tutor.data?.telefones || [];
    this.status = tutor.data?.status || "offline";
  }
}
