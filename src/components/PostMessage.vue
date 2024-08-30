<template>
  <div class="container">
    <div class="form-card">
      <h3>Post message</h3>
      <form @submit.prevent="submitForm">
        <label for="message">Message</label>
        <textarea id="message" v-model="message" rows="5" cols="30"></textarea>

        <p style="font-weight: bold;">Your level: {{ userLevel }}</p>

        <label for="messageLevel">Message level</label>
        <select id="messageLevel" v-model="messageLevel">
          <option>TOP_SECRET</option>
          <option>SECRET</option>
          <option>CONFIDENTIAL</option>
          <option>UNCLASSIFIED</option>
        </select>

        <p v-if="formSubmitted">{{ responseMessage }}</p>

        <div class="button-container">
          <button type="submit">Submit</button>
          <button type="button" @click="backToUserInfo" class="register-button">Back</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import apiService from "@/service/apiService"; // Correct import path
import router from '@/Router';

export default {
  data() {
    return {
      message: '',
      messageLevel: 'TOP_SECRET', // Default to the first level
      formSubmitted: false,
      userLevel: '', 
      responseMessage: ''
    };
  },
  created() {
    // Fetch user info from local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.id) {
      console.warn("User info not found in local storage. Redirecting to login.");
      this.$router.push("/login");
    } else {
      this.userLevel = userInfo.label; // Extract user level from userInfo
    }
  },
  methods: {
    async submitForm() {
      try {
        // Fetch user info from local storage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo || !userInfo.id) {
          console.warn("User info not found in local storage. Redirecting to login.");
          this.$router.push("/login");
          return;
        }

        const userId = userInfo.id;

        // Prepare the request data
        const requestData = {
          content: this.message,
          label: this.messageLevel,
        };

        // Call the backend API to post the news
        const response = await apiService.post(`/news/${userId}`, requestData);

        if (response.status === 200) {
          console.log("News posted successfully", response.data);
          this.formSubmitted = true; // Show success message
          // Optionally, clear the form or perform other actions
          this.message = '';
          this.messageLevel = 'TOP_SECRET';
          this.responseMessage = 'News posted successfully';
        } else {
          console.error("Failed to post news", response.data);
          this.formSubmitted = true;
          this.responseMessage = response.data.message
          // Handle error case
        }
      } catch (error) {
        console.error("An error occurred while posting news:", error);
        this.formSubmitted = true;
        this.responseMessage = error.response.data.message
        // Handle error case
      }
    },
    backToUserInfo(){
      router.push("/user-info");
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.form-card {
  background-color: #d0e4f7;
  border: 1px solid #1c4e8a;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  color: #000; /* Ensure text color is black for contrast */
}

h3 {
  margin-top: 0;
  color: #000; /* Ensure heading is black */
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  color: #000; /* Ensure label text is black */
}

textarea {
  width: 100%;
  margin-bottom: 10px;
  color: #000; /* Ensure text color is black */
}

select {
  width: 100%;
  margin-bottom: 10px;
  color: #000; /* Ensure text color is black */
}

.success-message {
  color: green; /* Changed to green to differentiate from normal text */
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: space-between; /* Distribute space between buttons */
  margin-top: 10px;
}

button {
  background-color: #f0f0f0;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: #000; /* Ensure button text is black */
}

.register-button {
  margin-left: auto; /* Align Back button to the right */
}
</style>
