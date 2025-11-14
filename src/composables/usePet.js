import PetsController from "@/controller/PetsController";
import { onMounted, ref } from "vue";

export function usePet() {

  // const pets = ref([]);
  const pet = ref({});

  const adicionarPet = async(pet) => {
    // pets.value = [{}, {}];
    await PetsController.adicionarPet(pet)
  }


  onMounted(() => {
  });

  return {
    adicionarPet,
    pet
  };

}
