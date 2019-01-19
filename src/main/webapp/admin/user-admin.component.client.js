//vx
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
        var user = new User(-1, $("#usernameFld").val(), $("#passwordFld").val(), $("#firstNameFld").val(), $("#lastNameFld").val(), $("#roleFld").val())
                

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
       //var user = new User(id,"Hidden", "Hidden", "Hidden", 
       //"Hidden")
       console.log("problem")
       userService.deleteUser(id, function(){row.remove()})


       

    }

    function renderUser(user) {
        var clone = $userRow.clone()
        clone.find(".wbdv-username").html(user.username)
        clone.find(".wbdv-first-name").html(user.firstName)
        clone.find(".wbdv-last-name").html(user.lastName)
        clone.find(".wbdv-role").html(user.role)
        clone[0].id=String(user.id)
        $tbody.append(clone)
        clone.find(".wbdv-remove").click( function(){deleteUser(clone, user.id)} ) //delete onclick
        }
    
    function renderUsers(users) {
        for(var u=0; u<users.length; u++){
            var clone = $userRow.clone()
            clone.find(".wbdv-username").html(users[u].username)
            clone.find(".wbdv-first-name").html(users[u].firstName)
            clone.find(".wbdv-last-name").html(users[u].lastName)
            clone.find(".wbdv-role").html(users[u].role)
            clone[0].id=String(users[u].id)
            $tbody.append(clone)
            //console.log(1)
            //console.log(users[u].id)
            clone.find(".wbdv-remove").click( function(){deleteUser(clone, users[u].id)} ) //delete onclick
            

        }
    }



})()