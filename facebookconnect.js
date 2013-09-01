window.fbAsyncInit = function () {
    FB.Event.subscribe('auth.statusChange', function (response) {
        $(document).trigger('fbStatusChange', response);
    });

    FB.init({
        appId: 'XXXXX', // App ID
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
    getStatusFB: function() {
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
            scope: 'email, user_likes, offline_access, publish_stream, read_stream'
        });
    },

    postFB: function (act) {
        var link = "\n see the pump -> " + act.attributes.object.url;
        var str = act.attributes.object.content + link;
        var regex = /<br\s*[\/]?>/gi;
        str = str.replace(regex, "\n");
        var body = str;
        FB.api('/me/feed', 'post', {
            message: body
        }, function(response) {
            if (!response || response.error) {
                console.log('Error occured');
            }
        });
    },
    getPlace: function (latlon, callback) {
        var url = '/search?type=place&center=' + latlon + '&distance=1000';
        FB.api(url, function(response) {
            callback(response);
        });
    },
    getPlaceLink: function (id, callback) {
        var url = '/' + id;
        FB.api(url, function(response) {
            callback(response);
        });
    },
    postPlaceFB: function (act, id, text) {
        var link = "\n see the pump -> " + act.attributes.object.url;
        var str = text + link;
        var regex = /<br\s*[\/]?>/gi;
        str = str.replace(regex, "\n");
        FB.api('/me/feed', 'post', {
            message: str,
            place: id
        }, function(response) {
            if (!response || response.error) {
                console.log('Error occured');
            } else {
                console.log(response);
            }
        });
    }
};