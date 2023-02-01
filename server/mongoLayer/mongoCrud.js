import lodash from "lodash"
import constants from "../constants.js"

const MongoCRUD = {}

const MongoOperators = {
    set: "$set"
}


MongoCRUD.upsert = async (db, collection, document, checkString) => {
    await MongoCRUD.createCollection(db, collection)
    return await db.collection(collection).updateOne(checkString, { [MongoOperators.set]: appendDocumentUpdatedAtToPath(document) }, { upsert: true }).then((object) => {

        return object.ops
    })
}

MongoCRUD.upsertRaw = async (db, collection, updateQuery, checkString) => {
    await MongoCRUD.createCollection(db, collection)
    return await db.collection(collection).updateOne(checkString, appendDocumentUpdatedAtToPath(updateQuery, MongoOperators.set), { upsert: true }).then((object) => {

        return object.ops
    })
}

MongoCRUD.updateAsBulkOp = async (db, collection, document, checkString) => {
    return new Promise((resolve, reject) => {
        const col = db.collection(collection);
        let batch = col.initializeUnorderedBulkOp();
        batch.find(checkString).upsert().update(appendDocumentUpdatedAtToPath(document, MongoOperators.set));

        batch.execute((err, result) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(result);
            }
        })
    })
}

MongoCRUD.bulkwrite = async (db, collection, queryArray) => {
    queryArray = queryArray.map(query => {
        if (query?.updateOne?.update?.["$set"]) {
            appendDocumentUpdatedAtToPath(query, "updateOne.update.['$set']")
        }
        return query;
    })

    return await db.collection(collection).bulkWrite(queryArray);
};

MongoCRUD.insert = async (db, collection, document) => {
    await MongoCRUD.createCollection(db, collection)

    return await db.collection(collection).insertOne(document).then((object) => {
        return object.ops
    })
}
MongoCRUD.update = async (db, collection, idField, docSet) => {
    await MongoCRUD.createCollection(db, collection)

    return await db.collection(collection).updateOne(idField, docSet).then((object) => {
        return object
    })
}
MongoCRUD.updateMany = async (db, collection, idField, docSet) => {
    await MongoCRUD.createCollection(db, collection)

    return await db.collection(collection).updateMany(idField, appendDocumentUpdatedAtToPath(docSet, MongoOperators.set)).then((object) => {
        return object
    })
}
MongoCRUD.insertMany = async (db, collection, documentArray) => {
    await MongoCRUD.createCollection(db, collection)
    documentArray = documentArray.map(document => appendDocumentUpdatedAtToPath(document));
    return await db.collection(collection).insertMany(documentArray).then((object) => {
        return object.ops[0]
    })
}

MongoCRUD.checkCollectionExists = async (db, collection) => {
    try {
        return await db.listCollections({ name: collection }).hasNext()
    }
    catch (err) {
        console.log(err.message)
    }
}

MongoCRUD.createIndex = async (db, collection) => {
    if (constants.MONGO_INDEXES[collection])
        for (let index of constants.MONGO_INDEXES[collection]['INDEXES']) {
            await db.collection(collection).createIndex(index)
        }
}

MongoCRUD.createCollection = async (db, collection) => {
    if (!await MongoCRUD.checkCollectionExists(db, collection)) {
        await db.createCollection(collection).catch(err => {
            console.log("collection name and error", collection, err);
            if (err.code !== 48) throw err;
        });
    }
    /**
     * Will move this inside the if just making it like this 
     * for the time since we need to fix indexes once done we can move it to the inner if
     */
    await MongoCRUD.createIndex(db, collection)
}
MongoCRUD.delete = async (db, collection, queryString) => {

    return await db.collection(collection).deleteOne(queryString)
        .then(function (res) {
            if (!res) {
                console.log('error', res)
                return null
            }

            return res
        });
}
MongoCRUD.deleteMany = async (db, collection, queryString) => {
    return await db.collection(collection).deleteMany(queryString)
        .then(function (res) {
            if (!res) {
                console.log('error', res)
                return null
            }

            return res
        });
}

MongoCRUD.get = async (db, collection, queryString) => {

    return await db.collection(collection).findOne(queryString)
        .then(function (res) {
            if (!res) {
                return null
            }

            return res
        });
}

MongoCRUD.getWithSort = async (db, collection, queryString, sort) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(queryString).sort(sort).limit(1).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data?.[0] ?? {});
            }
        });
    });
}

MongoCRUD.getAggregatedQueryResult = async (db, collection, agg) => {

    return new Promise((resolve, reject) => {
        db.collection(collection).aggregate(
            agg, { _id: 0 }).toArray((err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    resolve(data);
                }
            });
    });

}

MongoCRUD.getMongoObject = async (db, collection, queryString, _idRequired = 1) => {
    let projectionObject = {}
    if (_idRequired === 0) {
        /**
         * Suppress fields here
         */
        projectionObject = { projection: { _id: _idRequired } }
    }
    return new Promise((resolve, reject) => {
        db.collection(collection).find(queryString, projectionObject).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

MongoCRUD.getFullMongoObject = async (db, collection, queryString) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(queryString).sort({ createdAt: -1 }).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
MongoCRUD.getFullMongoObjectLimitedWithSorting = async (db, collection, queryString, sortString, limit = constants.MONGO_DATA_PAGE_SIZE_DEFAULT) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(queryString).sort(sortString).limit(limit).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

MongoCRUD.getFullMongoObjectLimitedWithSortingAndSkip = async (db, collection, queryString, sortString, skip, limit = constants.MONGO_DATA_PAGE_SIZE_DEFAULT) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(queryString).sort(sortString).skip(skip).limit(limit).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

MongoCRUD.getFullMongoObjectLimitedPaginated = async (db, collection, queryString, skip, limit = constants.MONGO_DATA_PAGE_SIZE_DEFAULT) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(queryString).skip(skip).sort({ createdAt: -1 }).limit(limit).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
MongoCRUD.getFullMongoObjectLimited = async (db, collection, queryString, limit = constants.MONGO_DATA_PAGE_SIZE_DEFAULT) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(queryString).sort({ createdAt: -1 }).limit(limit).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

MongoCRUD.getAggregatedResult = async (db, collection, queryString) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).aggregate(
            queryString
        ).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

MongoCRUD.findOneAndUpdate = async (db, collection, idField, document, addToset = null) => {
    await MongoCRUD.createCollection(db, collection)
    let updateField = {};
    updateField[MongoOperators.set] = appendDocumentUpdatedAtToPath(document);
    if (addToset) {
        updateField["$addToSet"] = addToset;
    }
    return await db
        .collection(collection)
        .findOneAndUpdate(idField, updateField, { returnOriginal: false })
        .then((object) => {
            if (object.value) {
                return object.value;
            }
            return null;
        });
};

MongoCRUD.findOneAndUpdateWithIncrment = async (db, collection, idField, document, incrementModel) => {
    await MongoCRUD.createCollection(db, collection)
    let updateField = {};
    updateField[MongoOperators.set] = appendDocumentUpdatedAtToPath(document);
    if (incrementModel) {
        updateField["$inc"] = incrementModel;
    }
    return await db
        .collection(collection)
        .findOneAndUpdate(idField, updateField, { returnOriginal: false })
        .then((object) => {
            if (object.value) {
                return object.value;
            }
            return null;
        });
};

MongoCRUD.getCount = async (db, collection, queryString) => {
    return new Promise((resolve, reject) => {
        db.collection(collection)
            .find(queryString)
            .count((err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};
MongoCRUD.findOneAndPull = async (db, collection, idField, document) => {
    await MongoCRUD.createCollection(db, collection)
    let updateField = {};
    updateField["$pull"] = appendDocumentUpdatedAtToPath(document);

    return await db
        .collection(collection)
        .findOneAndUpdate(idField, updateField, { returnOriginal: false })
        .then((object) => {
            if (object.value) {
                return object.value;
            }
            return null;
        });
};

MongoCRUD.findOneAndUpdateWithFilters = async (db, collection, idField, document, arrayFilters = []) => {
    return await db
        .collection(collection)
        .findOneAndUpdate(idField, { $set: appendDocumentUpdatedAtToPath(document) }, { arrayFilters: arrayFilters })
        .then((object) => {
            if (object.value) {
                return object.value;
            }
            return null;
        });
};

MongoCRUD.upsertWithAppendToArray = async (db, collection, filter, document, appendElement) => {
    return await db
        .collection(collection)
        .updateOne(filter, { "$set": appendDocumentUpdatedAtToPath(document), $push: appendElement }, { upsert: true })
}

const appendDocumentUpdatedAtToPath = (document, path = "") => {
    console.info(`In appendDocumentUpdatedAtToPath where document = ${JSON.stringify(document)}, path = ${path}`);
    if (path && !lodash.get(document, path, true)) return document;
    path += (path ? "." : "") + "documentUpdatedAt";
    lodash.set(document, path, Date.now());
    return document;
}

export default MongoCRUD;