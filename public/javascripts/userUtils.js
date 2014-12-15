function populateUserInfo(user) {
    $('#btnUpdateUser').attr('data-currentUser', user._id);
    $('#btnAddPost').attr('data-currentUser', user._id);

    //Populate Info Box
    $('#userInfoName').text(user.fullname);
    $('#userInfoAge').text(user.age);
    $('#userInfoGender').text(user.gender);
    $('#userInfoLocation').text(user.location);

    //Populate input
    $('#inputUserName').val(user.username);
    $('#inputUserFullname').val(user.fullname);
    $('#inputUserEmail').val(user.email);

    $('#inputUserAge').val(user.age);
    $('#inputUserGender').val(user.gender);
    $('#inputUserLocation').val(user.location);
}

function createUser() {
    return newUser = {
        'username': $('#addUser fieldset input#inputUserName').val(),
        'fullname': $('#addUser fieldset input#inputUserFullname').val(),
        'email': $('#addUser fieldset input#inputUserEmail').val(),
        'age': $('#addUser fieldset input#inputUserAge').val(),
        'location': $('#addUser fieldset input#inputUserLocation').val(),
        'gender': $('#addUser fieldset input#inputUserGender').val()
    }
}