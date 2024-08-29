<template>
  <div class="register-container">
    <h1>Application Register</h1>
    <form @submit.prevent="register">
      <div class="input-field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="input-field">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="firstName" />
      </div>
      <div class="input-field">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="lastName" />
      </div>
      <button type="submit">Register</button>
      <button type="button" @click="backToLogin">Back</button>
    </form>
  </div>
</template>

<script>
import router from "@/Router/index.js";
import apiService from "@/service/apiService"; // Import the apiService

export default {
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    async register() {
      try {
        console.log("Submitting registration form...");

        // Prepare the request payload
        const requestData = {
          userName: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
        };

        // Call the backend API to register the user
        const response = await apiService.post("/user/register", requestData);

        if (response.status === 200) {
          console.log("Registration successful", response.data);

          // Navigate to the OTP confirmation page with the user data
          router.push({
            path: "/register-confirm",
            query: {
              userName: this.username,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName,
              base32SecretKey: response.data, // Assuming response.data is the base32SecretKey
            },
          });
        } else {
          console.error("Registration failed", response.data);
          // Handle error (e.g., display error message to the user)
        }
      } catch (error) {
        console.error("An error occurred during registration:", error);
        // Handle error (e.g., display error message to the user)
      }
    },
    backToLogin() {
      console.log("Back to login");
      router.push("/login");
    },
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
