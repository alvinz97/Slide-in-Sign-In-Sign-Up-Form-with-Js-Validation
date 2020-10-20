const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


$(document).ready(function () {
    "use strict";

    // SIGN UP AREA 
    $('#sign-up-form').submit(function () {
        
        validation(this);

        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();

        var action = $(this).attr('action');

        $.ajax({
            type: "POST",
            url: action,
            data: {
                username: username,
                email: email,
                password: password,
                status: 'register'
            },
            success: function (data) {
                if (data == 'sqlError') {
                    $(".errorLogs").addClass("error");
                    $(".errorLogs").text("SQL Error occure");
                    $('#sign-up-form').find("input").val('')
                } else if (data == 'usernameTaken') {
                    $("#username").text("username exist, try another");
                    $('#username').val('')
                } else if (data == 'Error') {
                    $(".errorLogs").addClass("error");
                    $(".errorLogs").text("Error occurs while registering");
                } else if (data == 'OK') {
                    $(".errorLogs").removeClass("error");
                    $(".errorLogs").addClass("success");
                    $('#sign-up-form').find("input").val('')
                    $(".errorLogs").text("Successfully registered");
                    $('#register').text("Submitting ...")
                    setTimeout(function () {
                        $(location).attr('href', 'welcome.php')
                    }, 3500);
                }

            }
        });
        return false;
    });


    // SIGN IN AREA 
    $('#sign-in-form').submit(function () {
        
        validation(this);

        var email = $('#login_email').val();
        var password = $('#login_password').val();

        var action = $(this).attr('action');

        $.ajax({
            type: "POST",
            url: action,
            data: {
                email: email,
                password: password,
                status: 'login'
            },
            success: function (data) {
                if (data == 'wrongPwd') {
                    $(".loginErrorLogs").addClass("error");
                    $(".pwd").text("Wrong Password");
                    $('#password').val('')
                } else if (data == 'noUser') {
                    $(".loginErrorLogs").addClass("error");
                    $(".loginErrorLogs").text("No user found!. Please register before");
                    $('#login-form').find("input").val('')
                } else if (data == 'OK') {
                    $(".loginErrorLogs").removeClass("error");
                    $(".loginErrorLogs").addClass("success");
                    $('#login-form').find("input").val('')
                    $(".loginErrorLogs").text("Successful login");
                    $('#login').text("Logging ...")
                    setTimeout(function () {
                        $(location).attr('href', 'welcome.php')
                    }, 3500);
                }

            }
        });
        return false;
    });
});


function validation(formID) {

    const id = formID;

    var f = $(id).find('.form-group'),
            ferror = false,
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        f.children('input').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'email':
                        if (!emailExp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });

        
        if (ferror) return false;
}