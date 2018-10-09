export default {
    getUserByID:
        `query($data:UserWhereUniqueInput!){
            user(where:$data){
                id,
                name,
                email,
                age,
                accessRole
            }
        }`
}