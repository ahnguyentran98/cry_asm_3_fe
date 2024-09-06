<template>
  <div class="submit-otp-container">
    <h1>Enter your OTP</h1>
    <form @submit.prevent="submit">
      <div class="otp-input">
        <input id="otp" type="text" v-model="otp" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <h2 v-if="otpErr">Wrong OTP, Please check again</h2>
  </div>
</template>

<script>
import router from "@/Router/index.js";
import apiService from "@/service/apiService"; // Correct import path

export default {
  data() {
    return {
      otp: "",
      otpErr: false,
      userName: "",
    };
  },
  created() {
    // Get user data from query params
    this.userName = this.$route.query.userName;
  },
  methods: {
    async submit() {
      console.log("Submitting OTP, checking...");

      try {
        // Prepare the request payload
        const requestData = {
          userName: this.userName,
          otp: this.otp,
        };

        // Call the backend API to validate the OTP
        const response = await apiService.post("/user/login-otp", requestData);

        if (response.status === 200) {
          console.log("OTP validation successful", response.data);

          // Get user info from the response
          const userInfo = response.data;

          // Save user info and JWT token to local storage
          localStorage.setItem("userInfo", JSON.stringify({
            id: userInfo.id,
            userName: userInfo.userName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            role: userInfo.role,
            label: userInfo.label,
          }));

          localStorage.setItem("jwt", userInfo.jwt);

          // Redirect to the user info page or any next step
          router.push("/user-info");
        } else {
          console.error("OTP validation failed", response.data);
          this.otpErr = true; // Show error message
        }
      } catch (error) {
        console.error("An error occurred during OTP submission:", error);
        this.otpErr = true; // Show error message
      }
    },
  },
};
</script>

<style scoped>
.submit-otp-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.otp-input {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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
