export default {
    deleteUser:
        `mutation($data:UserWhereUniqueInput!){
            deleteUser(where:$data){
                id
            }
        }`,
}