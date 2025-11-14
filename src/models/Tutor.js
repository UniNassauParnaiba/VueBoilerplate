
export default class Tutor {
  constructor(id, nomeCompleto, endereco = {}, telefones = [], status = "offline") {
    this.id = id || null;
    this.nomeCompleto = nomeCompleto?.toUpperCase().trim();
    this.endereco = endereco?.endereco || {};
    this.telefones = telefones.data?.telefones || [];
    this.status = status.data?.status || "offline";
  }
}
