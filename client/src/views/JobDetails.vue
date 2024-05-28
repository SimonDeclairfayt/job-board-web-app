<template>
  <div v-if="job" class="jobDetails">
    <div v-if="showModal" class="background" @click="toggleModal"></div>
    <div class="header">
      <router-link :to="{ path: `/` }" class="arrow-link">
        <img src="../assets/arrow.svg" alt="Arrow to go back" class="arrow"
      /></router-link>
      <h2 class="title">Détail de l'offre</h2>
    </div>
    <div class="jobDetails-banner">
      <img :src="job.image" alt="" class="banner-details" />
      <div class="logoContainer jobDetails-banner--middle">
        <img :src="job.logo" alt="" class="logo" />
      </div>
    </div>
    <div class="jobDetails-content">
      <h3 class="title title--underline title--centered">{{ job.title }}</h3>
      <ul class="tagsContainer mt-med">
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
      <div class="align--left mb-big">
        <h3 class="title mb-sm">Description de l'offre</h3>
        <p>{{ job.description }}</p>
      </div>
    </div>
    <div class="button-wrapper">
      <button @click="toggleModal" class="apply-btn">Postuler</button>
    </div>
    <Modal v-if="this.showModal" @close="toggleModal" class="modal-container">
      <div class="title--centered">
        <h2 class="title title--underline title--modal">{{ job.title }}</h2>
      </div>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form--doubleRow">
          <div class="form--halfRow">
            <label for="firstname" class="form-label">Prénom</label>
            <input
              type="text"
              v-model="data.firstname"
              name="firstname"
              class="formInput-text"
            />
          </div>
          <div class="form--halfRow">
            <label for="lastname" class="form-label">Nom de famille</label>
            <input
              type="text"
              v-model="data.lastname"
              name="lastname"
              class="formInput-text"
            />
          </div>
        </div>
        <label for="email" class="form-label">Adresse email</label>
        <input
          type="email"
          v-model="data.email"
          name="email"
          class="formInput-text"
        />
        <label for="cv" class="form-label">CV</label>
        <input type="file" name="cv" ref="fileInput" @change="onFileSelected" />
        <span @click="$refs.fileInput.click()" class="browse-btn">
          <img v-if="cvUrl" :src="this.cvUrl" alt="" class="select-img" />
          <img
            v-if="!cvUrl"
            src="../assets/file.svg"
            alt=""
            class="browse-img"
          />
          <p v-if="!cvUrl">Sélectionner un fichier</p>
        </span>
        <button type="submit" class="btn--send">Je tente ma chance!</button>
      </form>
    </Modal>
  </div>
</template>

<script>
import { getTimeSince } from "../utils/utils.js";
import Modal from "../components/Modal.vue";
import axios from "axios";
let id;
export default {
  components: {
    Modal,
  },
  data() {
    return {
      job: null,
      showModal: false,
      data: {
        firstname: "",
        lastname: "",
        email: "",
        cv: null,
      },
      cvUrl: "",
    };
  },
  created() {
    id = this.$route.params.id;
    fetch(`http://localhost:3333/api/offers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.job = data;
      });
  },
  methods: {
    getTimeSince,
    toggleModal() {
      this.showModal = !this.showModal;
    },
    onFileSelected(event) {
      this.data.cv = event.target.files[0];
      this.cvUrl = URL.createObjectURL(event.target.files[0]);
    },
    handleSubmit() {
      if (!this.data.firstname || !this.data.lastname || !this.data.email) {
        return;
      }
      let formData = new FormData();
      formData.append("firstName", this.data.firstname);
      formData.append("lastName", this.data.lastname);
      formData.append("email", this.data.email);
      formData.append("cv", this.data.cv);
      console.log(formData);
      axios
        .post(`http://localhost:3333/api/offers/${id}`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          function (response) {
            this.axiosResponse = response.data;
            console.log(response.data);
          }.bind(this)
        )
        .catch(
          function (error) {
            this.axiosError = error;
          }.bind(this)
        );
    },
  },
};
</script>

<style scoped>
.jobDetails {
  width: 100vw;
  overflow-x: hidden;
}
.banner-details {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
}
.jobDetails-banner {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
.jobDetails-banner--middle {
  margin-top: -50px;
  z-index: 2;
}
.jobDetails-content {
  padding: 20px;
  text-align: center;
}

.form--doubleRow {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  overflow-x: hidden;
}
.form--halfRow {
  display: flex;
  flex-flow: column nowrap;
}
input[type="file"] {
  display: none;
}
</style>
