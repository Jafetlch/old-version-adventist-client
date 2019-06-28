<template>
  <CustomCard :title="action ? 'Crear' : 'Editar'">
    <v-snackbar
      v-model="snackbar"
      :timeout="6000"
      :color="snackbar_color"
      :top="true"
      :right="true">
      {{ snackbar_message }}
      <v-btn
        flat
        @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-layout v-if="circular_progress" row wrap align-center justify-center pa-5>
      <v-progress-circular size="45" indeterminate color="primary"></v-progress-circular>
    </v-layout>
    <CustomStepper v-else :title="title" :stepper="stepper">
      <v-form v-model="valid" slot="step-one" ref="form" lazy-validation>
        {{ edit }}
        <v-img
          :src="data.imageCharge ? `${this.$store.getters.getFeatherUrl}storage/images-advertisements/${data.path}` : imageUrl"
          :lazy-src="data.imageCharge ? `${this.$store.getters.getFeatherUrl}storage/images-advertisements/${data.path}` : imageUrl"
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

        <v-switch label="Publicar" v-model="data.published" class="mx-2"></v-switch>

        <v-text-field
          v-model="data.title"
          :rules="titleRules"
          :counter="80"
          label="Título *"
          required>
        </v-text-field>

        <template v-if="isFeather">
          <v-radio-group v-model="selectRadio" row  value="unions">
            <v-radio label="Uniones" value="unions"></v-radio>
            <v-radio label="Grupos" value="groups"></v-radio>
            <v-radio label="Iglesias" value="churches"></v-radio>
          </v-radio-group>
          <v-combobox
            v-model="parentSelected"
            :items="getSelectParentData"
            item-value="getSelectParentData.id"
            item-text="name"
            :rules="[v => !!v || 'Item is required']"
            label="Pertenece"
            required>
          </v-combobox>
          <v-combobox
            v-show="(parentSelected !== null)"
            v-model="departmentSelected"
            :items="departments"
            item-value="departments.id"
            item-text="name"
            :rules="[v => !!v || 'Item is required']"
            label="Departamento *"
            clearable
            required>
          </v-combobox>
        </template>
        <v-combobox
          v-else
          v-model="departmentSelected"
          :items="getSelectDepartment"
          item-value="getSelectDepartment.id"
          item-text="name"
          :rules="[v => !!v || 'Item is required']"
          label="Departamento *"
          clearable
          required>
        </v-combobox>
        <v-dialog
          ref="dialogDate"
          v-model="modalDate"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px">
          <v-text-field
            slot="activator"
            v-model="date"
            label="Fecha *"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" scrollable locale="es">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalDate = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialogDate.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
        <v-dialog
          ref="dialogTime"
          v-model="modalTime"
          :return-value.sync="time"
          persistent
          lazy
          full-width
          width="290px">
          <v-text-field
            slot="activator"
            v-model="time"
            label="Hora"
            readonly
          ></v-text-field>
          <v-time-picker
            v-if="modalTime"
            v-model="time"
            full-width>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalTime = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialogTime.save(time)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-text-field
          v-model="data.place"
          :counter="50"
          label="Lugar">
        </v-text-field>
        <v-combobox
          v-model="data.guest"
          label="Invitados al evento"
          chips
          clearable
          multiple>
          <template slot="selection" slot-scope="data">
            <v-chip
              :selected="data.selected"
              close
              @input="remove(data.item)">
              <strong>{{ data.item }}</strong>&nbsp;
            </v-chip>
          </template>
        </v-combobox>
        <v-textarea
          v-model="data.fragment"
          label="Fragmento de la noticia *"
          :rules="fragmentRules"
          :counter="80"
          auto-grow
          class="my-3"
          required>
        </v-textarea>
        <span class="subheading grey--text">Descripción * <span class="caption primary--text">(Beta)</span></span>
        <v-flex xs12 mt-2 mb-3>
          <vue-editor v-model="data.description" :rules="descriptionRules" required></vue-editor>
        </v-flex>
        <template v-if="imageUrl || this.data.path">
          <v-btn color="primary" depressed :disabled="!valid" @click="verificationSubmit">
            Continuar
          </v-btn>
        </template>
        <v-btn depressed @click="clear">Cancelar</v-btn>
      </v-form>

      <v-flex slot="step-two">
        <v-flex class="mb-4">
          <v-img
            :src="data.imageCharge ? `${this.$store.getters.getFeatherUrl}storage/images-advertisements/${data.path}` : imageUrl"
            :lazy-src="data.imageCharge ? `${this.$store.getters.getFeatherUrl}storage/images-advertisements/${data.path}` : imageUrl"
            aspect-ratio="0"
            height="400px"
            class="grey lighten-4">
          </v-img>
          <v-divider class="my-3"></v-divider>
          <h6>
            <span class="headline">{{ data.title }}</span>
          </h6>
          <span class="subheading grey--text" v-if="departmentSelected !== null">{{ departmentSelected.name }}</span>

          <v-divider class="my-3"></v-divider>

          <p><span class="font-weight-bold">Published: </span>{{ new Date().toISOString().substr(0, 10) }}</p>
          <p><span class="font-weight-bold">Event Date: </span> {{ date }}</p>

          <v-divider class="my-3"></v-divider>
          <p><span class="font-weight-bold">Hora: </span>{{ time }}</p>
          <p><span class="font-weight-bold">Lugar: </span>{{ data.place }}</p>
          <div>
            <span class="font-weight-bold">Invitados: </span>
            <p v-for="g in data.guest" :key="g" class="mr-3 my-1">
              {{ g }}
            </p>
          </div>
          <v-divider class="my-3"></v-divider>

          <p><span class="font-weight-bold">Fragment: </span>{{ data.fragment }}</p>
          <div>
            <span class="font-weight-bold">Description: </span>
            <p v-html="data.description"></p>
          </div>

        </v-flex>
        <v-btn color="primary" @click="saveData" v-text="action ? 'Crear' : 'Guardar'"></v-btn>
        <v-btn flat @click="stepper = 1">Cancel</v-btn>
      </v-flex>
    </CustomStepper>
  </CustomCard>
</template>

<script>
import formRulesMixin from '@/mixins/mixin_rules'
import CustomCard from '@/components/CustomCard'
import CustomStepper from '@/components/CustomStepper'

import { createData, getDataWithParams } from '@/helper/data_getters'
import { getCommitEdit, getDispatch, getDataFrom } from '@/helper/snnipets'
import Axios from '@/plugins/axios'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'CreateEditAdvertisements',
  mixins: [
    formRulesMixin
  ],
  props: {
    title: {
      type: String,
      required: true
    },
    action: {
      type: Boolean,
      default: true
    },
    go: {
      type: String,
      default: 'news'
    }
  },
  components: {
    CustomCard,
    CustomStepper,
    VueEditor
  },
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
    time: '',
    modalTime: false,
    //
    circular_progress: false,
    snackbar: false,
    snackbar_message: 'Hola!',
    snackbar_color: 'primary'
  }),
  mounted () {
    // $('html, body').animate({ scrollTop: 0 }, 'fast')
    if (this.$store.getters.getCurrentUser.role_id === 1) {
      if (this.getSelectParentData.length) {
        return null
      } else {
        this.$store.dispatch('getDataUnions')
        this.$store.dispatch('getDataGroups')
        this.$store.dispatch('getDataChurches')
      }
    } else {
      if (!this.getSelectDepartment) {
        return
      }
      getDataFrom(this.$store.getters.getCurrentUser.role_id, 'getDataDepartments', 'getDataDepartmentsWithParams')
    }
  },
  watch: {
    parentSelected () {
      this.getSelectDepartmentFTH()
    },
    imageUrl () {
      this.data.imageCharge = false
    }
  },

  computed: {
    getSelectParentData () {
      if (this.isFeather) {
        switch (this.selectRadio) {
          case 'unions':
            return this.$store.getters.getUnions
          case 'groups':
            return this.$store.getters.getGroups
          case 'churches':
            return this.$store.getters.getChurches
          default:
            return this.$store.getters.getUnions
        }
      }
      return null
    },
    getSelectDepartment () {
      if (!this.isFeather) {
        return this.$store.getters.getDepartments
      }
      return null
    },
    /* eslint-disable */
    edit () {
      if (!this.action) {
        const dataNews = this.$store.getters.getIdAdvertisements
        this.data.id = dataNews.id
        this.data.title = dataNews.title
        this.data.description = dataNews.description
        this.data.fragment = dataNews.fragment
        this.data.published = dataNews.published.toString() === '1'
        this.data.publicationDate = dataNews.publicationDate
        this.departmentSelected = dataNews.department
        this.date = dataNews.eventDate
        this.time = dataNews.time
        this.data.place = dataNews.place
        this.data.guest = dataNews.guest ? dataNews.guest.split(",") : ''
        this.data.imageCharge = true
        this.data.path = dataNews.image.path
      }
    },
    isFeather () {
      return this.$store.getters.getCurrentUser.role_id.toString() === '1'
    }
  },

  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    getSelectDepartmentFTH () {
      if (this.parentSelected !== null && this.parentSelected !== undefined){
        getDataWithParams('departments', this.parentSelected.user.id).then((res) => {
          this.departments = res
        })
      }
      return null
    },
    verificationSubmit () {
      if (this.$refs.form.validate()) {
        this.stepper = 2
      }
    },
    clear () {
      getCommitEdit(this.go, false)
      this.stepper = 1
      this.data = {
        title: null,
        subTitle: null,
        description: null,
        fragment: null,
        place: null,
        guest: null,
        publicationDate: null
      }
      this.imageUrl= ''
      this.date = ''
      this.time = ''
      this.$data.data.published = true
      this.parentSelected = null
      this.departmentSelected = ''
      this.selectRadio = 'unions'

      this.$store.commit('setEditAdvertisements', false)
      this.$store.commit('setDeleteAdvertisements', false)
      this.$store.commit('setIdAdvertisements', null)
      if (!this.action) { this.$router.push({ name: 'my-advertisements'}) }
    },
    saveData(){
      if (this.action) {
          this.circular_progress = true
          createData(this.go, {
            'title': this.$data.data.title,
            'department_id': this.departmentSelected.id,
            'parent_code': this.isFeather ? this.parentSelected.code : this.$store.getters.getCurrentUser.code,
            'publicationDate': new Date().toISOString().substr(0, 10),
            'eventDate': this.$data.date,
            'fragment': this.$data.data.fragment,
            'description': this.$data.data.description,
            'published': this.$data.data.published === true ? '1' : '0',
            'image': this.$data.imageUrl,
            'time': this.$data.time ? this.$data.time : 'feather_empty',
            'place': this.$data.data.place ? this.$data.data.place : 'feather_empty',
            'guest': this.$data.data.guest ? this.$data.data.guest.toString() : 'feather_empty'
          }).then((res) => {
            this.circular_progress = false
            this.snackbar = true
            this.snackbar_color = 'primary'
            this.snackbar_message = 'Se ha creado correctamente.'
            this.clear()
          })
        } else {
          this.circular_progress = true
          Axios.put('api/test/ad/update/' + this.$data.data.id, {
            'title': this.$data.data.title,
            'department_id': this.departmentSelected.id,
            'parent_code': this.isFeather ? this.parentSelected.code : this.$store.getters.getCurrentUser.code,
            'publicationDate': this.$data.data.publicationDate,
            'eventDate': this.$data.date,
            'fragment': this.$data.data.fragment,
            'description': this.$data.data.description,
            'published': this.$data.data.published === true ? '1' : '0',
            'image': this.$data.imageUrl,
            'image_charge': this.data.imageCharge,
            'path': this.$data.data.path,
            'time': this.$data.time,
            'place': this.$data.data.place,
            'guest': this.$data.data.guest.toString(),
          }).then(res => {
            this.circular_progress = false
            getCommitEdit(this.go, false)
            getDispatch(this.go)
            this.clear()
            this.$router.push({ name: 'my-advertisements'})
            this.snackbar = true
            this.snackbar_color = 'primary'
            this.snackbar_message = 'Se ha editado correctamente.'
            // if (res.data.response) {
            // } else {
            // }
          })
        }
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
  },
}
</script>
