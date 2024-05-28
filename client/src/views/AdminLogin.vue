<template>
  <div class="login-container">
    <h1 class="title title--big title--big--underline mb-sm">Jobbies</h1>
    <p class="mb-med">
      Connectez vous pour accéder au <strong>dashboard admin</strong>
    </p>
    <form @submit.prevent="logIn" class="login-form">
      <label for="username" class="form-label"><strong>Username</strong></label>
      <input
        type="text"
        v-model="data.username"
        name="username"
        class="formInput-text"
      />
      <label for="password" class="form-label"><strong>Password</strong></label>
      <input
        type="password"
        v-model="data.password"
        name="password"
        class="formInput-text"
      />
      <p class="error">Wrong username and password combination</p>
      <button type="submit" class="login-btn">Login</button>
    </form>
    <router-link :to="{ path: '/' }" class="link"
      >Go back to the original website</router-link
    >
  </div>
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
            document.querySelector(".error").classList.add("error-class");
          });
      }
    },
  },
};
</script>
<style>
.login-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #343f52;
}
.login-form {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
}
.error {
  color: #e97777;
  display: none;
  margin-bottom: 12px;
}
.error-class {
  display: block;
}
.login-btn {
  background-color: #77e9cb;
  border: 1px solid #77e9cb;
  padding: 8px 0;
  border-radius: 12px;
  color: #343f52;
  font-size: 16px;
  font-weight: 700;
}
.link {
  font-size: 16px;
  margin-top: 12px;
  font-weight: 300;
  text-decoration: none;
  color: #77e9cb;
}
</style>
