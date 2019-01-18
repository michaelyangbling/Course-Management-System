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
            .then(renderUsers);
        //may need some condition to ensure renderUsers completed
        $createBtn.click(
            function(){
                var user = new User($("#usernameFld").val(), $("#passwordFld").val(), $("#firstNameFld").val(), $("#lastNameFld").val(), $("#roleFld").val())
                

                //delete input fields
                $("#usernameFld").val("")
                $("#passwordFld").val("")
                $("#firstNameFld").val("")
                $("#lastNameFld").val("")
                $("#roleFld").val("")
                
                userService.createUser(user, renderUser)

            }
        )

    }

    // var url = 'https://example.com/profile';
    // var data = {username: 'example'};
    


    function renderUser(user) {
        var clone = $userRow.clone()
        clone.find(".wbdv-username").html(user.username)
        clone.find(".wbdv-first-name").html(user.firstname)
        clone.find(".wbdv-last-name").html(user.lastname)
        clone.find(".wbdv-role").html(user.role)
        $tbody.append(clone)
        clone[0].id=user.id
        }
    
    function renderUsers(users) {
        for(var u=0; u<users.length; u++){
            console.log(users[u])
            var clone = $userRow.clone()
            clone.find(".wbdv-username").html(users[u].username)
            clone.find(".wbdv-first-name").html(users[u].firstname)
            clone.find(".wbdv-last-name").html(users[u].lastname)
            clone.find(".wbdv-role").html(users[u].role)
            clone[0].id=users[u].id
            $tbody.append(clone)

        }
    }



})()