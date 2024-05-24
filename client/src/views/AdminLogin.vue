<template>
  <h1>Jobbies</h1>
  <p>Connectez vous pour accéder au <span>dashboard admin</span></p>
  <form @submit.prevent="logIn">
    <label for="username">Username</label>
    <input type="text" v-model="data.username" name="username" id="" />
    <label for="password">Password</label>
    <input type="password" v-model="data.password" name="password" id="" />
    <p id="error">Wrong username and password combination</p>
    <button type="submit">Login</button>
  </form>
  <router-link :to="{ path: '/' }">Go back to the original website</router-link>
</template>
<script>
export default {
  data() {
    return {
      data: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      if (!this.data.username || !this.data.password) {
        return;
      } else {
        fetch("http://localhost:3333/api/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.data.username,
            password: this.data.password,
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            this.$router.push("/admin");
            document.getElementById("error").classList.remove("error-class");
          })
          .catch((error) => {
            console.error(error);
            document.getElementById("error").classList.add("error-class");
          });
      }
    },
  },
};
</script>
