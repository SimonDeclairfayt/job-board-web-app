<template>
  <div v-if="showModal" class="background" @click="toggleModal"></div>
  <div class="admin-container">
    <div class="title--centered">
      <h1 class="title title--big title--big--underline mb-med">Jobbies</h1>
    </div>
    <h2 class="title title--underline">Vos offres les plus récentes</h2>
    <ul v-if="offers.length > 0" class="adminOffers-container">
      <li v-for="offer in offers" :key="offer._id" class="adminOffers">
        <router-link
          :to="{ path: `/admin/offers/${offer._id}` }"
          class="adminOffers-link"
        >
          <div>
            <h2 class="company">{{ offer.company }}</h2>
            <p class="title title--small title--small--underline">
              {{ offer.title }}
            </p>
          </div>

          <p
            :class="{
              'status status-ongoing': offer.status == '1',
              'status status-done': offer.status == '2',
            }"
          >
            {{ offer.status === "1" ? "En Cours" : "Terminé" }}
          </p>
        </router-link>
      </li>
    </ul>
    <div class="button-wrapper">
      <button @click="toggleModal" class="apply-btn">Ajouter une offre</button>
    </div>
    <Modal
      v-if="this.showModal"
      @close="toggleModal"
      class="modal-container modal-overflow"
    >
      <div class="title--centered">
        <h2 class="title title--underline title--modal">Nouvelle offre</h2>
      </div>
      <form @submit.prevent="submitJobOffer" class="form">
        <label for="company" class="form-label">Entreprise</label>
        <input
          type="text"
          v-model="data.company"
          name="company"
          class="formInput-text"
        />
        <label for="title" class="form-label">Nom de l'offre</label>
        <input
          type="text"
          v-model="data.title"
          name="title"
          class="formInput-text"
        />
        <label for="description" class="form-label"
          >Description de l'offre</label
        >
        <textarea
          v-model="data.description"
          name="description"
          class="formInput-text textarea"
        />
        <div class="double-row">
          <div>
            <label for="logo" class="form-label">Logo</label>
            <input
              type="file"
              ref="logoinput"
              name="logo"
              @change="onFileSelected"
            />
            <span
              @click="$refs.logoinput.click()"
              class="browse-btn browse-btn--half"
            >
              <img
                v-if="logoUrl"
                :src="this.logoUrl"
                alt=""
                class="select-img select-img--half"
              />
              <img
                v-if="!logoUrl"
                src="../assets/file.svg"
                alt=""
                class="browse-img"
              />
              <p v-if="!logoUrl">Sélectionner un fichier</p>
            </span>
          </div>
          <div>
            <label for="image" class="form-label">Image Descriptive</label>
            <input
              type="file"
              ref="imageinput"
              name="image"
              @change="onFileSelected"
            />
            <span
              @click="$refs.imageinput.click()"
              class="browse-btn browse-btn--half"
            >
              <img
                v-if="imageUrl"
                :src="this.imageUrl"
                alt=""
                class="select-img select-img--half"
              />
              <img
                v-if="!imageUrl"
                src="../assets/file.svg"
                alt=""
                class="browse-img"
              />
              <p v-if="!imageUrl">Sélectionner un fichier</p>
            </span>
          </div>
        </div>

        <button type="submit" class="btn--send">Ajouter</button>
      </form>
    </Modal>
  </div>
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
      if (fieldName == "image") {
        this.imageUrl = URL.createObjectURL(selectedFile);
      } else if (fieldName == "logo") {
        this.logoUrl = URL.createObjectURL(selectedFile);
      }
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
        .post(
          `https://job-board-app-03c25eea5937.herokuapp.com/admin/offers/`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
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
      logoUrl: "",
      imageUrl: "",
    };
  },
  created() {
    fetch("https://job-board-app-03c25eea5937.herokuapp.com/admin", {
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

<style scoped>
.admin-container {
  width: 100vw;
  overflow-x: hidden;
  padding: 20px;
}
.adminOffers-container {
  margin-top: 32px;
  padding-left: 0;
  list-style-type: none;
}
.adminOffers {
  background-color: #fff;
  margin-bottom: 24px;
  box-shadow: 0px 0px 20px 5px rgba(52, 63, 82, 0.2);
  border-radius: 12px;
}
.adminOffers:hover {
  box-shadow: 0px 0px 20px 5px rgba(52, 63, 82, 0.5);
}
.adminOffers-link {
  text-decoration: none;
  color: #343f52;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
}
input[type="file"] {
  display: none;
}
.double-row {
  display: flex;
  flex-flow: row nowrap;
  gap: 20px;
}
.browse-btn--half {
  height: 120px;
  width: 135px;
}
.select-img--half {
  width: 80px;
  height: 80px;
  object-fit: contain;
}
@media (min-width: 764px) {
  .adminOffers-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 42px;
  }
  .double-row div {
    width: 50%;
  }
  .browse-btn--half {
    width: 100%;
    height: 250px;
  }
  .select-img--half {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
  .textarea {
    height: 200px;
    max-height: 200px;
  }
}
@media (min-width: 1200px) {
  .admin-container {
    width: 80vw;
    margin-left: 10vw;
  }
}
</style>
