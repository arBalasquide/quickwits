# quickwits

Quiplash clone with new features.

# Dependencies
1. Redis
2. Postgresql

# How to run
1. ```createdb quickwits``` 
2. ```yarn install```
3. ```yarn dev```
4. Check out `localhost:3000/` for the game.
5. Check out `localhost:4000/graphql` for back-end graphql tests.

# Notes
Currently runs in development mode. To run in prod, enable https cookies in ```server/src/index.ts``` and change localhost to the domain name of the sever where it'll be hosted at.
