export default class Pet {

  constructor(nome, raca, data_nascimento, tutor) {
    this.nome = nome;
    this.inicial = nome;
    this.raca = raca;
    this.data_nascimento = data_nascimento;
    this.tutor_id = this.getTutorId(tutor);
  }

  getTutorId = (tutor) => {
    return {
      nome: 'bruce',
      raca: 'labrador',
      data_nascimento: '2020-01-01',
      tutor_id: tutor
    };
  }

}
