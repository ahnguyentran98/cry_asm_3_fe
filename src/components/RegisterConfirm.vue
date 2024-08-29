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
        <input type="number" id="otp" v-model="otp" />
      </div>
      <button type="submit">Confirm OTP</button>
      <button type="button" @click="backToLogin">Back to Login</button>
    </form>
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
      firstName: "",
      lastName: "",
      base32SecretKey: "",
      otp: null,
    };
  },
  created() {
    // Get user data from query params
    this.userName = this.$route.query.userName;
    this.password = this.$route.query.password;
    this.firstName = this.$route.query.firstName;
    this.lastName = this.$route.query.lastName;
    this.base32SecretKey = this.$route.query.base32SecretKey;
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

          // The response contains the UserRes object. You can access its properties here
          const userRes = response.data;
          console.log('User registered:', userRes);

          // Redirect to a success page or perform other success actions
          router.push("/login");
        } else {
          console.error("OTP confirmation failed", response.data);
          // Handle error (e.g., display error message to the user)
        }
      } catch (error) {
        console.error("An error occurred during OTP confirmation:", error);
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
</style>
