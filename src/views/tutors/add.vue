<template>
  <div class="w-full">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
      <legend class="fieldset-legend">Adicionando tutores</legend>

      <label class="label">Nome</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Nome completo"
        v-model="form.nomeCompleto"
      />

      <label class="label">Logradouro</label>
      <input type="text" class="input w-full" placeholder="Logradouro" v-model="form.logradouro" />

      <label class="label">Número</label>
      <input type="text" class="input w-full" placeholder="Número" v-model="form.numero" />

      <label class="label">Bairro</label>
      <input type="text" class="input w-full" placeholder="Bairro" v-model="form.bairro" />

      <label class="label">CEP</label>
      <input type="text" class="input w-full" placeholder="CEP" v-model="form.cep" />

      <label class="label">Complemento</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Complemento"
        v-model="form.complemento"
      />

      <label class="label">Cidade</label>
      <input type="text" class="input w-full" placeholder="Cidade" v-model="form.cidade" />

      <label class="label">Estado</label>
      <input type="text" class="input w-full" placeholder="Estado" v-model="form.estado" />

      <button class="btn btn-neutral mt-4" @click="adicionarTutor">Adicionar</button>
    </fieldset>
    <div class="toast" v-if="toastVisible">
      <div class="alert alert-info">
        <span
          ><strong>{{ nomeCompletoToast }}</strong> salvo com sucesso.</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import DBService from "@/services/DBService";

onMounted(() => {});

const toastVisible = ref(false);
const nomeCompletoToast = ref("");
const form = reactive({
  nomeCompleto: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cep: "",
  complemento: "",
  cidade: "",
  estado: "",
});

const adicionarTutor = async () => {
  try {
    await DBService.adicionar("tutores", {
      nome: form.nomeCompleto,
      endereco: {
        logradouro: form.logradouro,
        numero: form.numero,
        bairro: form.bairro,
        cep: form.cep,
        complemento: form.complemento,
        cidade: form.cidade,
        estado: form.estado,
      },
      telefones: [],
    });
    console.log("Tutor adicionado com sucesso!");
    nomeCompletoToast.value = form.nomeCompleto;
    toastVisible.value = true;
  } catch (error) {
    console.error("Erro ao adicionar tutor:", error);
  } finally {
    // Limpar o formulário após a adição
    form.nomeCompleto = "";
    form.logradouro = "";
    form.numero = "";
    form.bairro = "";
    form.cep = "";
    form.complemento = "";
    form.cidade = "";
    form.estado = "";
  }
};
</script>

<style lang="scss" scoped></style>
