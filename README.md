# Challenge Oticket

Ordering System(customers, products and orders)

## Summary

What this platform provides:

- A login page fake for user authentication
- Dashobard: List all avaiable modules
- Customer: Page that fetch data from customer already registered and there is a modal to create a new customer
- Prouct: Page that show data from product already registered and possible to create a new product
- Order: Page that retrive orders that combine with customer + product and able to create order

## Scope/architecture

- Client: I developed front-end part using NextJS and TailwindCSS, used the core functions from stack and management state. There was using the external libs together, as: Axios(make request and comunicate with Back-End, Sonner(Toast of success, warning and error) and Zod for validations inputs  
- Server: Was developed back-end part with Express and Node.Js, used the follow architecture: routes, controller, service(model) through the REST API's, the database was orchestrated with Prisma and Docker-Compose 
  
## Setup and Run

1. Clone the repository

2. Access the both directory:
```bash
cd client
cd server
```

3. Install the dependencies for both:
```bash
npm install
```

4. Configure the env file only on server-side
The .env file was committed to help run the project easily. In a production environment, you would need to follow the .env.example file.

5. Only on server side, run the follows commands: 
```bash
docker compose up -d
```

6. Run the migrations: 
```bash
npx prisma migrate dev
```

7. See the table and collumns from database(Optional): 
```bash
npx prisma sutdio
```

8. Run the project for both sides(client and server)
```bash
npm run dev
```

9. User to make login: 
- email: teste@oticket.com.br
- password: admin123
