# career-center

A simple laravel project for applicant registration, job application and jobs catalog admin.

API support added for the following routes:

Public APIs

- GET api/jobs
- GET api/jobs/{id}

Auth:Sanctum (Requires Token) APIs

- POST api/jobs
- PUT|PATCH api/jobs/{id} (for postman should use POST and add \_method = PATCH or PUT in form-data)
- DELETE api/jobs/{id}
- POST api/jobs/{id}/apply

Job Form Data:

- title (string)
- description (string)
- industry (string)
- available_slots (number, min: 1)

Pre-requisite:  
- Make sure you have Docker Desktop installed and running

To run, just type the following in order:  
`./vendor/bin/sail up`  
`./vendor/bin/sail npm install`  
`./vendor/bin/sail npm run build`  
`./vendor/bin/sail artisan migrate`

Then on the browser, go to:  
[Localhost](http://localhost)

Steps to generate API Token:

1. Register (Automatically logged in when successful)
2. Click the User Menu (Top-Right) and Click API Tokens
3. Create API Token clicking all Permissions (create, delete, read, update)
4. Copy the token and Open Postman app.
5. Add the API Token to Authorization > Bearer Token
6. You can now test Auth:Sanctum APIs above

To run test:  
`./vendor/bin/sail artisan test`
