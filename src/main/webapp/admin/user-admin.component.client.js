//vx
//if cannot delete, just refresh
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
       
       //console.log("problem")
       userService.deleteUser(id, (function(){
                                    return ( function(x){row.remove()
                                             alert("delete success!")} )
                                    } )())//alert: before sucess? after promise?blabla..should after success..


       

    }


    
    function renderUser(user) {
        
        var clone = $userRow.clone()
        clone.find(".wbdv-username").html(user.username)
        clone.find(".wbdv-first-name").html(user.firstName)
        clone.find(".wbdv-last-name").html(user.lastName)
        clone.find(".wbdv-role").html(user.role)
        clone[0].id=String(user.id)
        clone.find(".wbdv-remove").click( (function (){

            return ( function(){console.log(clone);deleteUser(clone, user.id)} ) 
            //clone variable was same, so object change with variable, but clone var is local to function here
            //so clone only refers to one object on its lifetime
        } )() ) //delete onclick, "pas"s object autometically?
        $tbody.append(clone)
        alert("create success!")
        }
    
    function renderUsers(users) {

        for(var u=0; u<users.length; u++){   
            var clone = $userRow.clone()
            clone.find(".wbdv-username").html(users[u].username)
            clone.find(".wbdv-first-name").html(users[u].firstName)
            clone.find(".wbdv-last-name").html(users[u].lastName)
            clone.find(".wbdv-role").html(users[u].role)
            clone[0].id=String(users[u].id)
            //console.log(1)
            var user=users[u]
            clone.find(".wbdv-remove").click( 
                ( function(clone, id){
                    
                    return ( function(){deleteUser(clone, id)} )  //why bug showed previously: users[u].id was OK, but variable was same, so object change with variable
                    }  ) (clone, users[u].id) 
            )//delete onclick
            $tbody.append(clone)
        }
    }



})()