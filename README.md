
# Description


## Run in Dev

1. Clone repo
2. Copy ```.env.template``` and rename it to ```.env```
3. Change project name folder
4. Search "base" on VSC and change every word with your project name
5. Install dependencies ```npm install```
6. Create DB ```docker compose up -d``` (docker should be open and all containers stopepd)
7. Correr las migraciones de Prisma ```npx prisma migrate dev``` (project should be running on dev)
8. Ejecturar seed ```npm run seed``` 
9. Run in dev ```npm run dev```


## Run in prod