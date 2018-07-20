<template>
  <div id="app">
    <div class="container text-center w-25 p-3">
      <span v-for="item in info" :key="item.id">
        <p><b>{{item.name}}</b></p>
        <img style="width:18rem" v-bind:src="item.images[0]"> <br/>
        <p><i>Hobbies: {{ item.bio }}</i></p>
        <hr/>
        </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('http://my-json-server.typicode.com/airtame/kittens/kittens/')
      .then(response => (this.info = response.data))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
