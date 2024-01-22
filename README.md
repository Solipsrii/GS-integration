<h2>Basic study of nodeJS with Google's API</h2>
Practice nodeJS with a simple project, by using a .CVS-esque object as a DB. Super simple.
Until you try to integrate with google's API, and into the behemoth's maw you go. What a mess.

This project makes use of nodeJS, routed by the Express plugin, and made easy to run pages with EJS the view engine.
This project makes use of API access, token authorization-access, and getting data from a remote source to subsequently render.

The end result is a short series of animal pictures, stored in the google-sheet file as permanent links.

<h1>How to run:</h1>
Req: npm/node installed.

After cloning repo, to download the dependencies, type:

<code>npm ci</code>

Followed by:

<code>nodemon server.js</code>

And then access:

<code>localhost:8090</code>
