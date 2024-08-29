<template>
    <div class="container">
      <div class="form-card">
        <h3>Post message</h3>
        <form @submit.prevent="submitForm">
          <label for="message">Message</label>
          <textarea id="message" v-model="message" rows="5" cols="30"></textarea>
          
          <p>Your level: {{ user.level }}</p>
          
          <label for="messageLevel">Message level</label>
          <select id="messageLevel" v-model="messageLevel">
            <option>Top Secret</option>
            <option>Secret</option>
            <option>Confidential</option>
          </select>
          
          <p v-if="formSubmitted" class="success-message">Successful!</p>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          level: 'Top Secret',
        },
        message: '',
        messageLevel: 'Top Secret',
        formSubmitted: false,
      };
    },
    methods: {
      submitForm() {
        this.formSubmitted = true;
        
        // You can add more logic here for form submission.
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
  }
  
  h3 {
    margin-top: 0;
  }
  
  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  textarea {
    width: 100%;
    margin-bottom: 10px;
  }
  
  select {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .success-message {
    color: red;
    font-weight: bold;
  }
  
  button {
    background-color: #f0f0f0;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  