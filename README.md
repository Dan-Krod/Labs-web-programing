# Лабораторні роботи з дисципліни "Вебтехнології та вебдизайн"
## Виконав: Гада Даніель (група ІР-23)
## Лабораторна робота №9 (Варіант 6)
### Task to lab №9 - React.js: Connecting to REST API

---

## React.js: Connecting to REST API

**Description:**  
Finally! You are about to put the final touches on all pages you created by implementing interaction with your REST API server.

**Variants:**  
Products that you are ‘selling’ should be the same as for previous works. (See the description for the 3rd assignment.)

**Backend:**  
You can use the backend from your 3-5th work, or create a new one from scratch. The tech stack is entirely up to you.

### Requirements
- **All previous React.js work requirements should be maintained.**
- **Code Style:**
  - Use the `axios` library for any HTTP requests.  
    [Axios Documentation](https://github.com/axios/axios#installing)
  - All API functions should be in a single file or folder, similar to the setup in Live Coding for Lab 5 with the `fetch()` function.

### Functionality
- **Catalog Page:** All items should now be fetched from your backend using a `GET` request (via `axios`).
- **Search with Filters:** Implement with a `GET` request. (The text field search can remain as it is.)  
  *Hint:* Pass filters as URL parameters.
- **Loading State:** Display a Spinner (Loader component) to the user while waiting for a response from your `GET` method.  
  Example: [CSS Loaders by Luke Haas](https://projects.lukehaas.me/css-loaders/)

--- 

This formatting provides clear sections and a clean layout suitable for GitHub. Let me know if you’d like any more adjustments!
- Variants -  (products that you are ‘selling’) the same as for previous works. (see the description to 3rd work)

- Requirements: 
  -	All of the requirements for previous React.js works should be kept.
  -	Code style: 
    -	Your items should be stored inside the state or context (your choice) of your page
    https://uk.reactjs.org/docs/hooks-state.html
    https://uk.reactjs.org/docs/hooks-reference.html#usecontext
    -	For your state management use useState() inside Functional Component  instead of this.state and Class component
    -	If you decided to use context, use useContext() hook instead of Context.Consumer
    https://www.robinwieruch.de/react-usecontext-hook
  -	Functionality (IMPORTANT):
    -	Home page: “View more” button should display more elements on the same page Tip: Elements can be just random paragraph & heading, use your imagination ;)
    -	Catalog page: You should be able to filter your items list, by applying different filters by item's properties (i.e size/color/type)
    -	Catalog page: Search by any text property option should also work
    -	Catalog & Item pages: “View more” action on every item should refer to corresponding Item page, with correct information about item (get the info from your state/context)
