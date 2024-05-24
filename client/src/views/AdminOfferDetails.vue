<template>
  <router-link :to="{ path: `/admin` }"> Go back </router-link>
  <h2>Détail de l'offre</h2>
  <div v-if="offer">
    <h3>{{ offer.company }}</h3>
    <h2>{{ offer.title }}</h2>
    <p>{{ offer.status === "1" ? "En Cours" : "Terminé" }}</p>
    <h3>Contenu :</h3>
    <p>{{ offer.description }}</p>
    <h3>Logo</h3>
    <img :src="offer.logo" alt="Logo of the company" />
    <h3>Logo</h3>
    <img :src="offer.image" alt="Image representing the company" />
    <button>Modifier</button>
    <button>Supprimer</button>
  </div>
  <h2>Les postulants</h2>
  <ul v-if="applicants.length > 0">
    <li v-for="applicant in applicants" :key="applicant._id">
      <p>{{ applicant.appliedAt }}</p>
      <p>{{ applicant.firstName }} {{ applicant.lastName }}</p>
      <p>{{ applicant.email }}</p>
      <a :href="applicant.cvUrl" target="_blank" rel="noopener noreferrer">
        CV</a
      >
    </li>
  </ul>
</template>

<script>
import Modal from "../components/Modal.vue";
import axios from "axios";
let id;
export default {
  methods: {},
  data() {
    return {
      offer: null,
      applicants: [],
    };
  },

  created() {
    id = this.$route.params.id;
    fetch(`http://localhost:3333/admin/offers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        this.offer = data[0];
        this.applicants = [...data[1]];
      });
  },
};
</script>
