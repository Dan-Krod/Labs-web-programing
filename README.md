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
