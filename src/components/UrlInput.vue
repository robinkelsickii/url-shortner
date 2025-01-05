<template>
  <div class="url-input-container">
    <h1>Url Shortener</h1>
    <label for="url-input">Enter Url:</label>
    <input
      id="url-input"
      v-model="url"
      type="text"
      placeholder="Enter a Valid Url"
      @input="clearShortenedUrl"
    />

    <button @click="shortenUrl" :disabled="!url">Generate Short Url</button>

    <div v-if="shortenedUrl">
      <p>Shortened Url</p>
      <a :href="shortenedUrl" target="_blank">{{ shortenedUrl }}</a>

      <button @click="copyToClipboard" :disabled="!shortenedUrl">Copy to Clipboard</button>
    </div>

    <div v-if="err" class="error">
      <p>{{ err }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const baseUrl = 'https://is.gd/create.php?format=json&url='

const url = ref('')
const shortenedUrl = ref(null)
const err = ref('')

const shortenUrl = async () => {
  try {
    if (!url.value) {
      err.value = 'Please enter a valid URL'
      return
    }
    err.value = '' // Reset error message before making request

    const response = await axios.get(`${baseUrl}${url.value}`)
    // Assuming the API response has 'shorturl' key, update shortenedUrl
    shortenedUrl.value = response.data.shorturl
  } catch (error) {
    console.error(error)
    err.value = 'An error occurred while shortening the URL. Please try again.'
  }
}

const copyToClipboard = () => {
  navigator.clipboard
    .writeText(shortenedUrl.value)
    .then(() => {
      alert('Copied to clipboard')
    })
    .catch((err) => {
      alert('Failed to copy to clipboard', err)
    })
}

const clearShortenedUrl = () => {
  shortenedUrl.value = null
  err.value = ''
}
</script>

<style scoped>
input {
  padding: 0.5rem;
  width: 300px;
  margin-right: 1rem;
}

button {
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

a {
  display: block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
