import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Recipe from '../models/Recipe.js';

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Recipe');

// Predefined Author IDs
const authorIds = [
  '68613edf8cf9c867359e3ecd',
  '68621cac100e143a822146a5',
  '68618735607a8a1c3b3c7b71'
];

// 15 Vegetarian Recipes
const vegRecipes = [
  {
    name: 'Aloo Paratha',
    image: 'https://example.com/aloo-paratha.jpg',
    cookingTime: '30 minutes',
    calories: 320,
    isVeg: true,
    allergen: 'Gluten',
    ingredients: ['Wheat flour', 'Potato', 'Spices', 'Butter'],
    instructions: ['Prepare dough', 'Stuff with potato', 'Cook on tawa'],
    tags: ['Indian', 'Breakfast', 'Spicy']
  },
  {
    name: 'Palak Paneer',
    image: 'https://example.com/palak-paneer.jpg',
    cookingTime: '40 minutes',
    calories: 400,
    isVeg: true,
    allergen: 'Dairy',
    ingredients: ['Spinach', 'Paneer', 'Onion', 'Spices'],
    instructions: ['Boil spinach', 'Blend', 'Add paneer & cook'],
    tags: ['Indian', 'Healthy']
  },
  {
    name: 'Caprese Salad',
    image: 'https://example.com/caprese.jpg',
    cookingTime: '10 minutes',
    calories: 250,
    isVeg: true,
    allergen: 'Dairy',
    ingredients: ['Tomato', 'Mozzarella', 'Basil', 'Olive oil'],
    instructions: ['Slice ingredients', 'Layer & drizzle oil'],
    tags: ['Italian', 'Salad', 'Fresh']
  },
  {
    name: 'Vegetable Pulao',
    image: 'https://example.com/veg-pulao.jpg',
    cookingTime: '35 minutes',
    calories: 380,
    isVeg: true,
    allergen: '',
    ingredients: ['Rice', 'Carrots', 'Beans', 'Spices'],
    instructions: ['Sauté veggies', 'Add rice & water', 'Cook'],
    tags: ['Indian', 'Rice Dish']
  },
  {
    name: 'Methi Thepla',
    image: 'https://example.com/thepla.jpg',
    cookingTime: '25 minutes',
    calories: 270,
    isVeg: true,
    allergen: 'Gluten',
    ingredients: ['Wheat flour', 'Fenugreek', 'Spices', 'Yogurt'],
    instructions: ['Knead dough', 'Roll and fry'],
    tags: ['Gujarati', 'Snack']
  },
  {
    name: 'Vegetable Lasagna',
    image: 'https://example.com/veg-lasagna.jpg',
    cookingTime: '50 minutes',
    calories: 550,
    isVeg: true,
    allergen: 'Gluten, Dairy',
    ingredients: ['Lasagna sheets', 'Veggies', 'Cheese', 'Tomato sauce'],
    instructions: ['Layer ingredients', 'Bake till golden'],
    tags: ['Italian', 'Comfort Food']
  },
  {
    name: 'Chole Bhature',
    image: 'https://example.com/chole-bhature.jpg',
    cookingTime: '45 minutes',
    calories: 600,
    isVeg: true,
    allergen: 'Gluten',
    ingredients: ['Chickpeas', 'Spices', 'Flour', 'Yogurt'],
    instructions: ['Cook chole', 'Fry bhature', 'Serve hot'],
    tags: ['North Indian', 'Spicy']
  },
  {
    name: 'Khandvi',
    image: 'https://example.com/khandvi.jpg',
    cookingTime: '20 minutes',
    calories: 200,
    isVeg: true,
    allergen: 'Dairy',
    ingredients: ['Gram flour', 'Yogurt', 'Spices'],
    instructions: ['Cook batter', 'Roll and temper'],
    tags: ['Gujarati', 'Snack']
  },
  {
    name: 'Stuffed Bell Peppers',
    image: 'https://example.com/stuffed-peppers.jpg',
    cookingTime: '35 minutes',
    calories: 300,
    isVeg: true,
    allergen: '',
    ingredients: ['Bell peppers', 'Rice', 'Veggies', 'Spices'],
    instructions: ['Stuff peppers', 'Bake until soft'],
    tags: ['Continental', 'Healthy']
  },
  {
    name: 'Dhokla',
    image: 'https://example.com/dhokla.jpg',
    cookingTime: '30 minutes',
    calories: 240,
    isVeg: true,
    allergen: '',
    ingredients: ['Gram flour', 'Yogurt', 'Spices'],
    instructions: ['Steam batter', 'Temper and serve'],
    tags: ['Gujarati', 'Breakfast']
  },
  {
    name: 'Hummus with Pita',
    image: 'https://example.com/hummus.jpg',
    cookingTime: '15 minutes',
    calories: 270,
    isVeg: true,
    allergen: 'Gluten',
    ingredients: ['Chickpeas', 'Tahini', 'Garlic', 'Olive oil'],
    instructions: ['Blend ingredients', 'Serve with pita'],
    tags: ['Middle Eastern', 'Dip']
  },
  {
    name: 'Paneer Bhurji',
    image: 'https://example.com/paneer-bhurji.jpg',
    cookingTime: '20 minutes',
    calories: 320,
    isVeg: true,
    allergen: 'Dairy',
    ingredients: ['Paneer', 'Onion', 'Tomato', 'Spices'],
    instructions: ['Sauté veggies', 'Add paneer', 'Cook'],
    tags: ['Indian', 'Quick Meal']
  },
  {
    name: 'Corn Chaat',
    image: 'https://example.com/corn-chaat.jpg',
    cookingTime: '10 minutes',
    calories: 220,
    isVeg: true,
    allergen: '',
    ingredients: ['Sweet corn', 'Spices', 'Lemon juice'],
    instructions: ['Mix everything and serve'],
    tags: ['Street Food', 'Snack']
  },
  {
    name: 'Zucchini Fritters',
    image: 'https://example.com/zucchini-fritters.jpg',
    cookingTime: '25 minutes',
    calories: 350,
    isVeg: true,
    allergen: 'Gluten',
    ingredients: ['Zucchini', 'Flour', 'Egg (optional)', 'Spices'],
    instructions: ['Grate zucchini', 'Fry with batter'],
    tags: ['Snack', 'Crispy']
  },
  {
    name: 'Mushroom Stroganoff',
    image: 'https://example.com/mushroom-stroganoff.jpg',
    cookingTime: '40 minutes',
    calories: 460,
    isVeg: true,
    allergen: 'Dairy',
    ingredients: ['Mushroom', 'Sour cream', 'Onion', 'Pasta'],
    instructions: ['Cook mushrooms', 'Add cream & mix with pasta'],
    tags: ['Russian', 'Creamy']
  }
];

// 15 Non-Vegetarian Recipes
const nonVegRecipes = [
  {
    name: 'Butter Chicken',
    image: 'https://example.com/butter-chicken.jpg',
    cookingTime: '45 minutes',
    calories: 650,
    isVeg: false,
    allergen: 'Dairy',
    ingredients: ['Chicken', 'Tomato', 'Cream', 'Spices'],
    instructions: ['Marinate chicken', 'Cook in gravy', 'Serve'],
    tags: ['North Indian', 'Creamy']
  },
  {
    name: 'Chicken Biryani',
    image: 'https://example.com/chicken-biryani.jpg',
    cookingTime: '60 minutes',
    calories: 700,
    isVeg: false,
    allergen: '',
    ingredients: ['Chicken', 'Rice', 'Spices', 'Yogurt'],
    instructions: ['Layer chicken and rice', 'Cook on dum'],
    tags: ['Indian', 'Spicy']
  },
  {
    name: 'Fish Tacos',
    image: 'https://example.com/fish-tacos.jpg',
    cookingTime: '25 minutes',
    calories: 400,
    isVeg: false,
    allergen: 'Gluten',
    ingredients: ['Fish', 'Tortillas', 'Veggies', 'Sauce'],
    instructions: ['Grill fish', 'Assemble taco', 'Serve'],
    tags: ['Mexican', 'Seafood']
  },
  {
    name: 'Lamb Rogan Josh',
    image: 'https://example.com/rogan-josh.jpg',
    cookingTime: '70 minutes',
    calories: 720,
    isVeg: false,
    allergen: '',
    ingredients: ['Lamb', 'Onions', 'Spices', 'Yogurt'],
    instructions: ['Cook lamb in gravy', 'Simmer and serve'],
    tags: ['Kashmiri', 'Rich']
  },
  {
    name: 'Chicken Shawarma',
    image: 'https://example.com/shawarma.jpg',
    cookingTime: '35 minutes',
    calories: 480,
    isVeg: false,
    allergen: 'Gluten',
    ingredients: ['Chicken', 'Pita', 'Garlic sauce'],
    instructions: ['Grill chicken', 'Wrap with sauce'],
    tags: ['Middle Eastern', 'Street Food']
  },
  {
    name: 'Prawn Curry',
    image: 'https://example.com/prawn-curry.jpg',
    cookingTime: '30 minutes',
    calories: 410,
    isVeg: false,
    allergen: 'Shellfish',
    ingredients: ['Prawns', 'Coconut milk', 'Spices'],
    instructions: ['Cook prawns in gravy', 'Serve with rice'],
    tags: ['Coastal', 'Seafood']
  },
  {
    name: 'Beef Burger',
    image: 'https://example.com/beef-burger.jpg',
    cookingTime: '25 minutes',
    calories: 650,
    isVeg: false,
    allergen: 'Gluten',
    ingredients: ['Beef patty', 'Bun', 'Lettuce', 'Cheese'],
    instructions: ['Grill patty', 'Assemble burger'],
    tags: ['American', 'Fast Food']
  },
  {
    name: 'Egg Curry',
    image: 'https://example.com/egg-curry.jpg',
    cookingTime: '35 minutes',
    calories: 430,
    isVeg: false,
    allergen: 'Egg',
    ingredients: ['Eggs', 'Onion', 'Tomato', 'Spices'],
    instructions: ['Boil eggs', 'Cook gravy', 'Combine'],
    tags: ['Indian', 'Protein-Rich']
  },
  {
    name: 'Thai Chicken Curry',
    image: 'https://example.com/thai-curry.jpg',
    cookingTime: '40 minutes',
    calories: 520,
    isVeg: false,
    allergen: '',
    ingredients: ['Chicken', 'Coconut milk', 'Thai paste'],
    instructions: ['Cook chicken in curry paste', 'Add coconut milk'],
    tags: ['Thai', 'Spicy']
  },
  {
    name: 'Sushi Roll',
    image: 'https://example.com/sushi.jpg',
    cookingTime: '50 minutes',
    calories: 350,
    isVeg: false,
    allergen: 'Seafood',
    ingredients: ['Rice', 'Nori', 'Fish', 'Veggies'],
    instructions: ['Assemble rolls', 'Serve chilled'],
    tags: ['Japanese', 'Raw']
  },
  {
    name: 'Chicken Satay',
    image: 'https://example.com/satay.jpg',
    cookingTime: '30 minutes',
    calories: 400,
    isVeg: false,
    allergen: 'Peanuts',
    ingredients: ['Chicken', 'Peanut sauce', 'Spices'],
    instructions: ['Skewer chicken', 'Grill and serve'],
    tags: ['Thai', 'Grilled']
  },
  {
    name: 'Bacon Carbonara',
    image: 'https://example.com/carbonara.jpg',
    cookingTime: '25 minutes',
    calories: 600,
    isVeg: false,
    allergen: 'Dairy, Gluten',
    ingredients: ['Pasta', 'Bacon', 'Eggs', 'Parmesan'],
    instructions: ['Cook pasta', 'Mix with sauce'],
    tags: ['Italian', 'Creamy']
  },
  {
    name: 'Tandoori Chicken',
    image: 'https://example.com/tandoori.jpg',
    cookingTime: '50 minutes',
    calories: 540,
    isVeg: false,
    allergen: 'Dairy',
    ingredients: ['Chicken', 'Yogurt', 'Spices'],
    instructions: ['Marinate chicken', 'Grill in oven'],
    tags: ['Indian', 'Smoky']
  },
  {
    name: 'Fish and Chips',
    image: 'https://example.com/fish-and-chips.jpg',
    cookingTime: '40 minutes',
    calories: 680,
    isVeg: false,
    allergen: 'Gluten',
    ingredients: ['Fish', 'Potatoes', 'Batter'],
    instructions: ['Fry fish', 'Serve with chips'],
    tags: ['British', 'Fried']
  },
  {
    name: 'Mutton Keema',
    image: 'https://example.com/mutton-keema.jpg',
    cookingTime: '45 minutes',
    calories: 620,
    isVeg: false,
    allergen: '',
    ingredients: ['Minced mutton', 'Onion', 'Tomato', 'Spices'],
    instructions: ['Sauté and cook till dry'],
    tags: ['Indian', 'Minced']
  }
];

// Combine and insert
const allRecipes = [...vegRecipes, ...nonVegRecipes].map(recipe => ({
  ...recipe,
  visitors: Math.floor(Math.random() * 500),
  authorId: authorIds[Math.floor(Math.random() * authorIds.length)]
}));

await Recipe.insertMany(allRecipes);
console.log(`✅ ${allRecipes.length} unique recipes inserted.`);

mongoose.disconnect();
