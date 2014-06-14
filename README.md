#Ephemeral Photo
#####An application that publicly hosts images/files for a specified time until the file and link are unlinked.  
  
  
### Development Environment Instructions
If you're on a Mac, I'm assuming you've installed [Homebrew](https://github.com/mxcl/homebrew/wiki/installation)  

 1. Install [Node.js](http://nodejs.org/download/)
   - `brew install node` (Mac)
 2. Install Git
   - `brew install git` (Mac)
 3. Clone this repository
   - `git clone https://github.com/Robert-Wett/ephemeralphoto.git`
 4. Navigate to the root app path
   - `cd ephemeralphoto`
 5. Install all of the app dependencies
   - `npm install`
 6. Start the app
   - `node app.js`

### TODO/Ideas:
#####I think I'm going to try and finish this thing.  
 - Let's just do a maximum of 1 day for storage?  
 - Create basic auth for users to add votes to public images or maybe temp. comments.
   - Everything will be deleted after 24 hours, BUT the scores you get from other users will remain as a karma tally.
     - This includes maybe comment karma, submission karma
     - Maybe persist who you've downvoted as well, and from what user you saw the image from.

**Current Version**  
`(4/22/14)`  

![Current Version](https://raw.githubusercontent.com/Robert-Wett/ephemeralphoto/master/doc/ephemeralphotov1.gif)
