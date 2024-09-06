<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="input-field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="userName" />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <button type="submit" class="login-button">Login</button>
        <button type="button" @click="goToRegister" class="register-button">Register</button>
      </div>
    </form>
    <h2 v-if="loginErr">{{errorMessage}}</h2>
  </div>
</template>

<script>
import router from "@/Router/index.js";
import apiService from "@/service/apiService"; // Correct import path

export default {
  data() {
    return {
      userName: "",
      password: "",
      loginErr: false,
      errorMessage: ""
    };
  },
  methods: {
    async login() {
      console.log("Submitting login form...");

      try {
        // Prepare the request payload
        const requestData = {
          userName: this.userName,
          password: this.password,
        };

        // Call the backend API to validate the user credentials
        const response = await apiService.post("/user/login", requestData);

        if (response.status === 200 && response.data) {
          // Redirect to the OTP submission page with user info as query parameters
          router.push({
            path: "/submit-otp",
            query: {
              userName: this.userName
            },
          });
        } else {
          console.error("Login failed", response.data);
          this.loginErr = true; // Show error message
          this.errorMessage = response.data.message
        }
      } catch (error) {
        this.loginErr = true;
        console.error("An error occurred during login:", error);
        this.errorMessage = error.response.data.message
      }
    },
    goToRegister() {
      console.log("Go to register...");
      router.push("/register");
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
