
import TutorsController from "@/controllers/TutorsController"
import { onMounted, ref } from "vue";

export function useTutor(){

  const tutores = ref([]);
  const tutor = ref({
    id: null,
    nomeCompleto: "",
    endereco: {
      logradouro: "",
      bairro: "",
      numero: "",
      cep: "",
      cidade: "",
      estado: ""
    }
  });

  const capturarTutores = async () => {
    tutores.value = await TutorsController.listar();
    console.log("Tutores capturados: ", tutores.value);
  }

  const deletarTutor = async (id) => {
    await TutorsController.deletar(id);
    await capturarTutores();
  }

  const buscarPorId = async (id) => {
    tutor.value = await TutorsController.buscarPorId(id);
  }

  const manipularTutor = (tutor) => {
    console.log("Dados do tutor: ", tutor);
  }

  onMounted(() => {
    capturarTutores();
  });

  return {
    tutor,
    tutores,
    buscarPorId,
    manipularTutor,
    capturarTutores,
    deletarTutor
  }

};
