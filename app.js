Vue.component('search-bar', {
  template: `
    <div class="search-bar">
      <input
        type="text"
        v-model="searchTerm"
        @input="onSearch"
        placeholder="Search"
      />
    </div>
  `,
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    onSearch() {
      this.$emit('filter-projects', this.searchTerm);
    },
  },
  style: `
    .search-bar {
      text-align: center;
      margin-bottom: 30px;
    }
    
    input {
      width: 60%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  `
});

Vue.component('project-grid', {
  props: {
    projects: Array,
  },
  template: `
    <div class="grid-container">
      <div class="grid-item" v-for="project in projects" :key="project.name">
        <h2>{{ project.name }}</h2>
        <p><strong>Members:</strong> {{ project.members }}</p>
        <p><strong>Client:</strong> {{ project.client }}</p>
        <p><strong>Description:</strong> {{ project.description }}</p>
        <button @click="$emit('delete-project', project.id)">Delete</button>
      </div>
    </div>
  `,
  style: `
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
  `
});

new Vue({
  el: '#app',
  data: {
    projects: [],
    filteredProjects: [],
    newProject: {
      name: '',
      members: '',
      client: '',
      technology: '',
      description: ''
    }
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      fetch('http://localhost:1300/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data fetched:', data);
          this.projects = data.projects;
          this.filteredProjects = this.projects;
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    },
    addProject() {
      fetch('http://localhost:1300/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newProject)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Project added:', data);
          this.fetchProjects();
          this.newProject = {
            name: '',
            members: '',
            client: '',
            technology: '',
            description: ''
          };
        })
        .catch(error => {
          console.error('There was a problem with the add operation:', error);
        });
    },
    deleteProject(id) {
      fetch(`http://localhost:1300/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Project deleted:', data);
          this.fetchProjects();
        })
        .catch(error => {
          console.error('There was a problem with the delete operation:', error);
        });
    },
    filterProjects(filter) {
      this.filteredProjects = this.projects.filter(project => {
        return (
          project.name.toLowerCase().includes(filter.toLowerCase()) ||
          project.members.toLowerCase().includes(filter.toLowerCase()) ||
          project.client.toLowerCase().includes(filter.toLowerCase()) ||
          project.description.toLowerCase().includes(filter.toLowerCase())
        );
      });
    }
  }
});
