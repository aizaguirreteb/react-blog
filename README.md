# **react-blog**

This is a React project to study and try making API requests with redux as well as the use of 'redux-thunk'.

I will be using JSONPlaceholderAPI.

## Dependencies

- redux -> redux library
- react-redux -> Integration layer between react and redux
- axios -> helps us make network requests
- redux-thunk -> middleware to help us make requests in a redux application

```bash
npm install --save redux react-redux axios redux-thunk
```

## Adding css

We add Semantic UI css to public/index.html 

```html
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
```

## Making a request from an action creator

Actions must be plain objects, so we have to use custom middleware to fetch data in async functions. This is why we can use 'redux-thunk'.
When our code gets 'translated' by babel to an older version of JS we would be able to see that the resulting code does not return a plain JS object.
Because we are using 'async-await' inside our action-creator the translation of its code returns a request object instead of a plain JS object.

But what if we delete the 'async-await' syntax? If we try to return an action that needs to make an async request without 'async-await' or managing the time ot takes to get the payload data, then by the time we return the action it still doesn't have the data we need. 

## Types of action creators

**1. Synchronous action creator**

Instantly returns an action with data that is ready to go

**2. Asynchronous action creator**

Takes some amount of time for it to get the data ready to go.
If we want to have this kind of action-creators we need to use a middleware. 

## Middlewares in redux

When our action gets fed to 'dispatch', it will not be sent directly to the reducers. It will be forwarded to the middleware, and then sent to the reducers.

Inside a redux app we can have as many or as few middlewares as we want.

**Middleware** 

Function that gets called with every action we dispatch. Has the ability to STOP, MODIFY, or otherwise manage actions in any way.

**Redux-thunk**

Its an all-purpuse middleware. One thing that allows us to do is manage action creators.

If a normal action-creator had to return a plain JS object, with redux-thunk we can return an action object (as normal) or a **function**.
If we return a function then redux-thunk will call said function automatically. When using a function, we get 'dispatch' and 'getState' as arguments, allowing us to make API requests and anything we need and later call dispatch manually after we have completed our requests. 

## Importing our middleware

On our index.js main file we have to import the library:

```javascript
import thunk from 'thunk'
```

And add another import to 'redux':

```javascript
import { createStore, applyMiddleware } from 'redux'
```

Finally, we have to apply the middleware:

```javascript
const store = createStore(reducers, applyMiddleware(thunk))
```

An pass the store to our Provider tag:
```html
<Provider store={store}> </Provider>
```

## Example of an action-creator using thunk

```javascript
export const fetchPosts = () => async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts')

        dispatch({ 
           type: 'FETCH_POSTS',
           payload: response
        })
    }
```

## Rules of reducers

1. Must return any value, never 'undefined'.
   
   It should always have a return statement at some point and return a value. We can even return 'null' but never 'undefined'.

2. Produces 'state' or data to be used inside the app.
   
   It changes (or not) the state of the app after processing an action.

3. Must not reach out of itself to decide what value to return (keeping reducers pure).
   
   We are not suppose to reach out of the reducer and try to get something from outside. When the reducer is called it is only supposed to look at the action fed to it and the state inside it.
   So we are never goiong to llok into the DOM, or make a network request. 
   We are only going to return the result of combinating the action and the state the reducer recieves.
   
4. Must not mutate its input state argument.
   
   A reducer receives (state, action) as arguments. State is a JS object and we mutate a JS object when we add a key-value to it, when we update a property or when we remove a key-value of it.
   We should return a new state as the result of processing the action received otherwise redux might think there hasn't been any changes to state and will not communicate the rest of the app that something changed.

Extra: Reducers run one first time when our app renders for the first time. This will mean seeing some null or empty values for any console.log() we might have written to see what's happening in our app. And later, after that, it will make the necessary requests and render itself again, showing new results on those console.log() (If any changes have been made to the data)

## mapStateToProps

We define this function everytime we need to access the redux state, 
the data that redux is managing. 

We also get through said function, access to the components props. For example:

```javascript
const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find( user => user.id === ownProps.userId) }
}
```

We use mapStateToProps when we export the component through redux' function 'connect' as the first argument:

```javascript
export default connect(mapStateToProps, {fetchUsers})(UserHeader);
```
