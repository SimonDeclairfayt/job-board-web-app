<template>
  <div class="home-container">
    <h1 class="title title--underline mb-big">Jobbies</h1>
    <h2 class="title mb-med">Trouve le job de tes rêves avec Jobbies !</h2>
    <Searchbar @search="handleSearch"></Searchbar>
    <h2 class="title title--underline mb-med">Nos offres les plus récentes</h2>
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
    handleSearch(searchTerm) {
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

<style scoped>
.home-container {
  padding: 20px;
  width: 100vw;
  overflow-x: hidden;
}
.jobOffers-container {
  padding-left: 0;
}
.jobOffers {
  list-style-type: none;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px -5px rgba(52, 63, 82, 0.5);
  margin-bottom: 30px;
  z-index: -2;
}
.jobOffers:hover {
  box-shadow: 0 0 50px -20px #343f52;
}
.jobOffers_link {
  text-decoration: none;
  color: #343f52;
}
.jobOffers_imageContainer {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}
.jobOffers_image {
  height: 200px;
  width: 334px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}
.logoContainer-middle {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
.jobOffers-textContainer {
  padding: 24px;
}
.tagsContainer {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  margin-top: 16px;
}
.tags {
  display: flex;
  flex-flow: row nowrap;
  background-color: #d4dae4;
  border: 1px solid #d4dae4;
  padding: 5px 16px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  opacity: 0.8;
}
.tag-img {
  height: 12px;
  width: auto;
}
</style>
