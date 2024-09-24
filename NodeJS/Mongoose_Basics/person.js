const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Person')
  .then(() => {
    console.log("we are connected");
  })
  .catch((err) => {
    console.log("Oh No! Error!!!", err);
  });

  const personSchema = new mongoose.Schema({
    first: String,
    last: String
  })

  personSchema.virtual('fullName')
  .get(function(){
    return `${this.first} ${this.last}`
  })
  .set(function(v){
    this.first = v.substr(0, v.indexOf(' '));
    this.last = v.substr(v.indexOf(' ') + 1);
  })


  /// pre save
  personSchema.pre('save',async function(){
    this.first = "Funny"
    this.last = "Man"
    console.log("About to save")
  })

  /// post save
  personSchema.post('save',async function(){
    console.log("just saved")
  })





  const Person = mongoose.model('Person',personSchema)

//   const vishal = new Person ({first:'vishal',last:'Gharge'})
//   vishal.save()

//   Person.insertMany([
//     {first:'Sam',last:'Jolly'},
//     {first: 'Tom',last:'Harry'}
// ])
//   .then(data => {
//     console.log("Products inserted successfully:");
//     console.log(data);
//   })
//   .catch(err => {
//     console.log("Error inserting products:");
//     console.log(err);
//   });