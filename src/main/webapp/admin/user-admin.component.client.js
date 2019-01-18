( function(){
    var userService = new AdminUserServiceClient();
    $(main)
    
    function main(){
        $userRow=$(".wbdv-template")
        $tbody=$("tbody")

        userService
            .findAllUsers()
            .then(renderUsers);
    }
    function renderUsers(users) {
        for(var u=0; u<users.length; u++){
            console.log(users[u])
            var clone = $userRow.clone()
            clone.find(".wbdv-username").html(users[u].username)
            clone.find(".wbdv-first-name").html(users[u].firstname)
            clone.find(".wbdv-last-name").html(users[u].lastname)
            clone.find(".wbdv-role").html(users[u].role)
            $tbody.append(clone)

        }
    }



})()