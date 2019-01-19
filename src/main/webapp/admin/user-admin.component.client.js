( function(){
    var $createBtn

    var userService = new AdminUserServiceClient();
    $(main)
    
    function main(){
        $userRow=$(".wbdv-template")
        $tbody=$("tbody")
        $createBtn=$("#wbdv-create")
        
        userService
            .findAllUsers()
            .then(renderUsers); //find all users on server response
        //may need some condition to ensure renderUsers completed
        $createBtn.click( createUser)
    }

    // var url = 'https://example.com/profile';
    // var data = {username: 'example'};
    
    function createUser(){
        /*
         Updates the list of users on server response
        */
        var user = new User($("#usernameFld").val(), $("#passwordFld").val(), $("#firstNameFld").val(), $("#lastNameFld").val(), $("#roleFld").val())
                

        //delete input fields
        $("#usernameFld").val("")
        $("#passwordFld").val("")
        $("#firstNameFld").val("")
        $("#lastNameFld").val("")
        
        userService.createUser(user, renderUser) //only renderUser after successfully posting user to server
    }

    function deleteUser(row, id) { //id: type number
        /*
         delete from server and update client-side user list on server response
        */
       var user = new User(id,"Hidden", "Hidden", "Hidden", 
       "Hidden")
       userService.deleteUser(user, function(){row.remove()})


       

    }

    function renderUser(user) {
        var clone = $userRow.clone()
        clone.find(".wbdv-username").html(user.username)
        clone.find(".wbdv-first-name").html(user.firstName)
        clone.find(".wbdv-last-name").html(user.lastName)
        clone.find(".wbdv-role").html(user.role)
        clone[0].id=user.getId
        $tbody.append(clone)
        clone.click( function(){deleteUser(clone, user.id)} ) //delete onclick
        }
    
    function renderUsers(users) {
        for(var u=0; u<users.length; u++){
            console.log(users[u])
            var clone = $userRow.clone()
            clone.find(".wbdv-username").html(users[u].username)
            clone.find(".wbdv-first-name").html(users[u].firstName)
            clone.find(".wbdv-last-name").html(users[u].lastName)
            clone.find(".wbdv-role").html(users[u].role)
            clone[0].id=users[u].getId
            $tbody.append(clone)
            clone.click( function(){deleteUser(clone, users[u].id)} ) //delete onclick
            

        }
    }



})()