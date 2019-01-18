function AdminUserServiceClient() {
    this.findAllUsers = findAllUsers
    this.url="https://cs5610-zhongheng-yang-oxy-b.herokuapp.com//api/user"
    //this.url="http://localhost:8080/api/user"
    //always change url to server url
    function findAllUsers(){
        return fetch(this.url)
            .then(function(response){
                return response.json()
            })
    }

}    
