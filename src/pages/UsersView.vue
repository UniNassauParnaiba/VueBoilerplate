<template>
    <div class="flex justify-between w-3/5 mb-20 mt-15">
        <h1 class="text-4xl">Usuários</h1>
        <BarraPesquisa/>
    </div>

    <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr class="bg-blue-900 rounded text-white">
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <th>name</th>
        <th>Country</th>
        <th>Job</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="user in users" :key="user.id">
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">{{ user.name }}</div>
              <div class="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {{user.country}}
          <br />
          <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>{{ user.job }}</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script setup>
const users = [
  { id: 1, name: 'Junior', country: 'United States', job: 'Desktop Support Technician'},
  { id: 2, name: 'Clailton', country: 'Sweden', job: 'Tax Accountant'},
  { id: 3, name: 'Gabriel', country: 'Canada', job: 'Office Assistant I'},
  { id: 4, name: 'Murilo', country: 'United Kingdom', job: 'Internal Auditor'},
  ]
</script>

<style lang="scss" scoped></style>
