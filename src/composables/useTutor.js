
import TutorsController from "@/controllers/TutorsController"
import { onMounted, ref } from "vue";

export function useTutor(){

  const tutores = ref([]);
  // const tutor = ref({
  //   id: null,
  //   nomeCompleto: "",
  //   endereco: {
  //     logradouro: "",
  //     bairro: "",
  //     cep: ""
  //   }
  // });

  const capturarTutores = async () => {
    tutores.value = await TutorsController.listar();
  }

  onMounted(() => {
    capturarTutores();
  });

  return {
    tutores,
    capturarTutores
  }

};
