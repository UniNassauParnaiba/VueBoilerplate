import PetsController from "@/controller/PetsController";
import { onMounted, ref } from "vue";

export function usePet() {

  const pets = ref([]);
  const pet = ref({});

  const adicionarPet = async() => {
    // pets.value = [{}, {}];
    await PetsController.adicionarPet(pet.value);
  };

  const listarPets = async() => {
      pets.value = await PetsController.listarPets();
      console.log(pets.value)
    };


  onMounted(() => {
    listarPets();
  });

  return {
    adicionarPet,
    pet,
    pets
  };

}
