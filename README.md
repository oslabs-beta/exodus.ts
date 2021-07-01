# Exodus

<p align="center"><img src="exodus-logo-black.png" alt="Exodus logo" width="400" height="190"></p>

Exodus is a [MongoDB](https://www.mongodb.com/) data migration tool for the
[Deno](https://deno.land) runtime environment.

## Usage

The following flags should be used before running any command:

<p><strong>deno run -A --unstable</strong></p>
Followed by the version of the cli.ts file:

<p><strong>https://deno.land/x/exodus@0.1.8/cli.ts</strong></p>

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts
```

It will also run with the following flags
`--unstable --allow-read --allow-write --allow-net` if you wish to be more
specific about permissions

```shell
deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/exodus@0.1.8/cli.ts
```

### Initializing a Project

- `init` : Initializes a new Exodus migration project by generating a
  `/migrations` directory and a `setup.ts` file in the <b>current working
  directory</b>. Modify the `setup.ts` with your MongoDB database connection
  information. Exodus uses the settings in this file to connect to your
  database.

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts init
```

### Creating Migrations

- `create` `[commitMessage]`: Creates a new migration file in the `/migrations`
  directory containing a template for `fwd` and `back` functionality

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts create commitMessage
```

### Defining Migrations

Exodus uses deno_mongo drivers to interact with MongoDB, which has methods/commands similar to the mongoDB shell or node drivers. Use the passed in `client` and `db` objects to interact with the database.

#### Deno_mongo built-in methods: 
- Refer to https://github.com/denodrivers/deno_mongo for built in methods. Most methods are listed in their readme and function the same as the node drivers/MongoDB shell methods. Deno_mongo driver is still in development though so not all methods from node drivers / shell are implemented. HOWEVER
#### MongoDB database commands:   
- If you want to access MongoDB database commands directly then use `client.runCommand( '<databaseName>' , <databaseCommand> )`. Use this if the deno_mongo methods aren't enough and you need more actions.
- e.g.  `client.runCommand( 'Database1' , { ping: 1} )`

### Running Migrations

You may choose to apply migrations incrementally or all at once using the `fwd`
or `full` commands respectively. For every successful migration file a log
document will be created and stored in a 'migrationLog' collection within the
database. Avoid manually altering these log files if possible, as exodus uses
them to keep track of the current state of the migrations.

- `fwd` : Applies the next pending migration

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts fwd
```

- `full` : Applies all pending migrations

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts full
```

Rollingback changes is done incrementally. Successful rollbacks will delete the
associated log file from the migrationLog collection.

- `back` : Rollback changes of last applied migration

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts back
```

### Checking Applied Migrations

You can display the current status of your migrations

- `log` : Displays a table of current migrations pending and migrations applied.
  This log data is retrieved from the migrationLog collections in your database.

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts log
```

Migrations will create an `exodusLog.txt` locally (cwd) that will keep a
complete history of all migrations applied / rolled back. Unlike the
migrationLog documents this file is non-essential to exodus and can be removed
without affecting any features.

## Full Database Migration Usage

### Initializing a Migration

- `dbInit` : Initializes a new Exodus migration by generating a
  `/database-migration` directory and a `setupExtract.ts` and `setupApply.ts`
  file in the <b>current working directory</b>. Modify the `setupExtract.ts`
  with your MongoDB database connection information inorder to pull the data you
  would like to migrate. Modify the `setupApply.ts` with your second MongoDB
  database connection information in order to apply the data you would like to
  migrate. Exodus uses the settings in these files to connect to your database.

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts dbInit
```

### Extracting Data

- `extract` : Extracts the data of an existing MongoDB database and creates a
  directory with a corresponding name to the extracted database. Within said
  directory, a `data` folder is generated populated by files containing the data
  of each collection in the extracted database.

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts extract
```

### Applying/Migrating Data

- `apply` : Applies the extracted data to the database specified in the
  `setupApply.ts` file. During application to the new database, apply removes
  the MongoDB given id from each document, however if the user would like to
  keep a custom id simply add the argument of `apply [ keepId ]` to do so.

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.8/cli.ts apply
```
