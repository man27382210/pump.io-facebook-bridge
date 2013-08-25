window.fbAsyncInit = function () {
    FB.Event.subscribe('auth.statusChange', function (response) {
        $(document).trigger('fbStatusChange', response);
    });

    FB.init({
        appId: '305436449601720', // App ID
        channelUrl: '//localhost/channel.html', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });

};

// Load the SDK Asynchronously
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

var facebookconnect = {
    getStatusFB: function(){
        console.log('.....');
        FB.getLoginStatus(function (response) {
            $(document).trigger('fbStatusChange', response);
        });
    },
    loginFB: function (callback) {
        FB.login(function (response) {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    //Do something when you have allready log in, like update UI
                    callback(true);
                } else {
                    //User cancelled login or did not fully authorize. You should show on the UI
                    callback(false);
                }
            });
        }, {
            scope: 'email, user_likes, offline_access, publish_stream'
        });
    },

    postFB: function (act) {
        var str = act.attributes.object.content;
        var regex = /<br\s*[\/]?>/gi;
        str = str.replace(regex, "\n");
        var body = str;
        FB.api('/me/feed', 'post', {
            message: body,
            actions: [{
                'name': 'go to see pump.io',
                'link': act.attributes.object.url
            }]
        }, function(response) {
            if (!response || response.error) {
                console.log(response.error);
                console.log('Error occured');
            } else {
            }
        });
    }
};