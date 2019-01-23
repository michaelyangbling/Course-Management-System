function AdminUserServiceClient() {
    this.findAllUsers = findAllUsers
    this.createUser = createUser
    this.deleteUser = deleteUser
    this.updateUser = updateUser
    this.url="https://zhongheng-yang-web-dev-app.herokuapp.com/api/user"
    
    //this.url="http://localhost:8052/api/user" 
    //v1.99
    //always change url to server url
    //seems url&rest type both work in matching
    function findAllUsers(){//https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
        return fetch(this.url).then(function(res){
            if( !(res.ok) ){
                throw Error(res.statusText)
            }
            return res
        }).then(function(response){
                return response.json()
            }).catch(function(error){alert("error try refresh")})
    }

    function updateUser(user, callback){ //this is better practice to check response.OK
        // fetch(this.url, {method: 'PUT',
        //     body: JSON.stringify(user),
        //     headers: new Headers({'Content-type': 'application/json'}) }).then(res=>res.json()).then(callback)
        fetch(this.url, {method: 'PUT',
            body: JSON.stringify(user),
            headers: new Headers({'Content-type': 'application/json'}) }).then(function(res){
                if( !(res.ok) ){
                    throw Error(res.statusText)
                }
                return res
            }).then(res=>res.json()).then(callback).catch(function(error){alert("error try refresh")})
    }
    function createUser(user, callback) {
        fetch(this.url, {method: 'POST', 
            body: JSON.stringify(user),
            headers: new Headers({'Content-type': 'application/json'}) }).then(function(res){
                if( !(res.ok) ){
                    throw Error(res.statusText)
                }
                return res
            }).then(res => res.json()).then(callback).catch(function(error){alert("error try refresh")})

     }
    
    function deleteUser(id, callback) {
        fetch(this.url + "/" +String(id), {method: 'DELETE'}).then(function(res){
            if( !(res.ok) ){
                throw Error(res.statusText)
            }
            return res
        }).then(res => 0).then(callback).catch(function(error){alert("error try refresh")})
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
