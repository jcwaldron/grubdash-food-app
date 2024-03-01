
# Grubdash: A Food Ordering App Backend

A food ordering app project to demonstrate skills including RESTful APIs, routing, Knex, databases, and more.

You can see the deployed project here: 
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jessica-c-waldron/)


## API Endpoints

### 1. DISHES
- GET
- **URL**: `/dishes`
- **Description**: Retrieves a list of dishes available.

- POST
- **URL**: `/dishes`
- **Description**: Creates a new dish.


### 2. DISHES/:dishId
- GET
- **URL**: `/dishes/:dishId`
- **Description**: Retrieves the listing for a specific dish.

- PUT
- **URL**: `/dishes/:dishId`
- **Description**: Updates the information for a given dish.

### 3. ORDERS
- GET
- **URL**: `/orders`
- **Description**: Retrieves a list of orders.

- POST
- **URL**: `/orders`
- **Description**: Creates a new order.


### 4. ORDERS/:orderId
- GET
- **URL**: `/orders/:orderId`
- **Description**: Retrieves a specific order based on ID.

- PUT
- **URL**: `/orders/:orderId`
- **Description**: Updates the information for a given order.

- DELETE
- **URL**: `/orders/:orderId`
- **Description**: Deletes an order by order ID.
## Run Locally

Clone the project

```bash
  git clone https://github.com/jcwaldron/grubdash-food-app.git
```

Go to the project directory

```bash
  cd grubdash-food-app
```

Install dependencies

```bash
  npm install
```

Start the backend

```bash
  npm run start
  Go to: https://localhost:5000
```
