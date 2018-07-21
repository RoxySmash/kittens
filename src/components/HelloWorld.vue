<template>
  <div class="container">
    <section class="kitten-card mt-5">
      <div class="row">
        <div class="col-md-10 offset-sm-1">
          <div class="row">
            <div class="col-md-10 offset-sm-1">
              <div class="row">
                <div class="col-md-4 offset-sm-4 text-center">
                  <div class="card shadow p-3 mb-5 bg-white rounded" v-for="item in info" :key="item.id" style="width: 18rem;">
                    <img class="card-img-top" v-bind:src="item.images[0]" alt="Cat">
                    <div class="card-body">
                      <h5 class="card-title">{{ item.name }}</h5>
                      <p class="card-text">{{ item.bio }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Cras justo odio</li>
                      <li class="list-group-item">Dapibus ac facilisis in</li>
                    </ul>
                    <div class="card-body">
                      <a href="#" class="card-link">Dislike</a>
                      <a href="#" class="card-link">Superlike</a>
                      <a href="#" class="card-link">Like</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/*eslint-disable*/
  import axios from "axios";
  export default {
    name: "app",
    data() {
      return {
        info: null
      };
    },
    mounted() {
      axios
        .get("http://my-json-server.typicode.com/airtame/kittens/kittens/")
        .then(response => (this.info = response.data));
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
