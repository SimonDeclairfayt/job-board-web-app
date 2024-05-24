<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search a job right now"
        name="searchbar"
        id=""
        @input="handleInput"
      />
      <button @click="$emit('search', searchTerm)">Search</button>
    </form>
    <ul v-if="possibleJobs.length > 0">
      <li v-for="job in possibleJobs" :key="job.id">
        <p>{{ job.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["searchTerm"],
  data() {
    return {
      searchTerm: "",
      possibleJobs: [],
    };
  },
  methods: {
    handleInput(event) {
      if (event.target.value) {
        fetch(`http://localhost:3333/api/search/${event.target.value}`)
          .then((response) => response.json())
          .then((data) => {
            this.possibleJobs = data;
          });
      } else {
        this.possibleJobs = [];
      }
    },
    onSearch() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>
