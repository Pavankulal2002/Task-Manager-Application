Retreive tasks
GET - http://localhost:8000/task/get/<userEmail>

Insert tasks
POST - http://localhost:8000/task/post/<userEmail>

Update task
PATCH - http://localhost:8000/task/patch/<userEmail>?id=<taskID>

Delete task
DELETE - http://localhost:8000/task/delete/<userEmail>?id=<taskID>

Login
GET - http://localhost:8000/task/login/<userEmail>

Logout
GET - http://localhost:8000/task/logout

CSRF generation
GET - http://localhost:8000/task/getCSRF

redis config
how to install all modules
how to run