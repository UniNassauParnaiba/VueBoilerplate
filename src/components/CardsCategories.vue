<template>
    <div class="w-full flex flex-col justiy-center items-center">
        <div class=" grid gap-5 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 ">
            <div v-for="categorie in Categorias" class="flex justify-center items-center w-60 h-30 bg-gray-200 rounded hover:bg-gray-3  00 hover:scale-110 transition ">
                <p>{{ categorie }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const Categorias = [
  'Construção Civil',
  'Reparos e Manutenção',
  'Eletricista',
  'Encanador',
  'Pintura',
  'Limpeza',
  'Jardinagem',
  'Culinária',
  'Beleza e Estética',
  'Educação',
];

</script>