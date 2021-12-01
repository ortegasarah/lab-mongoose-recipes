const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    try {
      main()
    } catch (error) {
      console.error('Error', error);
    }
  })

  //iteration 6
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

async function main() {
  // Run your code here, after you have insured that the connection was made
  //iteration 2
  let newRecipe = {
    title: 'miXto quente',
    level: 'Easy Peasy',
    ingredients: ['pão francês', 'queijo', 'presunto'],
    cuisine: 'Brasileira',
    dishType: 'snack',
    image: 'http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg',
    duration: 5,
    creator: 'JOC'
  };

  const createOne = await Recipe
    .create(newRecipe)
    .then(result => console.log("recipe added", result.title))
    .catch(error => console.log(error))
  console.log("primera constante", createOne)

  //iteration 3
  const createTwo = await Recipe 
    .insertMany(data)
    .then(result => {
      result.forEach(item => {
        console.log(`the recipe title ${item.title} inserted successfully`)
      })
    })
    .catch(error => console.log(error))

  //iteration 4
  const createThree = await Recipe 
    .updateOne({
      title: 'Rigatoni alla Genovese'
    }, {
      duration: 100
    })
    .then(() => console.log("The recipe is updated"))
    .catch(error => console.log(error))

  //iteration 5
  const createFour = await Recipe 
    .deleteOne({
      title: 'Carrot Cake'
    })
    .then(() => console.log("The carrot cake has been deleted"))
    .catch(error => console.log(error))

    mongoose.connection.close()
}