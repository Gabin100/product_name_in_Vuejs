Vue.component('product',{
    props: {
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:`
    <div class="product row">
            <!--Product image-->
            <div class="product-image col-md-3">
                <img v-bind:src="image" alt="" class="img-thumbnail">
            </div>
            <!--product information-->
            <div class="product-info col-md-9">
                <!--Product goes here-->
                <h1>{{title}}</h1>
                <p v-if="inStock">In stock</p>
                <p v-else>out stock</p>
                <p>Shipping is: {{shipping}}</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div v-for="(variant, index) in variants" 
                :key="variant.variantId" 
                class="color-box" 
                :style="{ backgroundColor:variant.variantColor }"
                @mouseover="updateProductImg(index)">
                </div>
                <button class="btn btn-primary mt-3" 
                v-on:click="addToCart"
                :disabled="!inStock"
                :class="{disabled:!inStock}">Add to cart</button>
            </div>
            <div class="card col-12 mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title">Reviews</h5>
                    <h6 class="card-subtitle mb-2 text-muted" v-if="!reviews.length">There are No reviews yet.</h6>
                    <p class="card-text">
                        <ul>
                            <li v-for="review in reviews">
                            <p><strong>{{review.name}}</strong></p>
                            <p>Rating: {{review.rating}}</p>
                            <p>{{review.review}}</p>
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
            <product-review @review-submitted="addReview"></product-review'>
        </div>
    `,
    data(){
        return {
            brand: "Vue Master",
            product: 'Socks',
            selectedValiant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants:[
                {
                    variantId:2234,
                    variantColor:"Green",
                    variantImage:"./public/images/vmSocks-green.png",
                    variantQuantity:10
                },{
                    variantId:2235,
                    variantColor:"Blue",
                    variantImage:"./public/images/vmSocks-blue.png",
                    variantQuantity:0
                }
            ],
            reviews:[]
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedValiant].variantId)
        },
        updateProductImg(index){
                this.selectedValiant = index
                console.log(index)
        },
        addReview(productReview){
            this.reviews.push(productReview)
        }
    },
    computed:{
        title() {
            return this.brand + ' ' + this.product
        },
    image(){
        return this.variants[this.selectedValiant].variantImage 
    },
    inStock(){
        return this.variants[this.selectedValiant].variantQuantity
    },
    shipping(){
        if(this.premium){
            return "Free"
        }else{
            return 2.99
        }
    }
    }
})
Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" class="text-danger">{{error}}</li>
            </ul>
        </p>
        <div class="form-group">
            <label for="name">Name:</label>
            <input class="form-control" id="name" placeholder="Your name" v-model="name">
        </div>
        <div class="form-group">
            <label for="review">Review:</label>
            <textarea id="review" class="form-control" v-model="review"></textarea>
        </div>
        <div class="form-group">
            <label for="rating">select Rating:</label>
            <select class="form-control" id="rating" v-model.number="rating">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
        <div class="form-group">
            <input type="submit" class="form-control btn btn-primary" value="Submit">
        </div>        
  </form>
    
    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            errors:[]
        }
    },
    methods:{
        onSubmit(){
            if(this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else{
                if(!this.name) this.errors.push("Name required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.review) this.errors.push("Review required.")
            }
        }
    }
})
var app = new Vue({
    el:'#app',
    data:{
        premium:true,
        cart:[]
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        }
    }
    
})