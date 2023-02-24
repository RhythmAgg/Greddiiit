## Installations


# Greddiit using MERN STACK

### BONUS PARTS 

- Chats
- Back button disable
- Nested Comments
- Nested Sort on the Subgreddiiits
- Shortcut Keys
- Graphs for stats
- email notification to the Reporter about the action taken
- When the reported user is blocked or the post is deleted then send an email notification about the same to the reported user too
- Fuzzy Search

## Instructions to run the code

* Run Express Backend:

cd backend/
npm install
npm start


* Run React Frontend:

cd frontend
npm install/
npm start

- The frontend is hosted on port 3000 and backend on port 3500

## To run docker

* In the root directory run 

sudo docker-compose up --build


## Assumptions

* For Registration:
    * Age should be +ve
    * A user can report a post multiple times
    * Username cannot be edited
    * All substrings of banned words are replaced. 
    * If a user is blocked, they are kicked out of the subgreddiit and can 
    request to join again
    * On all actions (ignore,block,delete) the report is deleted
    * The tokens in localStorage are not changed
    * username is kept unique