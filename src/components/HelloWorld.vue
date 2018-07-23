<template>
  <div id="app">
    <div class="container">
      <!-- Kitten card section -->
      <section class="mt-5">
        <div class="row">
          <div class="col-md-10 offset-sm-1">
            <div class="row">
              <div class="col-md-10 offset-sm-1">
                <div class="row">
                  <div class="col-md-4 offset-sm-4 text-center">
                    <!-- Card start -->
                    <div class="card cat-card shadow p-3 mb-5 bg-white rounded">
                        <div class="row justify-content-between v-middle-align">
                          <div class="col-6">
                         <img class="card-img-top kittens-logo" src="../assets/img/kittens-logo.jpg" alt="Card image cap">
                          </div>
                          <div class="col-6">
                           <img class="card-img-top profile-pic float-right" src="../assets/img/profile-pic.jpg" alt="Card image cap">
                          </div>
                        </div>
                       <!-- Condition for displaying error message-->
                       <span v-if="!info.length" class="card-text text-warning text-uppercase mt-5">
                         <h2>
                           out of cats! <br/>
                         </h2>
                        But there's more right   
                        <a href="https://www.reddit.com/r/CatGifs/" class="text-primary text-uppercase" target="_blank">here!</a>
                        </span>
                      <div class="card-body text-center mt-5" v-if="errored">
                        <h2>
                          <p>Oh noes! </p>
                        </h2> <br/> The kittens must be having a nap because we can't find any! <br/><br/>
                        <p>Please try again in a bit or get your meow fix 
                          <a href="https://www.reddit.com/r/CatGifs/" class="text-primary text-uppercase" target="_blank">here!</a>
                        </p>
                      </div>
                      <vue-swing @throwout="onThrowout" :config="config" ref="vueswing">
                        <div class="card-body cat-info pt-1 px-0"  v-for="item in info" :key="item.id">
                        
                      
                          <img class="card-img-top cat-img pr-3" v-bind:src="item.images[0]" alt="Cat">
                            <div class="card-body pl-1">
                            <h5 class="card-title mt-2">{{ item.name }}</h5>
                            <small class="card-text mb-2">Hobbies: {{ item.bio }}</small>
                            </div>
                        </div>
                      </vue-swing>

                      <div class="card-body actions text-center" v-if="!errored && info.length">
                        <div class="card-text">
                          <span v-if="matched" class="font-weight-bold text-success">It's a match!</span>
                          <span v-if="loved" class="font-weight-bold text-success">Soulmates!</span>
                          <span v-else> &nbsp; </span>
                        </div>
                        <div class="row justify-content-around action-icons mt-4">
                          <div class="col-3">
                            <i @click="dislike" class="fas fa-times fa-2x icon-dislike"></i>
                          </div>
                          <div class="col-6">
                            <i class="far fa-star fa-hover-hidden fa-3x icon-love"></i>
                            <i @click="love" class="fa fa-star fa-hover-show fa-3x icon-love"></i>
                          </div>
                          <div class="col-3">
                            <i class="far fa-heart fa-hover-hidden fa-2x icon-like"></i>
                            <i @click="like" class="fa fa-heart fa-hover-show fa-2x icon-like"></i>
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
        loved: false,  //sad face
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
         console.log(`Disliked!`)
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
          this.matched = true
          setTimeout (() => {
            this.matched = false 
            cards[cards.length - 1].throwOut(1, 0)
            setTimeout(() => {
            this.info.pop()
            }, 100)      
          }, 1000)
            console.log(`Matched ${this.info[index].name}!`)
        }
      },
      love(){
        // When superliked or loved, always count as a match
        this.loved = true
        this.matched = true
        setTimeout (() => {
          const cards = this.$refs.vueswing.cards
          const index = cards.length - 1
          cards[cards.length - 1].throwOut(1, 0)
          setTimeout(() => {
            this.info.pop()
            }, 100)
          console.log(`Loved ${this.info[index].name}!`)
        }, 1000)
      },
      onThrowout({
        target,
        throwDirection
      }) {
        this.loved = false
        this.matched = false
      }
    },
  
    // Retrieve data and assign it using the 'mounted' lifecycle hook
    mounted() {
      axios
        .get("http://my-json-server.typicode.com/airtame/kittens/kittens")
        // For testing error:
        // .get("http://my-json-server.typicode.com") 
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
.profile-pic {
  width: 2rem;
  height: 2rem;
  margin: 1rem 0.3rem;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #ff3300, 0 0 0 4px white, 0 0 0 5px #ff3300,
    2px 3px 2px 1px rgba(0, 0, 0, 1);
}

.cat-card {
  width: 18rem;
  height: 34rem;
}
.cat-img {
  height: 15rem;
  object-fit: cover;
}

.cat-info {
  background-color: #fff;
  position: absolute;
}

.actions {
  width: 16rem;
  position: absolute;
  z-index: 999;
  margin-top: 25rem;
}
</style>
