
<template>
  <div class="otp-confirm-container">
    <h1>OTP Confirmation</h1>
    <div>
      <p>Use the following Base32 Secret Key to set up your OTP application:</p>
      <p><strong>{{ base32SecretKey }}</strong></p>
    </div>
    <form @submit.prevent="confirmOtp">
      <div class="input-field">
        <label for="otp">Enter OTP</label>
        <input type="number" id="otp" v-model="otp"/>
      </div>
      <button type="submit">Confirm OTP</button>
      <button type="button" @click="backToLogin">Back to Login</button>
    </form>

    <!-- Show error message if there's an error -->
    <h2 v-if="otpError">{{ errorMessage }}</h2>
  </div>
</template>

<script>
import router from "@/Router/index.js";
import apiService from "@/service/apiService";

export default {
  data() {
    return {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      base32SecretKey: "",
      otp: null,
      otpError: false,  // Add a flag to track OTP error
      errorMessage: "", // Add a field to display error message
    };
  },
  created() {
    // Retrieve user data from sessionStorage
    this.userName = sessionStorage.getItem("userName");
    this.password = sessionStorage.getItem("password");
    this.firstName = sessionStorage.getItem("firstName");
    this.lastName = sessionStorage.getItem("lastName");
    this.base32SecretKey = sessionStorage.getItem("base32SecretKey");

    if (!this.userName || !this.base32SecretKey) {
      console.error("No user information found, redirecting to login.");
      sessionStorage.clear();
      router.push("/login");
    }
  },
  methods: {
    async confirmOtp() {
      try {
        console.log("Submitting OTP...");

        // Prepare the request payload
        const requestData = {
          userName: this.userName,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          base32SecretKey: this.base32SecretKey,
          otp: this.otp,
        };

        // Call the backend API to confirm the OTP
        const response = await apiService.post("/user/register-otp", requestData);

        if (response.status === 200) {
          console.log("OTP confirmation successful", response.data);
          this.backToLogin();
        } else {
          console.error("OTP confirmation failed", response.data);
          this.handleError(response.data.message + ". Redirecting to login...");
        }
      } catch (error) {
        console.error("An error occurred during OTP confirmation:", error);
        this.handleError(error.response.data.message + ". Redirecting to login...");
      }
    },
    handleError(message) {
      sessionStorage.clear();
      this.otpError = true;  // Set the error flag
      this.errorMessage = message;  // Set the error message
      // Wait for 2 seconds and then navigate to login
      setTimeout(() => {
        this.backToLogin();
      }, 2000);
    },
    backToLogin() {
      console.log("Back to login");
      sessionStorage.clear();
      router.push("/login");
    },
  },
};
</script>

<style scoped>
.otp-confirm-container {
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

h2 {
  color: red;
}
</style>
