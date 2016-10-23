(function () {
    'use strict';

    angular
        .module('eyewitness')
        .controller('DetaliedInfoModal', ['apiService', '$mdDialog', 'Aquisition', 'Review', 'ngToast', 'data', DetaliedInfoModal]);

    function DetaliedInfoModal (apiService, $mdDialog, Aquisition, Review, ngToast, data) {
        var self = this;

        console.log(data);
        self.aquisition = data;

        self.review = {};

        self.rate = {};

        self.newReview = {
            conditions : {
                started : false,
                startedInTime : false,
                finished : false,
                finishedIntime : false,
                validProcess : false
            }
        };

        function init () {
            Aquisition.rating({id: self.aquisition.id}, function (res) {
                self.review = res.details;

                self.rate.value = self.review.rating;
                mapConditions();

                console.log(self.review);

            })
        }

        init();

        function getReviews (cb) {
            Aquisition.rating({id: self.aquisition.id}, function (res) {
                cb(res.details);
            })
        }

        function mapConditions () {
            for (var key in  self.review.conditions) {
                self.review.conditions[key] = {
                    count: self.review.conditions[key],
                    flag: self.review.conditions[key] ? true : false
                }
            }
        }

        self.rateCommentHandler = function (rate, aquisitionId, index) {

            var rate = rate ? 'like' : 'dislike';

            Review[rate]({id: aquisitionId}, function (res) {
                console.log(res);
                self.review.comments[index].likes = res.review.commentRating;
            });

        }

        self.sendReviewHandler = function sendReviewHandler () {

            var review = {
                comment : self.newReview.comment,
                commentRating : 0,
                AcquisitionId : self.aquisition.id,
                AcquisitionStatus : self.aquisition.status,
                conditions : self.newReview.conditions
            };

            console.log(review);

            Aquisition.rateIt({data: review}, function (res) {
                console.log(res);

                getReviews(function (reviews) {
                    self.review = reviews;

                    mapConditions();
                });

                ngToast.create({
                    content: 'Thank you for feedback'
                });
            });




        }

        self.closeHandler = function close () {
            $mdDialog.cancel();
        }
    }

}());
