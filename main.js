Vue.component('product',{
  props: {
    premium:{
      type: Boolean,
      required: true,
      default: false
    }
  },
  template:`
  <div class="product">
      <div class="product-image">
        <img v-bind:src="image"/>
      </div>
      
      <div class="product-info">
        <h1>{{ title }}</h1>
        <h2> {{ description }}</h2>
        <p v-if="inStock > 0"> Quantity: {{ inStock }} </p>
        <p v-else :class ="{outOfStock: !inStock}"
        > Out of Stock </p>
        <p> Shipping: {{shipping}}</p>
        
        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>

        <div v-for="(variant,index) in variants"
             :key = "variant.variantId"
             class = "color-box"
             :style="{backgroundColor: variant.variantColor}"
             @mouseover="updateProduct(index)"
        >
        </div>

        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <button @click="addToCart"
                :disabled="!inStock"
                :class="{disabledButton: !inStock }"
        >Add to Cart</button>
        <button @click="removeFromCart">Remove from Cart</button>
        
        <div>
          <h2>Reviews</h2>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
            <li v-for="review in reviews">
              <p>{{review.name}}</p>
              <p>{{review.review}}</p>
              <p>{{review.rating}}</p>
            </li>
          </ul>
        </div>
        
        
        <product-review @review-submitted="addReview"></product-review>

      </div>
   </div>`,
  data(){
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-natural"],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/socks-green.jpg',
          variantQuantity: 0

        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: './assets/socks-blue.jpg',
          variantQuantity: 50
        }
      ],
      sizes: [39,40,41,42,43],
      reviews: [],
    }
  },
  methods:{
    removeFromCart(){
      this.$emit('remove-from-cart',this.variants[this.selectedVariant].variantId )
    },
    addToCart () {
      this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId);
    },
    updateProduct(variantIndex){
      this.selectedVariant = variantIndex;
    },
    addReview(review){
      this.reviews.push(review);
    }
  },
  computed:{
    title(){
      return this.brand + " " +  this.product;
    },
    description(){
      return "This " + this.product + " is awesome";
    },
    image(){
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock(){
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping(){
      return this.premium ? "free" : 2.99+"$";
    }
  }
});

Vue.component('product-review',{
  template: `<form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following errors: </b>
        <ul>
          <li v-for="error in errors">{{error}}</li>
        </ul>
      </p>
      
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>`,
  data(){
    return{
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods:{
    onSubmit(){
      if(this.name && this.review && this.rating){
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        };
        this.$emit('review-submitted', productReview);
        this.name = this.review = this.rating = null;

        this.errors = []
      } else{
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
      }

    }
  }
});



var app = new Vue({
  el:'#app',
  data:{
    premium: true,
    cart: [],
  },
  methods:{
    addToCart(id){
      this.cart.push(id);
    },
    removeFromCart(id){
      this.cart.pop(id);
    }
  }
});