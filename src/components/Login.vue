<template>
  <div class="login-container">
    <h1>Login</h1>
    <form>
      <div class="input-field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button @click="submit" class="login-button">Login</button>
        <button @click="goToRegister" class="register-button">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "@/Router/index.js";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submit() {
      // TODO: Implement login logic here
      console.log("Submitting login form...");
    },
    goToRegister() {
      router.push('/register')
      console.log("Go to register...");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.input-field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 200px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

.login-button {
  margin-bottom: 10px;
  margin-right: 10px;
}

.register-button {
  margin-top: 10px;
  margin-right: 110px;
}
</style>
