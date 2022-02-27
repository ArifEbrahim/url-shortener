# URL-shortener

An API that takes a full URL, shortens it and make it available at a different route. This is a practice project to learn how to build an API in Node/Express in a Test Driven Way using Jest and Supertest.

### Requirements

- You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
- When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
- If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }

### Notes

Whilst a database could have been implemented, the user requirements did not state data persistence was required and therefore it was not implemented. However it will be implemented later.