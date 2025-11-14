<template>
  <div class="w-full">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
      <legend class="fieldset-legend">Adicionando pets</legend>

      <label class="label">Nome do pet</label>
      <input type="text" class="input w-full" placeholder="Nome do pet" />

      <label class="label">Raça</label>
      <input type="text" class="input w-full" placeholder="Raça" />

      <label class="label">Data nascimento</label>
      <input type="text" class="input w-full" placeholder="Data nascimento" />

      <label class="label">Tutor</label>
      <input type="text" class="input w-full" placeholder="Tutor" />

      <button class="btn btn-neutral mt-4" @click="adicionarPet">Adicionar</button>
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

<script setup></script>

<style lang="scss" scoped></style>
