<template>
  <div class="search mb-big">
    <form @submit.prevent="onSubmit" class="searchbar-container">
      <div class="searchbar">
        <img src="../assets/search.svg" class="search-icon" />
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search a job right now"
          name="searchbar"
          class="searchbar-input"
          @input="handleInput"
        />
      </div>
      <button @click="$emit('search', searchTerm)" class="searchbar-submit">
        Search
      </button>
    </form>
    <ul v-if="possibleJobs.length > 0" class="searchResult-container">
      <li v-for="job in possibleJobs" :key="job.id">
        <router-link
          :to="{ path: `/offers/${job._id}` }"
          class="searchResult-link"
        >
          <div class="logo-container">
            <img :src="job.logo" alt="" class="logo" />
          </div>
          <div>
            <h2 class="company">{{ job.company }}</h2>
            <h3 class="title title--small--underline title--small">
              {{ job.title }}
            </h3>
          </div>
        </router-link>
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

<style scoped>
.search {
  position: relative;
}
.search-icon {
  height: 16px;
  width: auto;
}
.searchbar-container {
  display: flex;
  width: 100%;
  gap: 10px;
}
.searchbar {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 40px;
  border: 2px solid #77e9cb;
  width: 100%;
}
.searchbar-input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  padding-left: 12px;
  width: 100%;
}
.searchbar-submit {
  border: 1px solid #77e9cb;
  background-color: #77e9cb;
  color: #343f52;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  font-weight: 800;
  font-size: 12px;
}
.searchResult-container {
  background-color: #fff;
  padding-left: 0;
  position: absolute;
  top: 52px;
  width: calc(100% - 72px);
  list-style-type: none;
  border: 2px solid #77e9cb;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: scroll;
  margin-right: 72px;
  z-index: 10;
  display: block;
  overflow-x: hidden;
}
.searchResult-link {
  text-decoration: none;
  color: #343f52;
  border-bottom: 1px solid #77e9cb;
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 24px;
  padding-top: 12px;
  padding-left: 12px;
  gap: 8px;
}
.logo-container {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  box-shadow: 0 0 10px 0 rgba(52, 63, 82, 0.5);
  display: flex;
  overflow: hidden;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 44px;
  height: auto;
}
</style>
