var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPost = new Schema({
  name: String
});

const MyModel = mongoose.model('Blog', BlogPost);



const SaveInstance = (text) => {
    var awesome_instance = new MyModel({ name: text });
    
    // Save the new model instance, passing a callback
    awesome_instance.save(function (err) {
      if (err) return handleError(err);
      // saved!
    });
};

module.exports.SaveInstance = SaveInstance;