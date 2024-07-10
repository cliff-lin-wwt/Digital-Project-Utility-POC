<template>
  <div id="app">
    <h1>Digital Database</h1>
    <SearchBar @filter-projects="filterProjects" />
    <ProjectGrid :projects="filteredProjects" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import ProjectGrid from './components/ProjectGrid.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    ProjectGrid,
  },
  data() {
    return {
      projects: [
        { name: 'Project A', members: 'Alice, Bob', client: 'Client X', description: 'Description A' },
        { name: 'Project B', members: 'Charlie, Dave', client: 'Client Y', description: 'Description B' },
        // Add more hardcoded projects here
      ],
      filteredProjects: [],
    };
  },
  created() {
    this.filteredProjects = this.projects;
  },
  methods: {
    filterProjects(filter) {
      this.filteredProjects = this.projects.filter(project => {
        return (
          project.name.toLowerCase().includes(filter.toLowerCase()) ||
          project.members.toLowerCase().includes(filter.toLowerCase()) ||
          project.client.toLowerCase().includes(filter.toLowerCase()) ||
          project.description.toLowerCase().includes(filter.toLowerCase())
        );
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  display: block;
  width: 100%;
}

#app > * {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
