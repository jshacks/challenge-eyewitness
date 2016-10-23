'use strict';

var request = require('request');

var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var loopback = require('loopback');
var Review = loopback.getModel('Review');

var TENDER_LIST_URL = 'http://etender.gov.md/json/tenderList';

module.exports = function(Aquisition) {

    Aquisition.geoPopulate = function(cb) {

        var collection = Aquisition.getDataSource().connector.collection(Aquisition.modelName);
        //var entriesCursor = collection.find({});


        Aquisition.find({}, function(err, entries) {

            //console.log('entries length', entries.length);

            var iterator = 0;

            var parser = parse({delimiter: ','});
            var input = fs.createReadStream(__dirname + '/../../mock/geo.csv');

            var transformer = transform(function(record, callback){

                var lat = record[1];
                var long  = record[3];

                var geoPoint = new loopback.GeoPoint({lat: lat, lng: long});


                var entry = entries[iterator++];

                if(entry === undefined) return callback();

                collection.update({
                    _id: entry.id
                },
                    {
                        $set: {
                            location: geoPoint
                        }
                    },
                {
                    //upsert: true
                }, function() {

                });

                return callback();


            }, {

            });

            input.pipe(parser).pipe(transformer);
        });



    };

  Aquisition.cpv = function(cb) {

      var collection = Aquisition.getDataSource().connector.collection(Aquisition.modelName);
      collection.distinct('data.tenderData.goods', function (err, result) {
          result = result.map(function (entry) {
              return {
                  code: entry.code,
                  name: entry.mdValue
              };
          });
          cb(null, result);
      });

  };

    Aquisition.statuses = function(cb) {

        var collection = Aquisition.getDataSource().connector.collection(Aquisition.modelName);
        collection.distinct('data.tenderStatus', function (err, result) {
            result = result.map(function (entry) {
                return {
                    id: entry.id,
                    name: entry.mdValue
                };
            });
            cb(null, result);
        });

    };


  Aquisition.top = function(filters, limit, skip, cb) {

      var where = {};

      if(filters && filters['statusId']) {
          where['data.tenderStatus.id'] = filters['statusId'];
      }

      if(filters && filters['cpv']) {
          where['data.tenderData.goods.code'] = filters['cpv'];
      }

    Aquisition.find({
      limit: limit || 100,
      skip: skip || 0,
      where: where
    }, function(err, acquisitions) {
        acquisitions = acquisitions.map(function(entry) {

          var entryData = entry.data;

          return {
            id: entry.id,
            tenderId: entry.tenderId,
            location: entry.location,
            status: entryData.tenderStatus.mdValue,
            type: entryData.tenderType.mdValue,
            description: entryData.tenderData.goodsDescr,
            open_date: entryData.refTendeOpenDate,
            reg_number: entryData.regNumber,
            contracting_authority: {
              name: entryData.stateOrg.orgName,
              address: entryData.stateOrg.address,
              phone: entryData.stateOrg.phone
            },
            cpv: entryData.tenderData.goods.code,
            tender_url: 'http://etender.gov.md/proceduricard?pid=' + entry.tenderId
          };
        });
        cb(null, acquisitions);
    });

  };
  Aquisition.rating = function rating(id) {
      return Review.find({ where: { AcquisitionId: id } })
          .then(generateRating)
  }
  function generateRating(reviews) {
    const comments = reviews.map(el => ({
        id: el.id,
        message: el.comment,
        likes: el.commentRating
    }));
    const sum = (counter, iteration) => {
        let result = {}
        for (const key in counter) {
            result[key] = counter[key] + +iteration[key]
        }
        return result;
    }
    const conditions = reviews.map(el => el.conditions)
        .reduce((acc, curr) => sum(acc, curr), {
            started: 0,
            startedInTime: 0,
            finished: 0,
            finishedIntime: 0,
            validProcess: 0
        });

    const rating = comments.map(comment => comment.likes)
        .reduce((sum, curr) => sum + curr, 0) % 5; // please, don't judge me

    return { comments, conditions, rating };
  }

  Aquisition.rateIt = function createReview(data) {
     return Review.create(data).then(obj => Review
         .find({ where: { AcquisitionId: obj.AcquisitionId } })
         .then(generateRating)
     );
  }

  Aquisition.parse = function(cb) {

    return;

    var totalPages = null;

    makePageRequest(1);

    function makePageRequest(page) {
      request
        .post({
            url: TENDER_LIST_URL,
            formData: {
              rows: 100,
              page: page
            },
            json: true
          },
          function (err, response, tenderList) {

            console.log('pageRequest', page, totalPages);

            totalPages = totalPages || tenderList.total;

            tenderList.rows.forEach(function (tender) {

              //console.log('tenderId', tender.id);

              // tender.tenderStatus

              //console.log(tender.tenderStatus);

              Aquisition.create({
                tenderId: tender.id,
                data: tender
              }, function (err, tender) {
                //console.log('inserted ', tender.id);
                //console.log('tender', tender.id);
              });

            });

            if (page > totalPages)
              return cb(null, true);

            makePageRequest(page + 1);
          });

      }
    }

    Aquisition.remoteMethod(
        'geoPopulate',
        {
            accepts: null,
            returns: {arg: 'status', type: 'boolean'}
        }
    );

  Aquisition.remoteMethod(
    'cpv',
    {
      accepts: null,
      returns: {arg: 'cpv', type: 'array'}
    }
  );

    Aquisition.remoteMethod(
        'statuses',
        {
            accepts: null,
            returns: {arg: 'statuses', type: 'array'}
        }
    );

  Aquisition.remoteMethod(
    'top',
    {
      accepts: [
          {arg: 'filters', type: 'json'},
          {arg: 'limit', type: 'number'},
          {arg: 'skip', type: 'number'}
      ],
      returns: {arg: 'aquisitions', type: 'array'}
    }
  );

  Aquisition.remoteMethod(
    'parse',
    {
      accepts: null,
      returns: {arg: 'status', type: 'boolean'}
    }
  );

  Aquisition.remoteMethod('rating', {
      accepts: { arg: 'id', type: 'string' },
      http: { verb: 'get' },
      returns: [
          { arg: 'details', type: 'object' }
      ]
  });
  Aquisition.remoteMethod('rateIt', {
      accepts: { type: 'object', root: true },
      returns: [
          { arg: 'details', type: 'object' }
      ]
  });

};
