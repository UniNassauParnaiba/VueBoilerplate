import DBService from "@/services/DBService"

export default {

  colecao: 'pets',

  async adicionarPet(pet) {
    console.log(this.colecao, pet)
    try {
      const pets = await DBService.adicionar(this.colecao, pet);
      return pets;
    } catch (e) {
      return new Error('Algo deu errado', e);
    }
  },

}
