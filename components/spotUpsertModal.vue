<template>
  <b-modal :visible="visible"
           @change="onModalStateChanged"
           size="lg"
           lazy>
    <template>
      <h1>スポット登録</h1>
      <p>このお店はどんなお店ですか?</p>
      <p>{{ message }}</p>
      <b-form-group label="名前">
        <b-form-input id="name" type="text" v-model="spotInput.name" />
      </b-form-group>
      <b-form-group  label="場所">
        <b-form-input id="address" type="text" v-model="spotInput.address" />
      </b-form-group>
      <b-form-group label="価格帯">
        <b-form-input id="price" type="text" v-model="spotInput.priceRange" />
      </b-form-group>
      <b-form-group label="適正人数">
        <b-form-input id="numberOfPeople" type="text" v-model="spotInput.numberOfPeople" />
      </b-form-group>
      <b-form-group label="特徴">
        <b-form-input id="description" type="text" v-model="spotInput.description" />
      </b-form-group>
    </template>
    <template slot="modal-footer">
      <b-button variant="primary" @click="onOK" :disabled="!spotIsValid">{{ okBtnName }}</b-button>
      <b-button @click="onCancel">キャンセル</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: [
    'description',
    'okBtnName',
    'visible'
  ],  
  data () {
    return {
      spotInput: {
        name: '',
        address: '',
        priceRange: '',
        numberOfPeople: '',
        description: '',
        ownerId: this.$store.getters['auth/user'].userId
      },
      message:''
    }
  },
  computed: {
    spotIsValid () { return true } // TODO
  },
  methods: {
    onOK () {
      this.$emit('ok', this.spotInput)
    },
    onCancel () {
      this.$emit('cancel')
    },
    onModalStateChanged (val) {
      if (val === true) {
        // TODO
        this.spotInput.name = ''
        this.spotInput.description = ''
      }
      this.$emit('update:visible', val)
    }
  }
}
</script>

