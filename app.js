document.addEventListener('DOMContentLoaded', function() {
  new Vue({
    el: '#app',
    data: {
      projects: [],
      searchTerm: '',
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
    computed: {
      filteredProjects() {
        if (!this.searchTerm) {
          return this.projects;
        }
        // Filter projects based on the search term
        return this.projects.filter(project =>
          project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
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
      }
    }
  });
});
