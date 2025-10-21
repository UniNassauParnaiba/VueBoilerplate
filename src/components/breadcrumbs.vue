<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li>
        <router-link to="/"> Home </router-link>
      </li>
      <li>
        <router-link to="/tutors">
          <slot name="model"></slot>
        </router-link>
      </li>
      <li>
        <span class="inline-flex items-center gap-2 font-semibold">
          <slot name="action"></slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
