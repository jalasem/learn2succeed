$(window).ready(function () {
    if (firebase === undefined || firebase === null) {
        console.log('there is a network problem! Please reload');
    }
});
window.currentScore = 0;
$(document).ready(function () {
    $('select').material_select();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    $('#login_header>span, #login_instead').click(function () {
        $('#login_header > span').toggleClass('active');
        $('#login_box, #signup_box').toggleClass('fadeInUp fadeOutLeft hide');
    });
    // views swap
    $('#show_leaderboard').click(function () {
        $('section.view').addClass('hide');
        $('#leaderboard_view').removeClass('hide');
        $('#leaderboard_view').addClass('fadeInDown');
    });
    $('#go_home,a.brand-logo').click(function () {
        $('section.view').addClass('hide');
        $('#home_view').removeClass('hide');
        $('#home_view').addClass('fadeInDown');
    });
    $('#show_profile').click(function () {
        $('section.view').addClass('hide');
        $('#userProfile_view').removeClass('hide');
        $('#userProfile_view').addClass('fadeInDown');
    });
    $('#show_settings').click(function () {
        $('section.view').addClass('hide');
        $('#settings_view').removeClass('hide');
        $('#settings_view').addClass('fadeInDown');
    });
    // exam swap

    $('#nextQuestion').click(function () {
        $('section.view').addClass('hide');
        $('#jamb_inProgress_view').removeClass('hide');
        $('#jamb_inProgress_view').addClass('fadeInDown');
    });

    $('#startAgain').click(function () {
        $('section.view').addClass('hide');
        $('#select_jamb_subject_view').removeClass('hide');
        $('#select_jamb_subject_view').addClass('fadeInDown');
    });

    $('#startJamb').click(function () {
        $('section.view').addClass('hide');
        $('#jamb_inProgress_view').removeClass('hide');
        $('#jamb_inProgress_view').addClass('fadeInDown');
    });

    $('#submitExam').click(function () {
        $('section.view').addClass('hide');
        $('#exam_summary_view').removeClass('hide');
        $('#exam_summary_view').addClass('fadeInDown');
    });
    // exam swap

    // views swap
    //

    $.get("./assets/exams.json", function (data, status) {
        if (status == "success") {
            for (var i = 0; i < data.length; i++) {
                var exam_details = {
                    name: data[i].name,
                    logo: data[i].logoUrl,
                    subjects: data[i].subjects,
                    startYear: data[i].startDate,
                    stopYear: data[i].stopDate,
                    type: data[i].type
                };

                var $exam_details_toPrint = '<div class="col s6">';
                $exam_details_toPrint += '<a id="select_' + exam_details.name + '_from_home" class="select_exam_now blue-grey-text text-darken-2" href="#!">';
                $exam_details_toPrint += '<div class="exam_home_card card waves-effect center-align">';
                $exam_details_toPrint += '<img src="' + exam_details.logo + '" alt="' + exam_details.name + '" class="responsive-img" style="width: 8rem;">';
                $exam_details_toPrint += '<h5>' + exam_details.name + '</h5>';
                $exam_details_toPrint += '<p>' + exam_details.startYear + ' - ' + exam_details.stopYear + '</p>';
                $exam_details_toPrint += '</div>';
                $exam_details_toPrint += '</a>';
                $exam_details_toPrint += '</div>';

                $('#exams-cards').append($exam_details_toPrint);
            }
            $('.select_exam_now').click(function (e) {
                var selected_exam = e.currentTarget.id.split('_')[1];
                window.selected_exam = selected_exam;
                $.get("./assets/exams.json", function (data, status) {

                    if (status == "success") {
                        for (i = 0; i < data.length; i++) {
                            if (data[i].name == selected_exam) {
                                var selected_exam_index = i;
                                var this_exam_details = data[selected_exam_index];
                                var exam_details = {
                                    name: this_exam_details.name,
                                    logo: this_exam_details.logoUrl,
                                    subjects: this_exam_details.subjects,
                                    startYear: this_exam_details.startDate,
                                    stopYear: this_exam_details.stopDate,
                                    type: this_exam_details.type
                                };

                                var $exam_option_toPrint = '<div class="row">';
                                $exam_option_toPrint += '<div class="col s12" style="margin-top: 1rem;">';
                                $exam_option_toPrint += '<div class="card-panel center" style="padding-bottom: 5rem;">';
                                $exam_option_toPrint += '<img src="' + exam_details.logo + '" alt="JAMB" class="center" style="width: 8rem;margin: auto;display: block;">';
                                $exam_option_toPrint += '<h4>' + exam_details.name + '</h4>';
                                $exam_option_toPrint += '<h5 class="flow-text">Past Questions</h5>';
                                $exam_option_toPrint += '<form id="exam_session_option">';
                                $exam_option_toPrint += '<select id="exam_subject-toStart">';
                                $exam_option_toPrint += '<option value="" disabled selected>Select Subject</option>';
                                $exam_option_toPrint += '</select>';
                                $exam_option_toPrint += '<select id="exam_dateRange-toCover">';
                                $exam_option_toPrint += '<option value="" disabled selected>Select Year</option>';
                                $exam_option_toPrint += '</select>';
                                $exam_option_toPrint += '<p class="flow-text center-align">This is a multiple choice test. There are 100 question and you have 60 minutes';
                                $exam_option_toPrint += '<br>';
                                $exam_option_toPrint += '<u>Best of Luck</u></p>';
                                $exam_option_toPrint += '<a id="finally_startexamNow" href="#!" class="btn-large col s12 green waves-effect waves-light">Start exam now</a>';
                                $exam_option_toPrint += '<br>';
                                $exam_option_toPrint += '</form>';
                                $exam_option_toPrint += '</div>';
                                $exam_option_toPrint += '</div>';
                                $exam_option_toPrint += '</div>';

                                $('#select_exam_subject_view').html($exam_option_toPrint);

                                for (var j = 0; j < exam_details.subjects.length; j++) {
                                    var $options_toAdd = '<option value="' + exam_details.subjects[j] + '">' + exam_details.subjects[j] + '</option>';

                                    $('#exam_subject-toStart').append($options_toAdd);
                                }
                                for (var y = exam_details.startYear; y <= exam_details.stopYear; y++) {
                                    var $years_toCover = '<option value="' + y + '">' + y + '</option>';
                                    $('#exam_dateRange-toCover').prepend($years_toCover);
                                }
                                $('#finally_startexamNow').click(function () {
                                    startExamnow();
                                });
                                $('select').material_select();
                            }
                        }
                    }
                    $('section.view').addClass('hide');
                    $('#select_exam_subject_view').removeClass('hide');
                    $('#select_exam_subject_view').addClass('fadeInDown');
                });

            });
        }
    });
});

var config = {
    apiKey: "AIzaSyBqsSR7guS2Rjs2KdDb9ZWPm0efD6z-RE8",
    authDomain: "learn2succeed-8017a.firebaseapp.com",
    databaseURL: "https://learn2succeed-8017a.firebaseio.com",
    storageBucket: "learn2succeed-8017a.appspot.com",
    messagingSenderId: "790540855811"
};

firebase.initializeApp(config);

var auth = firebase.auth(),
    database = firebase.database(),
    rootRef = database.ref();

var usersRef = rootRef.child('users'),
    examsRef = rootRef.child('exams'),
    subjectsRef = rootRef.child('subjects'),
    scoresRef = rootRef.child('scores');

var login_tries_error_limit = 0,
    currentTimer = null;

function do_login() {
    var email = $('#email_login').val();
    var password = $('#password_login').val();
    $('.loading-icon').removeClass('hide');

    if (email.length < 4) {
        $('.loading-icon').addClass('hide');
        Materialize.toast('Please enter a valid email', 4000, 'rounded');
        return;
    }
    if (password.length < 4) {
        $('.loading-icon').addClass('hide');
        Materialize.toast('Please enter a valid password', 4000, 'rounded');
        return;
    }

    function nowLogin() {
        auth.signInWithEmailAndPassword(email, password).then(function () {
            $('.loading-icon').addClass('hide');
            $('#email_login').val('');
            $('#password_login').val('');
            if (!auth.currentUser.emailVerified) {
                auth.currentUser.sendEmailVerification();
            }
            if (auth.currentUser.displayName) {
                Materialize.toast('Welcome ' + auth.currentUser.displayName + '!', 4000, 'rounded');
                return false;
            } else {
                Materialize.toast('Welcome!', 3000, 'rounded');
                return false;
            }
        }, function (error) {
            login_tries_error_limit += 1;
            if (login_tries_error_limit < 4) {
                nowLogin();
            } else {
                $('.loading-icon').addClass('hide');
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    Materialize.toast('Wrong password', 4000, 'rounded');
                } else {
                    Materialize.toast(errorMessage, 4000, 'rounded');
                }
                if (error.message === "The email address is badly formatted") {
                    Materialize.toast("please enter a valid email", 4000, 'rounded');
                }
                // console.log(error.message);
            }
        });
        return false;
    }
    nowLogin();

}

function do_signUp() {
    $('.loading-icon').removeClass('hide');
    var emailtxt = $('#email_signup').val();
    var fullnametxt = $('#fullname_signup').val();
    var passwordtxt = $('#password_signup').val();


    if (emailtxt.length < 4 || emailtxt.length === 0) {
        $('.loading-icon').addClass('hide');
        Materialize.toast('Please enter a valid email address', 4000, 'rounded');
        return;
    }
    if (passwordtxt.length < 4 || passwordtxt.length === 0) {
        $('.loading-icon').addClass('hide');
        Materialize.toast('Please enter a valid password', 4000, 'rounded');
        return;
    }

    auth.createUserWithEmailAndPassword(emailtxt, passwordtxt).then(function () {
        $('.loading-icon').addClass('hide');
        Materialize.toast('Registration successful!', 3000, 'rounded');
        auth.currentUser.updateProfile({
            displayName: fullnametxt
        }).then(function () {
            var currentUser_email = auth.currentUser.email;
            var currentUser_uid = auth.currentUser.uid;
            var new_user_info = {
                fullname: fullnametxt,
                email: emailtxt
            };
            usersRef.child(currentUser_uid).set(new_user_info).then(function () {
                $('.loading-icon').addClass('hide');
                Materialize.toast('Please check your email to verify your membership', 3000, 'rounded');
                if (!auth.currentUser.emailVerified) {
                    auth.currentUser.sendEmailVerification();
                }
            }, function (error) {
                $('.loading-icon').addClass('hide');
                Materialize.toast(error.message, 5000, 'rounded');
                // console.log(error.message);
            });
        }, function (error) {
            $('.loading-icon').addClass('hide');
            Materialize.toast(error.message, 5000, 'rounded');
            // console.log(error.message);
        });
    }).catch(function (error) {
        $('.loading-icon').addClass('hide');
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            Materialize.toast('The password is too weak', 4000, 'rounded');
        } else {
            Materialize.toast(errorMessage, 5000, 'rounded');
        }
        // console.log(error);
    });
}

// function sendPasswordReset() {
// 	$('#pass_reset .loading-icon').removeClass('hide');
// 	var email = $('#email_to_reset').val();
// 	if (email.length < 4) {
// 		$('#pass_reset .loading-icon').addClass('hide');
// 		Materialize.toast('Please enter your email address', 4000, 'rounded');
// 		return;
// 	}
// 	auth.sendPasswordResetEmail(email).then(function () {
// 		$('#pass_reset .loading-icon').addClass('hide');
// 		$('form#login_container').removeClass('hide');
// 		$('form#pass_reset').addClass('hide');
// 		Materialize.toast('Password reset email will be sent to ' + email + ' shortly!', 7000, 'rounded');
// 	}).catch(function (error) {
// 		$('#pass_reset .loading-icon').addClass('hide');
// 		$('form#login_container').removeClass('hide');
// 		$('form#pass_reset').addClass('hide');
// 		var errorMessage = error.message;
// 		Materialize.toast(errorMessage, 5000, 'rounded');
// 		// console.log(error);
// 	});
// }

$('#user_logout').click(function () {
    auth.signOut().then(function () {
        Materialize.toast("Thank you!, Wish to see you again", 4000);
    }, function (error) {
        Materialize.toast(error, 4000);
        // console.log('failed to sign out \n here is what happened: \n ' + error.message);
    });
});

auth.onAuthStateChanged(function (user) {
    if (user && (user !== null)) {
        $('#auth_splash').addClass('hide');
        $('#main_app_body').removeClass('hide fadeIn');
        $('#main_app_body').addClass('fadeIn');
        $('body').removeClass('inactive');
        $('#bhl>span, #fullname_on_profile_view').text(user.displayName);
    } else {
        $('#auth_splash').removeClass('hide');
        $('#auth_splash').addClass('fadeIn');
        $('#main_app_body').addClass('hide');
        $('#main_app_body').removeClass('fadeIn');
    }
});

function startExamnow() {

    if (($('#exam_subject-toStart').val() !== null) && ($('#exam_dateRange-toCover').val() !== null)) {
        var thisExam = window.selected_exam,
            thisYear = $('#exam_dateRange-toCover').val(),
            thisSubject = $('#exam_subject-toStart').val();
        window.selected_subject = thisSubject;
        var $toPaste = thisExam + ' | ' + thisSubject + ' &nbsp;';
        $('#examHeading_view').html($toPaste);
        $('section.view').addClass('hide');
        $('#jamb_inProgress_view').removeClass('hide');
        $('#jamb_inProgress_view').addClass('fadeInDown');

        // http://learn2succeed.pythonanywhere.com/api/question/EXAM/YEAR/Subject/?format=json
        $.get("./assets/sample_questions.json", function (data, status) {
            if (status == "success") {
                var no_of_questions = data.length;
                var taken_questions = [];
                var currentNumber = pick_a_number(data, taken_questions);
                taken_questions.push(currentNumber);
                window.currentQuestion_number = currentNumber;
                window.currentD = {
                    no_of_questions: data.length,
                    taken_questions: taken_questions,
                    fetched_questions: data
                };
                pick_a_question(thisExam, thisSubject, currentNumber, data);
                $('#nextQuestion').click(function () {
                    currentNumber = pick_a_number(data, taken_questions);
                    taken_questions.push(currentNumber);
                    window.currentQuestion_number = currentNumber;
                    window.currentD.taken_questions = taken_questions;
                    console.log('bam!');
                });
            } else {
                alert("error fetching questions. Contact support");
            }
        });

    }

}

function pick_a_number(data, taken_questions) {
    var newNumber = getRandomInt(1, data.length);
    if (checkNonExistence(newNumber, taken_questions)) {
        return newNumber;
    } else {
        pick_a_number(data, taken_questions);
    }
}

function pick_a_question(contextExam, contextSubject, num, contextData) {
    console.log(contextData[num].options);
    var $questionInView = '<p class="flow-text">' + contextData[num].question_text + '</p>';
    $questionInView += '<br>';
    $questionInView += '<div id="live-question_options"';
    $questionInView += '</div>';
    $questionInView += '<br>';
    $questionInView += '<p class="question_actions center">';
    $questionInView += '<button class="btn purple disabled waves-effect waves-light">Previous</button>';
    $questionInView += '<a id="nextQuestion" href="#!" class="nextQuestion btn purple waves-effect waves-light">Next</a>';
    $questionInView += '<a id="submitExam" href="#!" class="endExam btn purple waves-effect waves-light">End</a>';
    $questionInView += '</p>';

    $('#live-question').html($questionInView);

    for (var l = 0; l < contextData[num].options.length; l++) {
        console.log();
        $optionToAppend = '<p>';
        $optionToAppend += '<p>';
        $optionToAppend += '<input id="option' + l + '" name="group' + num + '" value="' + contextData[num].options[l].text + '" type="radio"  />';
        $optionToAppend += '<label for="option' + l + '">' + contextData[num].options[l].text + '</label>';
        $optionToAppend += '</p>';

        $('#live-question_options').prepend($optionToAppend);
    }
    $('.nextQuestion').click(function () {
        var jjj = 'input[name=group' + window.currentQuestion_number + ']:checked';
        var picked_answer = $(jjj, '#live-question').val();
        if (picked_answer == contextData[num].correct) {
            window.currentScore += 1;
            console.log("correct!!!", "your score:", window.currentScore);
            // var currentNumber = pick_a_number(window.currentD.fetched_questions, window.currentD.taken_questions);
            // window.currentQuestion_number = currentNumber;
            // window.currentD. = {
            //     no_of_questions: no_of_questions,
            //     taken_questions: taken_questions,
            //     fetched_questions: data
            // };
            // pick_a_question(window.selected_exam, window.selected_subject, currentNumber, window.currentD.fetched_questions);
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkNonExistence(value, arrayName) {
    if (arrayName.indexOf(value) > -1) {
        return false;
    } else {
        return true;
    }
}