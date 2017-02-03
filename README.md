# Minimal ES6 Website Setup - for Shopping Cart

A minimal website that would be required to run ES6 type code. 

_version_ 1.1 released 19th Oct 2016

**version 1.2** released 25th Jan 2017

    - added **Gulp** to the base project repo.

These URL of this repository is at

https://github.com/eapostol/minimalES6-v01 

The repository was last used for the repo (to see how the project was created practically)

https://github.com/eapostol/project03cart


**There are two ways to use this repository.**
 
 **You can use it as a guide to _build a repository that supports ES6 code from scratch_** 
 
 ... OR ... 
 
**You can _fork_ this repo for your own purposes. The instructions immediately below describe _forking_ this repository.** 
 
**Building the repository from scratch is described at the end of this README.**
 
It is recommended that you fork the repository to get things started quickly.  

**Forking** is similar to making a branch or cloning except it creates a _fully independent copy_ of the repository. You can make changes to the repository, but it will not impact the original master. The only way for interaction with the original master to occur is if the owner of the original master branch accepts a _pull request_ (discussed in a another tutorial).

_Cloning_ in contrast, makes a direct copy of a repository and allows you to push changes back to the original. 

_Branching_ creates a parallel clone of a repository, but it is still connected to the original repository and you can merge changes between 'main'/'master' branch and your newly created branch.

Prerequisites: You have a Github Account and therefore, can create and manage your own repositories.

1. Login to your GitHub Account in your web browser.

2. To fork this repository, browse to 

    https://github.com/eapostol/minimalES6-v01
    
3. Click upon the **Fork** button on the right hand side of the screen to begin making an independent copy of the repository...

![Github Fork Button](http://www.edapostol.com/gitHubReadMeImg/ra/project02/00_githubForkBtn.png)


It should take a few moments to fork...

![Wait For Forking](http://www.edapostol.com/gitHubReadMeImg/ra/project02/01_waitForForking.png)

4. Once the forking process is complete, you should have a completely independent, **forked** copy of the repository.

![Forked copy of repository](http://www.edapostol.com/gitHubReadMeImg/ra/project02/02_completedForkRepo.png)

5. Now you can **clone** the repository. 

6. (a) If you are cloning using the terminal...
- Note the Github URL for your project, it will be something like

https://github.com/yourgithubID/**projectName.git**

- go to your _terminal / DOS prompt / command line interface (CLI)_

- Go to your folder where all your projects are stored, usually the documents folder.
- Create a new directory for your project (for example _RA-Project02_). Usually **mkdir _nameofdirectory_** is the command to use.

Then perform the following _git_ commands at the prompt

 $ git clone  https://github.com/yourgithubID/**projectName.git** _nameofdirectory_
 
 $ cd _nameofdirectory_
 
 $ ls

**(should show the files and folders of the cloned repo)**

6. (b) If you are cloning using github desktop...

- Click on the **Clone or Download** button.
- Choose **Open in Desktop**.
- If you had installed Github Desktop, Github Desktop should launch. If you did not install it, download and install it.
- When asked, choose a folder to save it to, maybe in the documents folder.
- By default, the project name will be the name of the folder that the contents will be saved into. You could choose an alternate name.
- Github desktop will continue to be open. 

7. You can then continue working with the files as usual with your editor, i.e. Sublime, Atom, Brackets, MS Visual Code, Webstorm, etc.

**HOW TO MANUALLY SET UP THIS REPOSITORY FROM SCRATCH.**
 
These _alternate_ instructions below are only to be followed if you are going to **build your project from scratch** and not fork this repository.

1. Make sure you **create a remote respository** to store the files you are
creating first!

2. In your local folder for your repository,  run **npm init** to create your basic _package.json_ file. Fill in the details:

- name: **name_of_project** _ex. project02_
- version: **1.0.0**
- description: **an appropriate description** _ex. shopping cart project
- entry point: **index.js**
- test command: _leave blank_
- git repository: ** use the github link of the repository that you
created for your project as described in step 01 **.
- keywords: _leave blank for now_
- author: **your name**
- license: **press enter**

3. Review the settings for the **package.json** file being created.

4. For **Is This Ok**, if the settings look good, click yes. An _example_ of what the chosen settings look like is shown below (the values will be of course the values you have entered and not necessarily the ones in this diagram)
![running npm init](http://www.edapostol.com/gitHubReadMeImg/ra/project02/03_resultsOfBuildingPackage.json.png)

5. Make sure webpack and gulp are globally installed, making it available to transpile at your terminal.

_npm install -g webpack_
_npm install -g gulp_

6. Next install the following modules the order is referenced below,
using 

_npm install --save-dev nameOfModule_
 
as usual. 

Note: Ignore the version numbers referenced below, I copied the module names 
from package.json. So at the terminal you would install the modules like so...

_npm install --save-dev webpack_

_npm install --save-dev webpack-dev-server_

_npm install --save-dev babel-cli_

etc. (repeating for the remaining modules in the list below)

Note specifying at @latest installs the latest version (if you like)

_npm install --save-dev webpack@latest_

But note that the folks that created BABEL updated BABEL recently (thanks to my interference lol).

    1. "webpack": "^1.13.2",
    2. "webpack-dev-server": "^1.15.0"
    3. "babel-cli": "^6.14.0",
    4. "babel-core": "^6.14.0",
    5. "babel-loader": "^6.2.5",
    6. "babel-preset-es2015": "^6.14.0",
    7. "file-loader": "^0.9.0",
    8. "node-libs-browser": "^1.0.0",
    9. "node-sass": "^3.8.0",
    10. "sass-loader": "^4.0.0",
    11. "css-loader": "^0.24.0",
    12. "style-loader": "^0.13.1",
    13. (new 2017-25-01) "Gulp": "^3.9.1"


Note: If you wish to install any other modules that you may need (such as gulp-watch) go ahead and do so.

No warnings should show up at this point... 
 
7. Then create a file called .babelrc . You see the source file for the 
code in this repo. This makes babel use ES2015 for sure.

8. Then modify the following in the scripts: property of package.json
to add build and start properties

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    "build": "webpack",
    "start": "webpack-dev-server"
  }
  
- The build property above tells npm what module is used to build the site.
  In this case, its webpack (as opposed to Node)
   
- The start property tells npm what to start. In this case, it's 
   the webpack dev server, used for testing (like an Apache server).
   You will likely explore Apache when you cover PHP and Wordpress.

  
9. Create a file called webpack.config.js
 
  - use my example web.config.js 
  - its commented, so review it. You don't have to master NODE to know
  the intricacies of what is happening, but be familiar with the basics 
  of webpack.config.js
  - a good starter video to learn webpack is at
   https://www.youtube.com/watch?v=TaWKUpahFZM
  

**FINALLY Create some sample ES6 classes. see the /src folder**

 
1. There is an index.js file, and sample classes to be imported, called
 Person.js, and Car.js.
 
 -index.js is 'linked' to index.html and becomes the 'launcher' for
 the app. It brings all the code together.
 -index.js uses imports to include the other classes
 -The other classes are marked as export.
 -most of the script is up to ES6 compliancy.
 
2. At the terminal, run 

**webpack**
 
^ the above should transpile file .js files accordingly.

then run

**npm start**

^ which launches the dev testing server in hot module replacement mode.
This means changes in your code on the fly will automatically refresh
the browser.
 
 
DO THIS STUFF with CARE! It's subject to change. As always, slack me with questions or e-mail me at edward.apostol@redacademy.com.
 
We are here to help!
 
 
 
 
 
 