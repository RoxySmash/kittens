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
                    <!-- Card start -->
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded">
                      <vue-swing @throwout="onThrowout" :config="config" ref="vueswing">
                        <div class="card-body cat-info" v-for="item in info" :key="item.id">
                          <img class="card-img-top cat-img" v-bind:src="item.images[0]" alt="Cat">
                          <h5 class="card-title mt-2">{{ item.name }}</h5>
                          <p class="card-text mb-2">Hobbies: {{ item.bio }}</p>
                        </div>
                      </vue-swing>
                      
                      <div class="card-body actions text-center">
                        <div class="card-text font-weight-bold text-success">
                          <span v-if="matched">It's a match!</span>
                          <span v-if="loved">Soulmates!</span>
                        </div>
                        <div class="row justify-content-around">
                          <div class="col-4">
                            <button @click="dislike" type="button" class="btn btn-primary">Dislike</button>
                          </div>
                          <div class="col-4">
                            <button @click="love" type="button" class="btn btn-primary">Love</button>
                          </div>
                          <div class="col-4">
                            <button @click="like" type="button" class="btn btn-primary">Like</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Card end -->
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
        loved: false,
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
        info: [],
      }
    },
    methods: {
      dislike() {
        const cards = this.$refs.vueswing.cards
        cards[cards.length - 1].throwOut(-1, 0)
        setTimeout(() => {
          this.info.pop()
        }, 150)
         console.log(`Disliked ${target.textContent}!`)
      },
      like() {
        const cards = this.$refs.vueswing.cards
        const index = cards.length - 1
        if (this.info[index].likesYou == false) {
          cards[cards.length - 1].throwOut(1, 0)
          setTimeout(() => {
            this.info.pop()
          }, 100)
          console.log(`Liked ${this.info[index].name}!`)
      }
        else {
          if (this.matched){
          this.matched = false 
          cards[cards.length - 1].throwOut(1, 0)
          setTimeout(() => {
          this.info.pop()
          }, 100)
          console.log(this.matched)
         }
          else {
          this.matched = true
          console.log(`Matched ${this.info[index].name}!`)
         }          
        }
      },
      love(){
        this.loved = true
        this.matched = true
        const cards = this.$refs.vueswing.cards
        const index = cards.length - 1
        cards[cards.length - 1].throwOut(1, 0)
          setTimeout(() => {
          this.info.pop()
          }, 100)
        console.log(`Loved ${this.info[index].name}!`)
      },
      onThrowout({
        target,
        throwDirection
      }) {
        this.matched = false
        console.log(`Didn't match ${target.textContent}!`)
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
  padding-top: 27rem;
}

.cat-img {
  width: 14rem;
  height: 15rem;
  object-fit: cover;
  /* object-fit: cover; */
}
.card {
  width: 18rem;
  height: 32rem;
}

.cat-info {
  background-color: white;
  position: absolute;
}
</style>
