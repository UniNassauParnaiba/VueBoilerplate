import TutorsController from "@/controller/TutorsController";
import { onMounted, ref } from "vue";

export function useTutor() {

  const tutores = ref([]);

  const capturarTutores = async () => {
    tutores.value = await TutorsController.listarTutores();
  }

  onMounted(() => {
    capturarTutores();
  });

  return {
    capturarTutores,
    tutores
  };

}
