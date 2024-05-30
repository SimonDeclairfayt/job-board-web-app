<template>
  <div v-if="showModal" class="background" @click="toggleModal"></div>
  <div class="adminOffer-container">
    <div class="header">
      <router-link :to="{ path: `/admin` }" class="arrow-link">
        <img src="../assets/arrow.svg" alt="Arrow to go back" class="arrow"
      /></router-link>
      <h2 class="title">Détail de l'offre</h2>
    </div>
    <div v-if="offer">
      <div class="flex-space-between">
        <div class="adminOffer-title">
          <h2 class="company">{{ offer.company }}</h2>
          <p class="title title--underline">
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
      </div>
      <div class="adminOffer-content">
        <h3 class="title mb-sm">Contenu :</h3>
        <p class="description">{{ offer.description }}</p>
        <div class="flex-column">
          <div>
            <h3>Logo</h3>
            <img
              :src="offer.logo"
              alt="Logo of the company"
              class="adminOfferDetails-image"
            />
          </div>
          <div>
            <h3>Image</h3>
            <img
              :src="offer.image"
              alt="Image representing the company"
              class="adminOfferDetails-image"
            />
          </div>
        </div>
        <div>
          <div class="button-wrapper mt-med">
            <button class="btn--send btn--smaller mr-sm" @click="toggleModal">
              Modifier
            </button>
            <button
              class="btn--send btn--smaller mr-sm"
              @click="deleteJobOffer"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <Modal
        v-if="this.showModal"
        @close="toggleModal"
        class="modal-container modal-overflow"
      >
        <div class="title--centered">
          <h2 class="title title--underline title--modal">Modifier l'offre</h2>
        </div>
        <form @submit.prevent="patchJobOffer" class="form">
          <div class="status-container">
            <label
              v-for="option in options"
              :key="option.value"
              class="custom-radio-button"
            >
              <input
                type="radio"
                v-model="offer.status"
                :value="option.value"
                class="hidden-radio"
              />
              {{ option.label }}
            </label>
          </div>
          <label for="company" class="form-label">Entreprise</label>
          <input
            type="text"
            v-model="offer.company"
            name="company"
            class="formInput-text"
          />
          <label for="title" class="form-label">Nom de l'offre</label>
          <input
            type="text"
            v-model="offer.title"
            name="title"
            class="formInput-text"
          />
          <label for="description" class="form-label"
            >Description de l'offre</label
          >
          <textarea
            v-model="offer.description"
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
                  :src="offer.logo"
                  alt=""
                  class="browse-img"
                />
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
                  :src="offer.image"
                  alt=""
                  class="browse-img"
                />
              </span>
            </div>
          </div>

          <button type="submit" class="btn--send">Modifier</button>
        </form>
      </Modal>
    </div>
    <div class="applicants-wrapper">
      <h2 class="title title--underline">Les postulants</h2>
      <ul v-if="applicants.length > 0" class="applicants-container">
        <li
          v-for="applicant in applicants"
          :key="applicant._id"
          class="applicant"
        >
          <div class="applicantContent-container">
            <p class="date">{{ applicant.appliedAt.split("T")[0] }}</p>
            <p class="applicant_name">
              {{ applicant.firstName }} {{ applicant.lastName }}
            </p>
            <p class="applicant_email">{{ applicant.email }}</p>
          </div>
          <a :href="applicant.cvUrl" target="_blank" rel="noopener noreferrer">
            <svg
              width="28"
              height="37.33"
              viewBox="0 0 54 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_23_181)">
                <path
                  d="M45 65.25C46.2375 65.25 47.25 64.2375 47.25 63V22.5H36C33.5109 22.5 31.5 20.4891 31.5 18V6.75H9C7.7625 6.75 6.75 7.7625 6.75 9V63C6.75 64.2375 7.7625 65.25 9 65.25H45ZM0 9C0 4.03594 4.03594 0 9 0H32.2734C34.6641 0 36.9562 0.942188 38.6437 2.62969L51.3703 15.3562C53.0578 17.0437 54 19.3359 54 21.7266V63C54 67.9641 49.9641 72 45 72H9C4.03594 72 0 67.9641 0 63V9Z"
                  fill="#77E9CB"
                />
              </g>
              <defs>
                <clipPath id="clip0_23_181">
                  <rect width="54" height="72" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import axios from "axios";
let id;
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
      this.offer[fieldName] = selectedFile;
      if (fieldName == "image") {
        this.imageUrl = URL.createObjectURL(selectedFile);
      } else if (fieldName == "logo") {
        this.logoUrl = URL.createObjectURL(selectedFile);
      }
    },
    patchJobOffer() {
      if (
        !this.offer.title ||
        !this.offer.company ||
        !this.offer.description ||
        !this.offer.image ||
        !this.offer.logo
      ) {
        return;
      }
      let formData = new FormData();
      formData.append("title", this.offer.title);
      formData.append("company", this.offer.company);
      formData.append("description", this.offer.description);
      formData.append("logo", this.offer.logo);
      formData.append("image", this.offer.image);
      formData.append("status", this.offer.status);
      axios
        .patch(
          `https://job-board-app-03c25eea5937.herokuapp.com/admin/offers/${id}`,
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
            location.reload();
          }.bind(this)
        )
        .catch(
          function (error) {
            this.axiosError = error;
          }.bind(this)
        );
    },
    deleteJobOffer() {
      fetch(
        `https://job-board-app-03c25eea5937.herokuapp.com/admin/offers/${id}`,
        {
          method: "DELETE",
          credentials: include,
        }
      ).then(this.$router.push("/admin"));
    },
  },

  data() {
    return {
      options: [
        { value: "1", label: "En Cours" },
        { value: "2", label: "Terminé" },
      ],
      offer: null,
      applicants: [],
      showModal: false,
      logoUrl: "",
      imageUrl: "",
    };
  },

  created() {
    id = this.$route.params.id;
    fetch(
      `https://job-board-app-03c25eea5937.herokuapp.com/admin/offers/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.offer = data[0];
        this.logoUrl = data[0].logo;
        this.imageUrl = data[0].image;
        this.applicants = [...data[1]];
      });
  },
};
</script>

<style scoped>
.adminOffer-container {
  width: 100vw;
  overflow-x: hidden;
}
.adminOffer-title {
  margin-left: 20px;
  margin-bottom: 24px;
}
.adminOffer-title .title {
  margin-top: 12px;
}
.flex-space-between {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: 20px;
  margin-top: 16px;
}
.adminOffer-content {
  padding: 0px 20px 32px 20px;
}
.description {
  padding: 16px;
  background-color: #fbfcfd;
  border: 1px solid #77e9cb;
  border-radius: 12px;
  color: rgba(52, 63, 82, 0.8);
  font-weight: 400;
  max-height: 232px;
  overflow-x: scroll;
}
.adminOfferDetails-image {
  width: 100%;
  height: auto;
  max-height: 90px;
  object-fit: cover;
}
.flex-column {
  display: flex;
  flex-flow: row nowrap;
  gap: 24px;
  margin-top: 16px;
}
.btn--smaller {
  padding: 8px 32px;
  box-shadow: none;
}
.mr-sm {
  margin-right: 12px;
}
.applicants-wrapper {
  padding: 0 20px 20px 20px;
}
.applicants-container {
  margin-top: 26px;
  list-style-type: none;
  padding-left: 0;
}
.applicant {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 20px 5px rgba(52, 63, 82, 0.12);
  margin-bottom: 24px;
}
.applicantContent-container {
  display: flex;
  flex-flow: column nowrap;
}
.date {
  font-size: 10px;
  font-weight: 300;
  color: rgba(52, 63, 82, 0.6);
}
.applicant_name {
  font-size: 16px;
  color: #343f52;
}
.applicant_email {
  font-size: 12px;
  font-weight: 500;
  color: #343f52;
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
.status-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  color: #343f52;
  margin-bottom: 12px;
}
@media (min-width: 764px) {
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
  .adminOffer-container {
    width: 70vw;
    margin-left: 15vw;
  }
  .modal-container {
    width: 70vw;
    margin-left: 15vw;
  }
  .header {
    padding: 32px;
  }
  .arrow {
    top: 32px;
    left: 15vw;
  }
}
</style>
