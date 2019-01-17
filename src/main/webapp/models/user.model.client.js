function User(username, password, firstname, lastname) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;

    this.setUsername = setUsername;
    this.getUSername=getUSername;
    
    function setUsername(username){
        this.username=username
    }

    function getUsername(){
        return this.username
    }

    function setPassword(password){
        this.password=password
    }
    function getPassword(password){
        return this.password
    }

    function setFirstName(firstName){
        this.firstName=firstName
    }

    function getFirstName(firstName){
        return this.firstName
    }

    function setLastName(lastName){
        this.lastName=lastName
    }
    
    function setLastName(lastName){
        return this.lastName
    }



}