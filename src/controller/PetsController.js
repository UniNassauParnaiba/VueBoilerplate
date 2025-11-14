import Pet from "@/model/Pet";
import DBService from "@/services/DBService"

export default {

  colecao: 'pets',

  async adicionarPet(pet) {
    const PetModel = new Pet(pet);
    try {
      await DBService.adicionar(this.colecao, PetModel);
    } catch (e) {
      return new Error('Algo deu errado', e);
    }
  },

  async listarPets() {
    const pets = await DBService.listar(this.colecao);
    return pets.map(pet => new Pet(pet.data.nome, pet.data.raca, pet.data.data_nascimento, pet.data.tutor_id));
  },

}
