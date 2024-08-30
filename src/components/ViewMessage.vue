<template>
  <div class="container">
    <h3 class="title">Notices</h3>
    <table class="notices-table" v-if="notices.length != 0">
      <thead>
        <tr>
          <th>ID#</th>
          <th>Content</th>
          <th>Author</th>
          <th>Date</th>
          <th>Label</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notice in notices" :key="notice.id">
          <td>{{ notice.id }}</td>
          <td>{{ notice.content }}</td>
          <td>{{ notice.author }}</td>
          <td>{{ notice.date }}</td>
          <td>{{ notice.label }}</td>
        </tr>
      </tbody>
    </table>
    <div class="title" v-if="notices.length === 0">No news existed</div>
    <button type="button" @click="backToUserInfo" class="register-button">Back</button>
  </div>
</template>

<script>
import apiService from "@/service/apiService"; // Correct import path
import router from "@/Router/index.js";

export default {
  name: 'ViewMessage',
  data() {
    return {
      notices: [], // Initialize as an empty array
    };
  },
  created() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        // Get user info from local storage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo || !userInfo.id) {
          console.warn("User info not found in local storage. Redirecting to login.");
          this.$router.push("/login");
          return;
        }
        
        const userId = userInfo.id;

        // Call the backend API to fetch the news for the user
        const response = await apiService.get(`/news/${userId}`);

        if (response.status === 200) {
          console.log("News fetched successfully", response.data);

          // Map the response data to the notices array
          this.notices = response.data.map(news => ({
            id: news.id,
            content: news.content,
            author: news.user.userName, // Assuming user object contains userName
            date: new Date(news.date).toLocaleDateString(), // Format the date
            label: news.label,
          }));
        } else {
          console.error("Failed to fetch news", response.data);
          // Handle the error case
        }
      } catch (error) {
        console.error("An error occurred while fetching news:", error);
        // Handle the error case
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
  background-color: #d0e4f7;
  padding: 20px;
  border: 1px solid #1c4e8a;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
}

.title {
  color: #000;
  font-weight: bold;
  margin-top: 0;
}

.notices-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.notices-table th,
.notices-table td {
  border: 1px solid #1c4e8a;
  padding: 8px;
  text-align: left;
  color: #000;
}

.notices-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.notices-table td {
  background-color: #ffffff;
}

h3 {
  color: #000;
}
</style>
