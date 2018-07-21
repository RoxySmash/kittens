<template>
  <div class="container">
    <!-- Condition for displaying error message-->
    <section class="text-center mt-5" v-if="errored">
      <h2>
        <p>Oh noes! </p>
      </h2> <br/> The kittens must be having a nap because we can't find any! <br/>
      <p>Please try again in a bit or navigate here</p>
    </section>
    <!-- Kitten card section -->
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
    <!-- End of kitten card section -->
  </div>
</template>

<script>
/*eslint-disable*/
  import axios from "axios";

  export default {
    name: "app",
    // Create data property for our info
    data() {
      return {
        info: null,
        loading: true,
        errored: false
      };
    },
    // Retrieve data and assign it using the 'mounted' lifecycle hook
    mounted() {
      axios
        //.get("http://my-json-server.typicode.com/airtame/kittens/kittens")
        .get("http://my-json-server.typicode.com")
        .then(response => {
          this.info = response.data
        })
        // Display error message if information cannot be retrieved
        .catch(error => {
          console.log(error, 'Cannot retrieve data, initiate panic mode!')
          this.errored = true
        })
        .finally(() => this.loading = false)
  
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
