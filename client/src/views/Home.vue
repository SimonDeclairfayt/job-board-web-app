<template>
  <div class="home-container">
    <h1 class="title title--underline mb-big">Jobbies</h1>
    <h2 class="title title--main mb-med">
      Trouve le job de tes rêves avec Jobbies !
    </h2>
    <Searchbar @search="handleSearch"></Searchbar>
    <h2 v-if="!search" class="title title--underline mb-med">
      Nos offres les plus récentes
    </h2>
    <h2 v-if="search" class="title title--underline mb-med">
      Nos offres les plus récentes pour {{ this.search }}
    </h2>
    <ul v-if="jobs.length > 0" class="jobOffers-container">
      <li v-for="job in jobs" :key="job._id" class="jobOffers">
        <router-link
          :to="{ path: `/offers/${job._id}` }"
          class="jobOffers_link"
        >
          <div class="jobOffers_imageContainer">
            <img :src="job.image" alt="" class="jobOffers_image" />
            <div class="logoContainer logoContainer-middle">
              <img :src="job.logo" alt="" class="logo" />
            </div>
          </div>
          <div class="jobOffers-textContainer">
            <h2 class="company">{{ job.company }}</h2>
            <h3 class="title title--underline">{{ job.title }}</h3>
            <ul class="tagsContainer">
              <li class="tags">
                <img src="../assets/cdi.svg" alt="CDI svg" class="tag-img" />
                <p>CDI</p>
              </li>
              <li class="tags">
                <img
                  src="../assets/briefcase.svg"
                  alt="Briefcase svg"
                  class="tag-img"
                />
                <p>Junior position</p>
              </li>
              <li class="tags">
                <img
                  src="../assets/calendar.svg"
                  alt="Calendar svg"
                  class="tag-img"
                />
                <p>{{ getTimeSince(job.createdAt) }}</p>
              </li>
            </ul>
          </div>
          <button class="mobile-hidden btn-tuile">Postuler</button>
          <img
            src="../assets/leaf.svg"
            alt="Nice svg of a leaf"
            class="mobile-hidden leaf-tuile"
          />
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
      search: "",
    };
  },
  methods: {
    getTimeSince,
    handleSearch(searchTerm) {
      fetch(
        `https://job-board-app-03c25eea5937.herokuapp.com/api/search/${searchTerm}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.search = searchTerm;
          this.jobs = data;
        });
    },
  },
  created() {
    fetch("https://job-board-app-03c25eea5937.herokuapp.com/api/home")
      .then((response) => response.json())
      .then((data) => {
        this.jobs = data;
      });
  },
};
</script>

<style scoped>
.home-container {
  padding: 20px;
  width: 100vw;
  overflow-x: hidden;
}
@media (min-width: 1200px) {
  .home-container {
    padding: 40px;
  }
}
</style>
