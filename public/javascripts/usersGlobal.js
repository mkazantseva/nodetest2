// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function populateUserRelated() {

    populateTable();
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
    $('#btnAddUser').on('click', addUser);
    $('#btnUpdateUser').on('click', updateUser);
});

// Functions =============================================================

function populateTable() {
    var tableContent = '';

    $.getJSON('/users/userlist', function (data) {
        userListData = data;
        $.each(data, function createUserTable() {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">'
                + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        $('#userList table tbody').html(tableContent);
    });
};

function showUserInfo(event) {
    event.preventDefault();

    var thisUserName = $(this).attr('rel');
    var arrayPosition = userListData.map(function (arrayItem) {
        return arrayItem.username;
    }).indexOf(thisUserName);
    var thisUserObject = userListData[arrayPosition];

    populateUserInfo(thisUserObject);

};

function addUser(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addUser input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    if (errorCount === 0) {
        var newUser = createUser();

        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function doneAddUser (response) {

            if (response.msg === '') {
                $('#addUser fieldset input').val('');
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};

function deleteUser(event) {
    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this user?');

    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/users/' + $(this).attr('rel')
        }).done(function doneDeleteUser (response) {
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            populateTable();
        });

    }
    else {
        return false;
    }

};

function updateUser(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addUser input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    if (errorCount === 0) {

        var newUser = createUser();

        $.ajax({
            type: 'PUT',
            data: newUser,
            url: '/users/' + $(this).attr('data-currentUser'),
            dataType: 'JSON'
        }).done(function doneUpdateUser (response) {
            if (response.msg === '') {
                $('#addUser fieldset input').val('');

                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};



