import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Recipe');

// Dummy data arrays
const recipeData = [
  {
    name: 'Spaghetti Bolognese',
    image: 'https://example.com/spaghetti.jpg',
    cookingTime: '45 minutes',
    calories: 550,
    isVeg: false,
    allergen: 'Gluten',
    ingredients: ['Spaghetti', 'Minced meat', 'Tomato sauce', 'Onions', 'Garlic'],
    instructions: ['Boil pasta', 'Cook meat', 'Mix with sauce', 'Serve hot']
  },
  {
    name: 'Veggie Stir Fry',
    image: 'https://example.com/veggie-stirfry.jpg',
    cookingTime: '20 minutes',
    calories: 300,
    isVeg: true,
    allergen: 'Soy',
    ingredients: ['Broccoli', 'Carrots', 'Bell peppers', 'Soy sauce', 'Garlic'],
    instructions: ['Chop veggies', 'Stir fry in wok', 'Add sauce', 'Serve']
  },
  {
    name: 'Paneer Tikka',
    image: 'https://example.com/paneer-tikka.jpg',
    cookingTime: '30 minutes',
    calories: 420,
    isVeg: true,
    allergen: 'Dairy',
    ingredients: ['Paneer', 'Yogurt', 'Spices', 'Capsicum'],
    instructions: ['Marinate paneer', 'Grill in oven', 'Serve with chutney']
  },
  {
    name: 'Chicken Curry',
    image: 'https://example.com/chicken-curry.jpg',
    cookingTime: '50 minutes',
    calories: 600,
    isVeg: false,
    allergen: '',
    ingredients: ['Chicken', 'Onions', 'Tomatoes', 'Spices'],
    instructions: ['Cook onions', 'Add chicken & spices', 'Simmer with tomatoes', 'Serve']
  },
  {
    name: 'Mushroom Risotto',
    image: 'https://example.com/risotto.jpg',
    cookingTime: '40 minutes',
    calories: 480,
    isVeg: true,
    allergen: 'Dairy',
    ingredients: ['Rice', 'Mushrooms', 'Parmesan', 'Butter'],
    instructions: ['Sauté mushrooms', 'Cook rice slowly', 'Add cheese and serve']
  }
];

// Generate 10 dummy users
const createDummyUsers = async () => {
  const existingUsers = await User.find({});
  if (existingUsers.length >= 10) {
    console.log('10 or more users already exist. Skipping user creation.');
    return existingUsers;
  }

  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push({
      name: `User${i}`,
      email: `user${i}@example.com`,
      role: 'User'
    });
  }

  const createdUsers = await User.insertMany(users);
  console.log('10 dummy users created.');
  return createdUsers;
};

// Seed recipes
const seedRecipes = async () => {
  try {
    const users = await createDummyUsers();

    const recipesToInsert = recipeData.map((recipe) => ({
      ...recipe,
      visitors: Math.floor(Math.random() * 100),
      authorId: users[Math.floor(Math.random() * users.length)]._id
    }));

    await Recipe.insertMany(recipesToInsert);
    console.log(`${recipesToInsert.length} dummy recipes inserted.`);
  } catch (err) {
    console.error('Error inserting recipes:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedRecipes();
