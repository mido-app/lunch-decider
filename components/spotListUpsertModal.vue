<template>
  <b-modal :visible="visible"
           @change="onModalStateChanged"
           lazy>
    <template>
      <p>{{ description }}</p>
      <b-form-group label="名前"
                    label-for="spotListName"
                    :state="spotListNameIsValid"
                    :invalid-feedback="spotListNameFeedback">
        <b-form-input id="spotListName"
                      type="text"
                      v-model="spotListInput.name" />
      </b-form-group>
      <b-form-group label="説明"
                    label-for="spotListDescription">
        <b-form-input id="spotListDescription"
                      type="text"
                      v-model="spotListInput.description" />
      </b-form-group>
    </template>
    <template slot="modal-footer">
      <b-button variant="primary" @click="onOK" :disabled="!spotListNameIsValid">{{ okBtnName }}</b-button>
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
      spotListInput: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    spotListNameIsValid () {
      if (this.spotListInput.name) return true
      else return false
    },
    spotListNameFeedback () {
      if (this.spotListInput.name) return '名前は必須です'
      else return null
    },
    modalVisible () {
      return this.visible
    }
  },
  methods: {
    onOK () {
      this.$emit('ok', this.spotListInput)
    },
    onCancel () {
      this.$emit('cancel')
    },
    onModalStateChanged (val) {
      if (val === true) {
        this.spotListInput.name = ''
        this.spotListInput.description = ''
      }
      this.$emit('update:visible', val)
    }
  }
}
</script>
