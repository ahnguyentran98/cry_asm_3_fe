<template>
  <div class="container">
    <div class="card">
      <p class="welcome-text">Welcome {{ user.firstName }} {{ user.lastName }}</p>
      <ul>
        <li><router-link to="/post-message">View news</router-link></li>
        <li><router-link to="/view-message">Write news</router-link></li>
        <li><router-link to="/login" @click="logout">Logout</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeCard",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        label: "",
        date: new Date().toLocaleDateString(),
      },
    };
  },
  created() {
    // Fetch user info from local storage
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        // Parse the user information from JSON format
        this.user = JSON.parse(userInfo);
      } catch (error) {
        console.error("Error parsing user info from local storage:", error);
      }
    } else {
      console.warn("No user info found in local storage.");
      // Optionally, you might want to redirect to the login page if no user info is found
      this.$router.push("/login");
    }
  },
  methods: {
    logout() {
      // Clear user info from local storage on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("jwt"); // If you stored JWT separately, remove it too
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: start;
  padding: 10px;
}

.welcome-text {
  margin: 0;
  font-weight: bold;
  color: black;
}

.card {
  background-color: #d0e4f7;
  border: 1px solid #1c4e8a;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
}

.card p {
  margin: 0;
  font-weight: bold;
}

.card ul {
  list-style-type: none;
  padding: 0;
}

.card li {
  margin-top: 10px;
}

.card a {
  text-decoration: none;
  color: blue;
}
</style>
