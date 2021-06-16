# Exodus
<p align="center"><img src="exodus-logo.png" alt="Exodus logo" width="400" height="190"></p>

Exodus is a [MongoDB](https://www.mongodb.com/) data migration tool for the [Deno](https://deno.land) runtime environment.

## Usage
The following flags should be used before running any command:
<p><strong>deno run -A --unstable</strong></p> 
Followed by the version of the cli.ts file: 

<p><strong>https://deno.land/x/exodus@0.1.2/cli.ts</strong></p>

```shell 
deno run -A --unstable https://deno.land/x/exodus@0.1.2/cli.ts
```
It will also run with the following flags `--unstable --allow-read --allow-write --allow-net` if you wish to be more specific about permissions

```shell 
deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/exodus@0.1.2/cli.ts 
```


### Initializing a Project
- `init` : Initializes a new Exodus migration project by generating a `/migrations` directory and a `setup.ts` file in the <b>current working directory</b>. Modify the `setup.ts` with your MongoDB database connection information. Exodus uses the settings in this file to connect to your database.

### Creating Migrations

- `create` `[commitMessage]`: Creates a new migration file in the `/migrations` directory containing a template for `fwd` and `back` functionality
```shell 
deno run -A --unstable https://deno.land/x/exodus@0.1.2/cli.ts create
```
### Running Migrations

You may choose to apply migrations incrementally or all at once using the `fwd` or `full` commands respectively. For every successful migration applied, a log document will be created and stored in a 'migrationLog' collection within the database.

- `fwd` : Applies the next pending migration
```shell 
deno run -A --unstable https://deno.land/x/exodus@0.1.2/cli.ts fwd
```
- `full` : Applies all pending migrations
```shell 
deno run -A --unstable https://deno.land/x/exodus@0.1.2/cli.ts full
```

Rollingback changes is done incrementally. Successful rollbacks will delete the associated log file from the migrationLog collection.

- `back` : Rollback changes of last applied migration
```shell 
deno run -A --unstable https://deno.land/x/exodus@0.1.2/cli.ts back
```



### Checking Applied Migrations

You can display the current status of your migrations

- `log` : Displays a table of current migrations pending and migrations applied. This log data is retrieved from the migrationLog collections in your database.

```shell
deno run -A --unstable https://deno.land/x/exodus@0.1.2/cli.ts log
```