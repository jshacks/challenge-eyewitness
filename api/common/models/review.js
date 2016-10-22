'use strict';

module.exports = function(Review) {

  Review.like = (id) => rate(id, 1);
  Review.dislike = (id) => rate(id, -1);

  function rate(id, delta) {
      return Review.findById(id).then((review) => {
          review.commentRating += delta;
          return review.save();
      });
  }

  Review.remoteMethod('like', {
      accepts: { arg: 'id', type: 'string' },
      http: { verb: 'put' },
      returns: { arg: 'review', type: 'object' },
  });

  Review.remoteMethod('dislike', {
      accepts: { arg: 'id', type: 'string' },
      http: { verb: 'put' },
      returns: { arg: 'review', type: 'object' },
  });


};
