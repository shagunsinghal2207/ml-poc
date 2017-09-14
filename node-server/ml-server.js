var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var _ = require('lodash');

var appServerType = {
    http: 'HTTP',
    xdbc: 'XDBC',
}

var dbRelation = {
    security: 'Security',
    schemas: 'Schemas',
    triggers: 'Triggers',
}

var forests = [
    { id: 0, name: 'App-Services' },
    { id: 1, name: 'Documents' },
    { id: 2, name: 'Extensions' },
    { id: 3, name: 'Fab' },
    { id: 4, name: 'Last-Login' },
    { id: 5, name: 'Meters' },
    { id: 6, name: 'Mlsonforest' },
    { id: 7, name: 'Modules' },
    { id: 8, name: 'Schemas' },
    { id: 9, name: 'Security' },
    { id: 10, name: 'Triggers' },
];

var appServers = [
    { id: 0, name: 'Manage' },
    { id: 1, name: 'Health-Check' },
    { id: 2, name: 'App-services' },
    { id: 3, name: 'mlsprer' },
    { id: 4, name: 'Admin' },
];

var DBList = [
        //{ id: 0, name: 'App-Services', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Documents', id: 1, relation: dbRelation.schemas }, { name: 'App-Services', id: 0, relation: dbRelation.triggers }], forests: [{ name: 'App-Services', id: 0 }], appServers: [{ name: 'Manage', id: 0, type: appServerType.http, isDefault: true }, { name: 'HealthCheck', id: 1, type: appServerType.http, isDefault: true }] },
        { id: 1, name: 'Documents', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, { name: 'Triggers', id: 10, relation: dbRelation.triggers }], forests: [{ name: 'Documents', id: 1 }], appServers: [{ name: 'App-Services', id: 4, type: appServerType.http, isDefault: true }] },
        //{ id: 2, name: 'Extensions', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, { name: 'App-Services', id: 0, relation: dbRelation.triggers }], forests: [{ name: 'Extensions', id: 2 }], },
        { id: 3, name: 'Fab', isAvailable: false, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, { name: 'App-Services', id: 0, relation: dbRelation.triggers }], forests: [{ name: 'Fab', id: 3 }], },
        //{ id: 4, name: 'Last-Login', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, { name: 'App-Services', id: 0, relation: dbRelation.triggers }], forests: [{ name: 'Last-Login', id: 4 }], },
        { id: 5, name: 'Meters', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, ], forests: [{ name: 'Meters', id: 5 }], },
        //{ id: 6, name: 'Mlcon', isAvailable: false, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, ], forests: [{ name: 'Mlsonforest', id: 6 }], appServers: [{ name: 'mlsprer', id: 3, type: appServerType.http, isDefault: true }, ] },
        //{ id: 7, name: 'Modules', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, ], forests: [{ name: 'Modules', id: 7 }], },
        { id: 8, name: 'Schemas', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, ], forests: [{ name: 'Schemas', id: 8 }], },
        { id: 9, name: 'Security', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, ], forests: [{ name: 'Security', id: 9 }], appServers: [{ name: 'Admin', id: 4, type: appServerType.http, isDefault: true }, ] },
        { id: 10, name: 'Triggers', isAvailable: true, relatedDatabase: [{ name: 'Security', id: 9, relation: dbRelation.security }, { name: 'Schemas', id: 8, relation: dbRelation.schemas }, ], forests: [{ name: 'Triggers', id: 10 }], },
    ]
    //-------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/Chart', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.end(JSON.stringify(chart));
    })
    //-------------------------------------------------------

var objectAccessDetalis = [];

var objectTypes = {
    forest: "Forest",
    database: "Database",
    cluster: "Cluster",
    appServers: "App Server"
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.get('/dblist', function(req, res) {
    res.end(JSON.stringify(DBList));
})

function addToAccessList(objectType, name, id) {
    objectAccessDetalis.push({ objectType: objectType, name: name, id: id, accessTime: new Date() })
}

app.get('/forests', function(req, res) {
    var forestAndDb = _.map(forests, function(forest) {
        var mapDb = _.find(DBList, function(db) { return _.find(db.forests, function(f) { return f.id == forest.id }) });

        if (!_.isEmpty(mapDb)) {
            return _.extend(forest, { database: { id: mapDb.id, name: mapDb.name } });
        }

        return forest;
    });

    res.end(JSON.stringify(forestAndDb));
})

app.get('/requestTrend', function(req, res) {
    var startDate = new Date(req.query.startDate);
    var endDate = new Date(req.query.endDate);
    var dataPointsCount = req.query.dataPointsCount;

    var bucketSize = (endDate.getTime() - startDate.getTime()) / dataPointsCount;

    dataBucket = [];

    for (i = 0; i < dataPointsCount; i++) {
        dataBucket.push({
            startDate: new Date(startDate.getTime() + i * bucketSize),
            endDate: new Date(startDate.getTime() + (i + 1) * bucketSize)
        });
    }

    var trendFor = req.query.trendFor || objectTypes.forest;
    var groupedData = [];
    var grp = _(objectAccessDetalis)
        .filter(function(value) {
            return value.objectType == trendFor && value.accessTime < endDate && value.accessTime >= startDate;
        })
        .groupBy('name')
        .valueOf();

    _.forEach(grp, function(value, key) {
        var g = {
            name: key,
            data: _.map(dataBucket, function(chunk) {
                var data = _.filter(value, function(accessDetail) {
                    return accessDetail.accessTime >= chunk.startDate && accessDetail.accessTime < chunk.endDate;
                })

                return { startDate: chunk.startDate, endDate: chunk.endDate, data: data };
            })
        }

        groupedData.push(g);
    })

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(groupedData));

})

var dbAvailablity = [
    { timestamp: new Date(), UnavialableDB: 0 }
];
app.get('/toggleAvailability', function(req, res) {
    var id = req.query.id;
    var db = _.find(DBList, function(db) { return db.id == id });
    if (!db) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(DBList));
        return;
    }

    addToAccessList(objectTypes.database, db.name, db.id);

    var last = dbAvailablity[dbAvailablity.length - 1];
    var available = db.isAvailable;

    db.isAvailable = !available;

    dbAvailablity.push({
        timestamp: new Date(),
        UnavialableDB: !available ? Math.max(last.UnavialableDB - 1, 0) : Math.min(last.UnavialableDB + 1, DBList.length)
    });
    res.end('true');

})

app.get('/requestAvailabilityTrend', function(req, res) {
    var startDate = new Date(req.query.startDate);
    var endDate = new Date(req.query.endDate);
    var dataPointsCount = req.query.dataPointsCount;

    var bucketSize = (endDate.getTime() - startDate.getTime()) / dataPointsCount;

    dataBucket = [];

    for (i = 0; i < dataPointsCount; i++) {
        dataBucket.push({
            startDate: new Date(startDate.getTime() + i * bucketSize),
            endDate: new Date(startDate.getTime() + (i + 1) * bucketSize)
        });
    }

    var groupedData = _.map(dataBucket, function(chunk) {
        var filtered = _(dbAvailablity)
            .filter(function(value) {
                return value.timestamp >= chunk.startDate && value.timestamp < chunk.endDate;
            }).valueOf();
        var last = _.last(filtered);
        var count = (last || { UnavialableDB: 0 }).UnavialableDB

        return _.extend(chunk, {
            data: last
        });
    })
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(groupedData));

})


app.get('/requestForest', function(req, res) {
    var forestName = req.query.forestName;
    var forestId = req.query.forestId;

    addToAccessList(objectTypes.forest, forestName, forestId);

    res.end('true');
})

app.get('/requestDatabase', function(req, res) {
    var dbName = req.body.dbName;
    var dbId = req.body.dbId;

    addToAccessList(objectTypes.database, dbName, dbId);

    res.end('true');
})

app.post('/setForestToDB', function(req, res) {
    var db = req.body.database;
    var selectedForests = req.body.selectedForests;
    //remove these forest form existing
    _.forEach(DBList, function(d) {
            d.forests = _.filter(d.forests, function(f) {
                return _.findIndex(selectedForests, function(forest) { return forest.id == f.id }) < 0;
            })
        })
        //add these to current db
    var database = _.find(DBList, function(d) { return d.id == db.id });
    database.forests = selectedForests;
    //_.extend(, {forests: selectedForests})    
    addToAccessList(objectTypes.database, db.name, db.id);

    res.end(JSON.stringify(DBList));
})

app.post('/createDB', function(req, res) {
    var db = req.body.database;
    DBList.push(db);

    addToAccessList(objectTypes.database, db.name, db.id);

    res.end('true');
})

app.post('/createForest', function(req, res) {
    var forest = req.body.forest;
    forests.push(forest);

    addToAccessList(objectTypes.forest, forest.name, forest.id);

    res.end('true');
})

app.get('/recent', function(req, res) {
    var recent = _(objectAccessDetalis).uniqWith(function(obj, other) {
        return obj.objectType == other.objectType && obj.name == other.name
    }).take(5).valueOf();
    res.end(JSON.stringify(recent));
})

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log("ML Server listening at http://%s:%s", host, port);

})