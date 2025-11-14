export default class Pet {

  constructor(pet) {
    this.nome = pet.nome.toUpperCase();
    this.inicial = pet.nome.charAt(0).toUpperCase();
    this.raca = pet.raca;
    this.data_nascimento = pet.data_nascimento;
    this.tutor_id = pet?.tutor || null;
  }

}
