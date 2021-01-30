const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
	return (this.date_of_death.getFullYear() - 		       this.date_of_birth.getFullYear()).toString();
 });


AuthorSchema
.virtual('date_of_death_f')
.get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : 'no data';
});

AuthorSchema
.virtual('date_of_birth_f')
.get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : 'no data';s
});




// Virtual for author's lifespan formatted
AuthorSchema
.virtual('lifespan_f')
.get(function () {
return this.date_of_death && this.date_of_birth ? (this.date_of_death.getFullYear()) - (this.date_of_birth.getFullYear()) : 'no data';
 });


// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);