<template>
  <div id="app">
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
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded">
                      <vue-swing @throwout="onThrowout" :config="config" ref="vueswing">
                        <div class="card-body cat-info" v-for="item in info" :key="item.id">
                          <img class="card-img-top cat-img" v-bind:src="item.images[0]" alt="Cat">
                          <h5 class="card-title">{{ item.name }}</h5>
                          <p class="card-text">{{ item.bio }}</p>
                        </div>
                      </vue-swing>
                      <div class="card-body actions text-center">
                        <div class="row justify-content-around">
                          <div class="col-4">
                            <button @click="dislike" type="button" class="btn btn-primary">Dislike</button>
                          </div>
                          <div class="col-4">
                            <button type="button" class="btn btn-primary">Love</button>
                          </div>
                          <div class="col-4">
                            <button @click="like" type="button" class="btn btn-primary">Like</button>
                          </div>
                        </div>
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
  </div>
</template>

<script>
  /*eslint-disable no-new*/
  import axios from 'axios';
  import VueSwing from 'vue-swing';
  
  //Vue.component('vue-swing', VueSwing)
  export default {
    name: "app",
  
    components: {
      VueSwing
    },
  
    //Create data property for our info
    data() {
      return {
        info: null,
        loading: true,
        errored: false,
        matched: false,
        config: {
          allowedDirections: [
            VueSwing.Direction.UP,
            VueSwing.Direction.DOWN,
            VueSwing.Direction.LEFT,
            VueSwing.Direction.RIGHT
          ],
          minThrowOutDistance: 250,
          maxThrowOutDistance: 300
        },
        info: []
      }
    },
    methods: {
      add() {
        // this.cards.push(`${this.cards.length}`)
      },
      dislike() {
        const cards = this.$refs.vueswing.cards
        cards[cards.length - 1].throwOut(-1, 0)
        setTimeout(() => {
          this.info.pop()
        }, 150)
      },
      like() {
  
        const cards = this.$refs.vueswing.cards
        cards[cards.length - 1].throwOut(1, 0)
        setTimeout(() => {
          this.info.pop()
        }, 100)
      },
      onThrowout({
        target,
        throwDirection
      }) {
        console.log(`Threw out ${target.textContent}!`)
      }
    },
  
    // Retrieve data and assign it using the 'mounted' lifecycle hook
    mounted() {
      axios
        .get("http://my-json-server.typicode.com/airtame/kittens/kittens")
        //.get("http://my-json-server.typicode.com")
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
.actions {
  position: absolute;
  z-index: 999;
  padding-top: 23rem;
}

.card {
  width: 18rem;
  height: 30rem;
}

.cat-info {
  background-color: white;
  position: absolute;
}
</style>
