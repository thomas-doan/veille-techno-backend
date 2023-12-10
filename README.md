api back project kanban thomas doan

npm i 

Pour lancer le projet il faut créer vos fichiers env, env.test et run une migration de la base de donnée :

pour les 2 fichiers il faut ecrire : 

DATABASE_URL="VOTRE URL"
AT_SECRET=totoro
RT_SECRET=dodobo

commande de migration a realiser dans le dossier Prisma ou ce trouve le dossier Migrations: 

- npx prisma migrate dev

Après les migrations vous pouvez créer un utilisateur qui est de role USER.

Pour avoir un utilisateur de type Admin il faut modifier en BDD son roleIdFk directement (prenne l'idRole Admin et le modifier sur le champ user adéquate)

le back est sur le port 3333

l'API HATEOAS est sur la route api/users

Pour initialiser les test de Auth :

-  npm test 

Pour run la doc Swagger 

http://localhost:3333/api

merci