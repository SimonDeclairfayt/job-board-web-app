<template>
  <div class="home">
    <Searchbar @search="handleSearch"></Searchbar>
    <h1>Home</h1>
    <ul v-if="jobs.length > 0">
      <li v-for="job in jobs" :key="job._id">
        <router-link :to="{ path: `/offers/${job._id}` }">
          <h2>{{ job.company }}</h2>
          <p>{{ job.title }}</p>
          <ul>
            <li>
              <p>CDI</p>
            </li>
            <li>Junior Position</li>
            <li>{{ getTimeSince(job.createdAt) }}</li>
          </ul>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Searchbar from "../components/Searchbar.vue";
import { getTimeSince } from "../utils/utils.js";

export default {
  components: {
    Searchbar,
  },
  data() {
    return {
      jobs: [],
    };
  },
  methods: {
    getTimeSince,
    async handleSearch(searchTerm) {
      fetch(`http://localhost:3333/api/search/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          this.jobs = data;
        });
    },
  },
  created() {
    fetch("http://localhost:3333/api/home")
      .then((response) => response.json())
      .then((data) => {
        this.jobs = data;
      });
  },
};
</script>
