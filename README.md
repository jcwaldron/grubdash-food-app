
# Grubdash: A Food Ordering App Backend

A food ordering app project to demonstrate skills including RESTful APIs, routing, Knex, databases, and more.

You can see the deployed project here: 
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jessica-c-waldron/)


## API Endpoints

### DISHES
1. GET
- **URL**: `/dishes`
- **Description**: Retrieves a list of dishes available.

2. POST
- **URL**: `/dishes`
- **Description**: Creates a new dish.


### DISHES/:dishId
1. GET
- **URL**: `/dishes/:dishId`
- **Description**: Retrieves the listing for a specific dish.

2. PUT
- **URL**: `/dishes/:dishId`
- **Description**: Updates the information for a given dish.

### ORDERS
1. GET
- **URL**: `/orders`
- **Description**: Retrieves a list of orders.

2.  POST
- **URL**: `/orders`
- **Description**: Creates a new order.


### ORDERS/:orderId
1. GET
- **URL**: `/orders/:orderId`
- **Description**: Retrieves a specific order based on ID.

2. PUT
- **URL**: `/orders/:orderId`
- **Description**: Updates the information for a given order.

3. DELETE
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
