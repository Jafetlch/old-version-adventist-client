<template>
  <v-img
          :src="data.imageCharge ? `${this.$store.getters.getFeatherUrl}images/${data.path}` : imageUrl"
          :lazy-src="data.imageCharge ? `${this.$store.getters.getFeatherUrl}images/${data.path}` : imageUrl"
          aspect-ratio="0"
          height="400px"
          class="grey lighten-4"
          @dragenter="OnDragEnter"
          @dragleave="OnDragLeave"
          @dragover.prevent
          @drop="onDrop">
          <v-layout pa-2 column fill-height class="white--text">
            <v-flex shrink>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked">
                <v-btn small fab dark color="primary" @click="pickFile">
                  <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn small fab dark color="primary" @click="send">
                  <v-icon dark>warning</v-icon>
                </v-btn>
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0>
            <p class="grey--text font-weightlight headline">
              Arrastra aquí la imagen
            </p>
          </v-layout>
        </v-img>
</template>

<script>
import Axios from '@/plugins/axios'
export default {
  name: 'Test',
  data: () => ({
    stepper: 1,
    departments: [],
    data: {
      title: null,
      description: null,
      fragment: null,
      place: null,
      guest: [],
      published: true,
      path: null,
      imageCharge: false
    },
    // Image Control
    isDragging: false,
    dragCount: 0,
    files: [],
    images: '',

    selectRadio: 'unions',
    parentSelected: null,
    departmentSelected: null,

    imageName: '',
    imageUrl: '',
    imageFile: '',

    date: null,
    modalDate: false,
    time: null,
    modalTime: false
  }),
  methods: {
    send () {
      console.log(this.data)
      
      Axios.post('/api/advertisements', {
        'image': this.data.imageUrl
      })
      .then((response) => {
        if (response.data.response) {
          console.log(response)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // Image
    pickFile () {
      this.$refs.image.click ()
    },
    onFilePicked (e) {
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        if(this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },

    OnDragEnter(e) {
        e.preventDefault()
        this.dragCount++
        this.isDragging = true
        return false
    },
    OnDragLeave (e) {
      e.preventDefault()
      this.dragCount--
      if (this.dragCount <= 0) {
        this.isDragging = false
      }
    },
    onInputChange (e) {
      const files = e.target.files
      Array.from(files).forEach(file => this.addImage(file))
    },
    onDrop (e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragging = false
      const files = e.dataTransfer.files
      Array.from(files).forEach(file => this.addImage(file))
    },
    addImage (file) {
      if (!file.type.match('image.*')) {
          return
      }
      const reader = new FileReader()
      reader.onload = (e) => this.imageUrl = e.target.result
      reader.readAsDataURL(file)
    },
  }
}
</script>
