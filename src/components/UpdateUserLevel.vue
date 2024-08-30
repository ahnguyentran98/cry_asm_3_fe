<template>
    <div class="container">
      <div class="form-card">
        <h3>Update User Level</h3>
        <form @submit.prevent="submitForm">
          <!-- Input for username -->
          <label for="username">User Name</label>
          <input type="text" id="username" v-model="userName" />
  
          <!-- Dropdown for selecting user level -->
          <label for="userLevel">Select Level</label>
          <select id="userLevel" v-model="userLevel">
            <option>TOP_SECRET</option>
            <option>SECRET</option>
            <option>CONFIDENTIAL</option>
            <option>UNCLASSIFIED</option>
          </select>
  
          <!-- Success message -->
          <p v-if="formSubmitted">{{ responseMessage }}</p>
  
          <!-- Buttons for submit and back -->
          <div class="button-container">
            <button type="submit">Submit</button>
            <button type="button" @click="backToUserInfo" class="back-button">Back</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import apiService from "@/service/apiService"; // Correct import path
  import router from "@/Router"; // Import router for navigation
  
  export default {
    data() {
      return {
        userName: "", // To store the input username
        userLevel: "TOP_SECRET", // Default level
        formSubmitted: false,
        responseMessage: ''
      };
    },
    methods: {
      async submitForm() {
        try {
          // Prepare the request data
          const requestData = {
            userName: this.userName,
            label: this.userLevel,
          };
  
          // Call the backend API to update user level
          const response = await apiService.post("/user/label", requestData);
  
          if (response.status === 200) {
            console.log("User level updated successfully", response.data);
            this.formSubmitted = true; // Show success message
            // Optionally, clear the form or perform other actions
            this.userName = '';
            this.userLevel = 'TOP_SECRET';
            this.responseMessage = 'User level updated successfully';
          } else {
            console.error("Failed to update user level", response.data);
            this.formSubmitted = true;
            this.responseMessage = response.data.message
            // Handle error case
          }
        } catch (error) {
          console.error("An error occurred while updating user level:", error);
          this.formSubmitted = true;
          this.responseMessage = error.response.data.message
          // Handle error case
        }
      },
      backToUserInfo() {
        router.push("/user-info");
      },
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
  
  input,
  select {
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
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
  </style>
  