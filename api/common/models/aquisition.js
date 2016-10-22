'use strict';

var request = require('request');

var TENDER_LIST_URL = 'http://etender.gov.md/json/tenderList';

module.exports = function(Aquisition) {

  Aquisition.cpv = function(cb) {

    var ds = Aquisition.app.datasources.db;

    /*ds.connector.db.distinct('tenderId', function (err, cpvs) {
      console.log(cpvs);
    });
    console.log(ds);*/

  }

  Aquisition.top = function(limit, cb) {

    Aquisition.find({
      limit: limit
    }, function(err, acquisitions) {
        acquisitions = acquisitions.map(function(entry) {

          var entryData = entry.data;

          return {
            id: entry.tenderId,
            type: entryData.tenderType.mdValue,
            description: entryData.tenderData.goodsDesacr,
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
    'cpv',
    {
      accepts: null,
      returns: {arg: 'cpv', type: 'array'}
    }
  );

  Aquisition.remoteMethod(
    'top',
    {
      accepts: {arg: 'limit', type: 'number'},
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

};
