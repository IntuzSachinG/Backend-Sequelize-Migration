<!-- !!  Below Is Migration Concept Steps When First Time We Work With MVC + Migration -->

<!-- ??  1.  When First Time Create Migrations File Meaning Inside Folder of migrations automatic create the files -->

<!-- !!  Run this command --> // NOTE:- Total Table You Need In Model // This Only Create files in migration not in models,
<!-- !!  and seeders and config -->
<!-- !!   npx sequelize migration:create --name create-tasks  --> create-tasks-->your table name

<!-- ?? 2. When You Run this below command you got inside database sequelizeMeta and also table  -->

<!-- !! Run This Command npx sequelize-cli db:migrate -->

<!-- ?? 3. Now, If you first time want to create file inside seeders folder run this command -->

<!-- !! npx sequelize seed:generate --name project --> //!! project--> your project name whatever you want

<!-- ?? 4. Now, After Running Command 3 Above now seed all data so data insert into table  -->

<!-- !!   Run this command:->  npx sequelize db:seed:all -->

