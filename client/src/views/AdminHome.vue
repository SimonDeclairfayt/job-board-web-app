<template>
  <h1>Jobbies</h1>
  <h2>Vos offres les plus récentes</h2>
  <ul v-if="offers.length > 0">
    <li v-for="offer in offers" :key="offer._id">
      <router-link :to="{ path: `/admin/offers/${offer._id}` }">
        <h2>{{ offer.company }}</h2>
        <p>{{ offer.title }}</p>
        <p>{{ offer.status === "1" ? "En Cours" : "Terminé" }}</p>
      </router-link>
    </li>
  </ul>
  <button @click="toggleModal">Ajouter une offre</button>
  <Modal v-if="this.showModal" @close="toggleModal">
    <h2>Nouvelle offre</h2>
    <form @submit.prevent="submitJobOffer">
      <label for="company">Entreprise</label>
      <input type="text" v-model="data.company" name="company" id="" />
      <label for="title">Nom de l'offre</label>
      <input type="text" v-model="data.title" name="title" id="" />
      <label for="description">Description de l'offre</label>
      <input type="text" v-model="data.description" name="description" />
      <label for="logo">Logo</label>
      <input type="file" name="logo" @change="onFileSelected" />
      <label for="image">Image Descriptive</label>
      <input type="file" name="image" @change="onFileSelected" />
      <button type="submit">Ajouter</button>
    </form>
  </Modal>
</template>

<script>
import Modal from "../components/Modal.vue";
import axios from "axios";
export default {
  components: {
    Modal,
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    onFileSelected(event) {
      const selectedFile = event.target.files[0];
      const fieldName = event.target.name;
      this.data[fieldName] = selectedFile;
      console.log(this.data[fieldName]);
    },
    submitJobOffer() {
      if (!this.data.title || !this.data.company || !this.data.description) {
        return;
      }
      let formData = new FormData();
      formData.append("title", this.data.title);
      formData.append("company", this.data.company);
      formData.append("description", this.data.description);
      formData.append("logo", this.data.logo);
      formData.append("image", this.data.image);
      axios
        .post(`http://localhost:3333/admin/offers/`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          function (response) {
            this.axiosResponse = response.data;
            this.showModal = false;
          }.bind(this)
        )
        .catch(
          function (error) {
            this.axiosError = error;
          }.bind(this)
        );
    },
  },
  data() {
    return {
      offers: [],
      showModal: false,
      data: {
        title: "",
        company: "",
        logo: null,
        image: null,
        description: "",
      },
    };
  },
  created() {
    fetch("http://localhost:3333/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        this.offers = data;
      })
      .catch((error) => {
        console.error(error);
        this.$router.push("/admin/login");
      });
  },
};
</script>
