<template>
  <div class="mb-2">
    <breadcrumbs>
      <template v-slot:model> Pets </template>
      <template v-slot:action> Lista de Pets </template>
    </breadcrumbs>
  </div>
  <div class="card w-full bg-base-100 shadow-sm card-border">
    <div class="card-body">
      <div class="overflow-x-auto">
        <div class="flex">
          <div class="flex-1 mb-5 text-2xl">Pets</div>
          <button class="btn btn-second" @click="adicionar">Adicionar</button>
        </div>
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Nome</th>
              <th>Raça</th>
              <th>Data de nascimento</th>
              <th>Tutor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="pet in pets" :key="pet.id">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>

              <td>{{ pet.nome }}</td>
              <td>{{ pet.raca }}</td>
              <td>{{ pet.data_nascimento }}</td>
              <td>{{ pet.tutor_id }}</td>
              <th>
                <router-link class="btn btn-info btn-xs">Editar</router-link>
              </th>
            </tr>
          </tbody>
          <!-- foot -->
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { usePet } from "@/composables/usePet";
import { useRouter } from "vue-router";

const router = useRouter();

const { pets, listarPets } = usePet();
console.log(pets);

const adicionar = () => {
  router.push({ name: "pets.add" });
};
</script>

<style lang="scss" scoped></style>
