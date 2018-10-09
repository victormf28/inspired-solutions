import { HttpGraphQl } from '../../../services/HttpGraphQl'
import formUserMutations from './formUser.mutations'
import formUserQueries from './formUser.queries'

const oHttpGraphQl = new HttpGraphQl()

export default {
  data() {
    return {
      loadingForm: false,
      form: {
        name: "",
        age: '',
        email: "",
        accessRole: ""
      },
      rulesForm: {
        name: [
          { required: true, message: 'Ingrese nombre', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Ingrese email', trigger: 'blur' },
          { type: 'email', message: 'Ingrese mail válido', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getUser() {
      oHttpGraphQl.query({
        query: formUserQueries.getUserByID,
        variables: {
          data: {
            id: this.$route.params.idUsuario
          }
        }
      }).then(({ data }) => {
        this.form.name = data.user.name
        this.form.age = data.user.age
        this.form.email = data.user.email
        this.form.accessRole = data.user.accessRole
      })
    },
    onSubmit(form) {
      this.pressedSubmit = true
      if (this.$route.params.idUsuario) {
        this.updateUSer(form)
      }
      else {
        this.addUSer(form)
      }

    },
    addUSer(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$refs[form].model.age = parseInt(this.$refs[form].model.age)
          oHttpGraphQl.query({
            query: formUserMutations.addUser,
            variables: {
              data: this.$refs[form].model
            }
          }).then(({ data }) => {
            if (data.createUser) {
              this.$message.success({
                message: 'Usuario creado correctamente'
              })
              this.$refs[form].resetFields()
            }
            else {
              this.$message.error({
                message: 'Ocurrio un problema'
              })
            }
          })
        } else {
          this.$message.error({
            message: 'Error al enviar formulario'
          })
          return false
        }
      })
    },
    updateUSer(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$refs[form].model.age = parseInt(this.$refs[form].model.age)
          oHttpGraphQl.query({
            query: formUserMutations.updateUSer,
            variables: {
              data: this.$refs[form].model,
              where: {
                id: this.$route.params.idUsuario
              }
            }
          }).then(({ data }) => {
            if (data.updateUser) {
              this.$message.success({
                message: 'Usuario actualizado correctamente'
              })
              //this.$refs[form].resetFields()
            }
            else {
              this.$message.error({
                message: 'Ocurrio un problema'
              })
            }
          })
        } else {
          this.$message.error({
            message: 'Error al enviar formulario'
          })
          return false
        }
      })
    }
  },
  mounted() {
    if (this.$route.params.idUsuario) {
      this.getUser()
    }
  }
}
