import { HttpGraphQl } from './../../../services/HttpGraphQl'
import listUsersQueries from './listUsers.queries'
import listUsersMutations from './listUsers.mutations'

const oHttpGraphQl = new HttpGraphQl()

export default {
  data() {
    return {
      loadingTable: true,
      listUsers: []
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
    onDeleteUser(id) {
      this.loadingTable = true
      oHttpGraphQl.query({
        query: listUsersMutations.deleteUser,
        variables: {
          data: { id }
        }
      }).then(({ data }) => {
        if (data.deleteUser) {
          this.loadUsers()
        }
        else {
          this.$message.error({
            message: 'Ocurrio un problema'
          })
        }

      })
    },
    loadUsers() {
      oHttpGraphQl.query({
        query: listUsersQueries.listUsers,
      }).then(({ data }) => {
        this.loadingTable = false
        this.listUsers = data.users
      })
    }
  },
  mounted() {
    this.loadUsers()
  }
}
