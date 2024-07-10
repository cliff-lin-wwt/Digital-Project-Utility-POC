<template>
  <div class="grid-container">
    <div class="grid-item" v-for="project in projects" :key="project.name">
      <h2>{{ project.name }}</h2>
      <p><strong>Members:</strong> {{ project.members }}</p>
      <p><strong>Client:</strong> {{ project.client }}</p>
      <p><strong>Description:</strong> {{ project.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectGrid',
  props: {
    projects: Array,
  },
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.grid-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 30px;
  width: 80%;
  margin: 12px;
  max-width: 800px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
}
</style>
