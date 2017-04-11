// Grabs the key variables
var keys = require('./keys.js');
var inquire = require('inquirer');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');

var inputCategory = process.argv[2]; 

if (inputCategory === 'my-tweets') {

    var twitterClient = new Twitter(keys.twitterKeys);
    var  Twitter_Params = {screen_name: 'eleanormark', count: 20}

    twitterClient.get('statuses/user_timeline', Twitter_Params, function(error, tweets, response) {
        if (!error) {
            tweets.forEach(function (tweet) { console.log("Tweet: '" + tweet.text + 
                "' was created " + tweet.created_at);
            });
        } else {
            console.log('error:', error); // Print the error if one occurred 
        }
    });
}
if (inputCategory === 'spotify-this-song') {

    var song = process.argv.slice(3).join(' ') || 'dancing in the moonlight';
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);

    });
}
if (inputCategory === 'movie-this') {

    var movie = process.argv.slice(3).join(' ') || 'Mr Nobody';
    var _movieName = process.argv.slice(3).join('_') || 'Mr_Nobody';
    var movieInfo;
    request('http://www.omdbapi.com/?t=' + movie, function (error, response, body) {
        if (!error) {
            movieInfo = JSON.parse(body);
            console.log('Movie Title: ' + movieInfo['Title'] +
                '\nRelease Date: ' + movieInfo['Released'] +
                '\nIMDB Rating: ' + movieInfo['imdbRating'] +
                '\nProductin Country: ' + movieInfo['Country'] +
                '\nLanguage: ' + movieInfo['Language'] +
                '\nPlot: ' + movieInfo['Plot'] +
                '\nActors: ' + movieInfo['Actors'] +
                '\nRotton Tomatoes Ratings: ' + movieInfo['Ratings'][1]['Value'] +
                '\nWebsite: ' + movieInfo['Website'] +
                '\nRotten Tomatoes URL: ' + 'https://www.rottentomatoes.com/m/' + _movieName + '/' );
        } else {
            console.log('error:', error); // Print the error if one occurred 
        }
    });  
}