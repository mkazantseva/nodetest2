var postListData = [];
// DOM Ready =============================================================
$(document).ready(function () {

    populateFeed();
    $('#postList table tbody').on('click', 'td a.linkshowauthor', showAuthorInfo);
    $('#postList table tbody').on('click', 'td a.linkdeletepost', deletePost);
    $('#btnAddPost').on('click', addPost);
});

function populateFeed() {

    var feedContent = '';

    $.getJSON('/posts/postlist', function (data) {
        postListData = data;
        $.each(data, function () {
            feedContent += '<tr>';
            feedContent += '<td><strong>' + 'Title: </strong> ' + this.title;
            feedContent += '<td><strong>' + 'Author: </strong> ';
            feedContent += '<a href="#" id="linkshowauthor' + this.author + '" class="linkshowauthor" rel="' + this.author._id + '" title="Author">';
            feedContent += ' ' + this.author.username + ' ' + this.author.fullname + ' ';
            feedContent += '</a> <strong>Text:</strong> ' + this.text + '</td>';
            feedContent += '</tr><br><br>';
            feedContent += '<tr><td><a href="#" id="linkdeletepost' + this._id + '" class="linkdeletepost" rel="' + this._id + '">Delete</a></td></tr>';
        });

        $('#postList table tbody').html(feedContent);
    });
};

function showAuthorInfo(event) {
    event.preventDefault();

    var author_id = $(this).attr('rel');
    var arrayPosition = userListData.map(function (arrayItem) {
        return arrayItem._id;
    }).indexOf(author_id);
    var thisUserObject = userListData[arrayPosition];

    populateUserInfo(thisUserObject);

};

function addPost(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addPost input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });

    if (errorCount === 0) {
        var newPost = {
            'title': $('#addPost fieldset input#inputPostTitle').val(),
            'text': $('#addPost fieldset input#inputPostText').val(),
            'author': $(this).attr('data-currentUser')
        }

        $.ajax({
            type: 'POST',
            data: newPost,
            url: '/posts/addpost',
            dataType: 'JSON'
        }).done(function (response) {
            if (response.msg === '') {
                $('#addPost fieldset input').val('');
                populateFeed();
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

function deletePost(event) {
    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this post?');

    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/posts/posts/' + $(this).attr('rel')
        }).done(function (response) {
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            populateFeed();
        });
    }
    else {
        return false;
    }
};