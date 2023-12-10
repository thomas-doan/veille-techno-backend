api back project kanban thomas doan

Pour lancer le projet il faut run une migration de la base de donnée :

npx prisma migrate dev

Après les migrations vous pouvez créer un utilisateur qui est de role USER.

Pour avoir un utilisateur de type Admin il faut modifier en BDD son roleIdFk directement (prenne l'idRole Admin et le modifier sur le champ user adéquate)

le back est sur le port 3333

l'API HATEOAS est sur la route api/users

Pour initialiser les test npm test 

Pour run la doc Swagger 

http://localhost:3333/api

merci