<template>
  <b-container>
    <h1>スポット登録</h1>
        <p>このお店はどんなお店ですか?</p>
        <p>{{message}}</p>
        <b-form-group label="名前">
          <b-form-input id="name" type="text" v-model="input.name" />
        </b-form-group>
        <b-form-group  label="場所">
          <b-form-input id="address" type="text" v-model="input.address" />
        </b-form-group>
        <b-form-group label="価格帯">
          <b-form-input id="price" type="text" v-model="input.priceRange" />
        </b-form-group>
        <b-form-group label="適正人数">
          <b-form-input id="numberOfPeople" type="text" v-model="input.numberOfPeople" />
        </b-form-group>
        <b-form-group label="特徴">
          <b-form-input id="description" type="text" v-model="input.description" />
        </b-form-group>
        <b-button variant="primary" @click="addSpotLocal" >登録</b-button>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  
  data () {
    return {
        input: {
          name: "",
          address: "",
          priceRange: "",
          numberOfPeople: "",
          description: "",
          ownerId:null
        },
        message:"",
    }
  },
  
  mounted: function(){
    let authUser = this.$store.getters['auth/user'];
    this.input.ownerId = authUser.userId;
  },
  methods: {
    ...mapActions(["addSpot"]),
    async addSpotLocal() {
        let res = await this.addSpot(this.input)
        this.message = "Success!! registerd at :" + res.path
    }
  }
}
</script>

