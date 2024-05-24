<template>
  <div>
    <router-link :to="{ path: `/` }"> Go back </router-link>
    <h2>Détail de l'offre</h2>
    <img :src="job.image" alt="" />
    <img :src="job.logo" alt="" />
    <h3>{{ job.title }}</h3>
    <ul>
      <li>CDI</li>
      <li>Junior Position</li>
      <li>{{ getTimeSince(job.createdAt) }}</li>
    </ul>
    <h3>Description de l'offre</h3>
    <p>{{ job.description }}</p>
    <button @click="toggleModal">Postuler</button>
    <Modal v-if="this.showModal" @close="toggleModal">
      <h2>{{ job.title }}</h2>
      <form @submit.prevent="handleSubmit">
        <label for="firstname">Prénom</label>
        <input type="text" v-model="data.firstname" name="firstname" id="" />
        <label for="lastname">Nom de famille</label>
        <input type="text" v-model="data.lastname" name="lastname" />
        <label for="email">Adresse email</label>
        <input type="email" v-model="data.email" name="email" id="" />
        <label for="cv">CV</label>
        <input type="file" name="cv" id="" @change="onFileSelected" />
        <button type="submit">Je tente ma chance!</button>
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
