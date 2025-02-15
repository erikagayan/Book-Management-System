# Book Management System

This is a simple Book Management System built with Django and Django REST Framework, providing a basic 3-tier web application that allows users to perform CRUD (Create, Read, Update, Delete) operations on books.


## Requirements

- Python 3.x
- Django
- Django REST Framework
- django-cors-headers


## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/erikagayan/Book-Management-System.git
cd book-management-system
```

### 2. Create and activate a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 3. Install the required packages
```bash
pip install -r requirements.txt
```

### 4. Create the SQLite database
```bash
python create_database.py
python manage.py makemigrations
python manage.py migrate
```

### 5. Run the Django development server
```bash
python manage.py runserver
```
and then in another console
```bash
python -m http.server  
```


### Open http://127.0.0.1:8000 to open API
### Open `index.html` file to use frontend side