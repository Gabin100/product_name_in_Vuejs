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
                <p class="btn btn-outline-success">Cart {{cart}}</p>
            </div>
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
            cart:0
        }
    },
    methods:{
        addToCart(){
            this.cart +=1
        },updateProductImg(index){
                this.selectedValiant = index
                console.log(index)
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

var app = new Vue({
    el:'#app',
    data:{
        premium:true
    }
    
})