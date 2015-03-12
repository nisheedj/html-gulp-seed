#HTML GULP SEED

A seed project to build html templates for rapid prototyping using gulp.

==============

## Getting Started

First clone the repository or download the zip file and unzip to a project folder.

Next `cd` into the folder and run `npm install`.

Next run `bower install`.

Now you have the basic setup for the seed project.

## Build and Deploy

### Build

In order to build the project run `gulp`.

There are 4 options that will be presented to the user to choose from.

1. `gulp firstrun` - Used to copy all the assets from the `bower_components` folder.
2. `gulp less` - Used to compile the `.less` files to `.css` files, minifying them as well.
3. `gulp templates` - Used to comile `.jade` files to HTML pages
4. `gulp watch` - Used to run registered tasks on file update/delete/add.

### Deploy

The seed project uses node server to serve files. This is so that data can be served via ajax without cross-origin errors.

The server runs at port 9000 and can be edited by modifying the `server.js` file.

In order to deploy the server run `npm start`


