#Usage:

Typeorm config: ```./ormconfig.js```. Needed postgresql.

```npm install```

Next start app

```npm start```

Typeorm will sync DB... and adding entities:

### Error:

```
query failed:  INSERT INTO "regions_translations"("translationsId", "regionsId") VALUES ($1,$2)  -- PARAMETERS: ["d48ae001-f798-5140-92de-2c152c608045",11]
error:  { error: invalid input syntax for integer: "d48ae001-f798-5140-92de-2c152c608045"
    at Connection.parseE (/Users/pasynkov/dev/typeorm_issue_1682/node_modules/pg/lib/connection.js:545:11)
    at Connection.parseMessage (/Users/pasynkov/dev/typeorm_issue_1682/node_modules/pg/lib/connection.js:370:19)
    at Socket.<anonymous> (/Users/pasynkov/dev/typeorm_issue_1682/node_modules/pg/lib/connection.js:113:22)
    at Socket.emit (events.js:159:13)
    at addChunk (_stream_readable.js:265:12)
    at readableAddChunk (_stream_readable.js:252:11)
    at Socket.Readable.push (_stream_readable.js:209:10)
    at TCP.onread (net.js:608:20)
  name: 'error',
  length: 125,
  severity: 'ERROR',
  code: '22P02',
  detail: undefined,
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'numutils.c',
  line: '62',
  routine: 'pg_atoi' }
executing query:  ROLLBACK
[Nest] 21785   - 2018-3-2 14:30:46   [Region] Create region transaction error: {
 "message": "invalid input syntax for integer: \"d48ae001-f798-5140-92de-2c152c608045\"",
 "name": "QueryFailedError",
 "length": 125,
 "severity": "ERROR",
 "code": "22P02",
 "file": "numutils.c",
 "line": "62",
 "routine": "pg_atoi",
 "query": "INSERT INTO \"regions_translations\"(\"translationsId\", \"regionsId\") VALUES ($1,$2) ",
 "parameters": [
  "d48ae001-f798-5140-92de-2c152c608045",
  11
 ]
} +78121ms
[Nest] 21785   - 2018-3-2 14:30:46   [ExceptionsHandler] invalid input syntax for integer: "d48ae001-f798-5140-92de-2c152c608045"
QueryFailedError: invalid input syntax for integer: "d48ae001-f798-5140-92de-2c152c608045"
    at new QueryFailedError (/Users/pasynkov/dev/typeorm_issue_1682/src/error/QueryFailedError.ts:7:9)
    at Query.callback (/Users/pasynkov/dev/typeorm_issue_1682/src/driver/postgres/PostgresQueryRunner.ts:216:26)
    at Query.handleError (/Users/pasynkov/dev/typeorm_issue_1682/node_modules/pg/lib/query.js:143:17)
    at Connection.connectedErrorHandler (/Users/pasynkov/dev/typeorm_issue_1682/node_modules/pg/lib/client.js:132:26)
    at Connection.emit (events.js:159:13)
    at Socket.<anonymous> (/Users/pasynkov/dev/typeorm_issue_1682/node_modules/pg/lib/connection.js:117:12)
    at Socket.emit (events.js:159:13)
    at addChunk (_stream_readable.js:265:12)
    at readableAddChunk (_stream_readable.js:252:11)
    at Socket.Readable.push (_stream_readable.js:209:10)

```

