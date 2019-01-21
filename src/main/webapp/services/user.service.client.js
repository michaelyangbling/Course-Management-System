function AdminUserServiceClient() {
    this.findAllUsers = findAllUsers
    this.createUser = createUser
    this.deleteUser = deleteUser
    this.url="https://cs5610-zhongheng-yang-oxy-b.herokuapp.com/api/user"
    //this.url="http://localhost:8052/api/user" 
    //v1.2
    //always change url to server url
    //seems url&rest type both work in matching
    function findAllUsers(){
        return fetch(this.url)
            .then(function(response){
                return response.json()
            })
    }

    function createUser(user, callback) {
        fetch(this.url, {method: 'POST', 
            body: JSON.stringify(user),
            headers: new Headers({'Content-type': 'application/json'}) }).then(res => res.json()).then(callback)

     }
    
    function deleteUser(id, callback) {
        fetch(this.url + "/" +String(id), {method: 'DELETE'}).then(res => 0).then(callback)
    }
    //  fetch(url, {
    //     method: 'POST', // or 'PUT'
    //     body: JSON.stringify(data), // data can be `string` or {object}!
    //     headers: new Headers({
    //       'Content-Type': 'application/json'
    //     })
    //   }).then(res => res.json())
    //   .catch(error => console.error('Error:', error))
    //   .then(response => console.log('Success:', response));
}    
