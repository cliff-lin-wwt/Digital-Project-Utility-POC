<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchTerm"
        @input="onSearch"
        placeholder="Search"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
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
  };
  </script>
  
  <style scoped>
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
  </style>
  