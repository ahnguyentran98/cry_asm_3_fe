<template>
  <div class="container">
    <h3 class="title">Notices</h3>
    <table class="notices-table">
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
  </div>
</template>

<script>
export default {
  name: 'ViewMessage',
  data() {
    return {
      notices: [
        {
          id: 10,
          content: "Hi all,\nWe will meet 9pm tonight.",
          author: "tungtot",
          date: "10-Sep-20",
          label: "Top Secret",
        },
        {
          id: 17,
          content: "Dear all, This world is wonderful!",
          author: "alice",
          date: "10-Sep-20",
          label: "Confidentiality",
        },
      ],
    };
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
  color: #000; /* Ensure the title is black */
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
  color: #000; /* Ensure text is black */
}

.notices-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.notices-table td {
  background-color: #ffffff;
}

h3 {
  color: #000; /* Ensure the heading is black */
}
</style>
