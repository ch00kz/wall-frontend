## Getting Started

1. Clone repository.

2. Ensure `baseURL` variable in `src/js/utils.js` is set to the url of your running backend (see backend setup [here](https://github.com/ch00kz/wall-backend))
  ```javascript
    const baseURL = 'http://0.0.0.0:9000';
  ```

3. Navigate to `src` directory and serve content on a port of your choice, `9999` used in this example.
  ```
  python -m SimpleHTTPServer 9999
  ```
4. Navigate to `http://localhost:9999/`
