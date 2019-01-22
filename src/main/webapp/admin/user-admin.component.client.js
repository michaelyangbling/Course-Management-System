//vx
//if cannot delete, just refresh
//varibale lives out of scope with closure function??
//https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
//updating is responsive, can re-select another entry; if already deleted, should show "update failure"
//clean input field and update client side only if updating to server succeed, 
( function(){
    var $createBtn
    var userService = new AdminUserServiceClient();
    $(main)
    
    function main(){
        $userRow=$(".wbdv-template")
        $tbody=$("tbody")
        $createBtn=$("#wbdv-create")
        $updateBtn=$("#wbdv-update")

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


    function findUserById(clone, id){
        clone.css("background","orange") //orange when entry selected for edit
        $updateBtn.off("click").click( function(){updateUser(clone, id)} )// bind click event for this clone to updateBtn
        alert("this entry is now selected for edit( other orange ones are not in active status)")
    }

    //updating is responsive, can re-select another entry; if already deleted, should show "update failure"
//clean input field and update client side only if updating to server succeed, 
//in case of 1. server error, not responding:do not update on client 2. already deleted( not exist id): may still update on client side
    function updateUser(clone, id){
        var user = new User(id, $("#usernameFld").val(), $("#passwordFld").val(), $("#firstNameFld").val(), $("#lastNameFld").val(), $("#roleFld").val())
        userService.updateUser(user, ( function(){
            clone.find(".wbdv-username").html(user.username)
            clone.find(".wbdv-first-name").html(user.firstName)
            clone.find(".wbdv-last-name").html(user.lastName)
            clone.find(".wbdv-role").html(user.role)
            clone[0].id=String(user.id)
            $("#usernameFld").val("")
            $("#passwordFld").val("")
            $("#firstNameFld").val("")
            $("#lastNameFld").val("")
            clone.css("background","") //only set white/no back in case of success
            $updateBtn.off("click") //only unbind click in case of success
            alert("one entry updated")
         } ))
        


    }
    
    function renderUser(user) {
        
        var clone = $userRow.clone()
        clone.find(".wbdv-username").html(user.username)
        clone.find(".wbdv-first-name").html(user.firstName)
        clone.find(".wbdv-last-name").html(user.lastName)
        clone.find(".wbdv-role").html(user.role)
        clone[0].id=String(user.id)
        clone.find(".wbdv-remove").click( (function (){

            return ( function(){deleteUser(clone, user.id)} ) 
            //clone variable was same, so object change with variable, but clone var is local to function here
            //so clone only refers to one object on its lifetime
        } )() ) //delete onclick, "pas"s object autometically?

        clone.find(".wbdv-edit").click( (function (){

            return ( function(){findUserById(clone, user.id)} ) 
        } )() )

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

            clone.find(".wbdv-edit").click( (function (clone, id){

                return ( function(){findUserById(clone, id)} ) 
            } )(clone, users[u].id) )

            $tbody.append(clone)
        }
    }



})()