<template>
    <div :class="[
        'bg-indigo-900 transition-all duration-300 ease-in-out overflow-hidden',
        isOpen ? 'w-56 mx-3' : 'w-0 mx-0'
    ]">
        <ul class="menu bg-base-200 rounded-box w-56 text">
            <li><router-link to="/tutors">Tutores</router-link></li>
            <li><router-link to="/pets">Pets</router-link></li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
}
)
</script>

<style lang="scss" scoped></style>
