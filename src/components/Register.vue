<template>
  <div class="register-container">
    <h1>Application Register</h1>
    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="input-field">
        <label for="email">Email Address</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button @click="register">Register</button>
      <button @click="backToLogin">Back</button>
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
      email: "",
    };
  },
  methods: {
    register() {
      // TODO: Implement registration logic here
      console.log("Submitting registration form...");
    },
    backToLogin(){
      console.log("back to login");
      router.push('/login')
    }
  },
};
</script>

<style scoped>
.register-container {
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
  margin: 10px;
  border: none;
  border-radius: 3px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
</style>
