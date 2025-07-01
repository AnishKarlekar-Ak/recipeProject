import React, { useState, useEffect } from 'react';
import RecipeSection from '../components/recipeSection';
import Carousel from '../components/carousel';
import axios from 'axios';
import bannerb1 from '../assets/bannerImage1.png'
import bannerb2 from '../assets/bannerImage2.png'
import bannerb3 from '../assets/bannerImage3.png'

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [vegetarianRecipes, setVegetarianRecipes] = useState([]);
  const [nonVegRecipes, setNonVegRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const carouselImages = [
    // Update or fetch dynamically as needed
    {
      url: bannerb1,
      caption: 'Discover the finest flavors from around the world!',
    },
    {
      url: bannerb2,
      caption: 'Vegetarian or Non-Veg, we have it all!',
    },
    {
      url: bannerb3,
      caption: 'Easy & healthy recipes for every mood.',
    },
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recipes');
        const allRecipes = res.data;

        const veg = allRecipes.filter((r) => r.isVeg);
        const nonVeg = allRecipes.filter((r) => !r.isVeg);

        setVegetarianRecipes(veg);
        setNonVegRecipes(nonVeg);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load recipes.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <>
      <Carousel
        carouselImages={carouselImages}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />

      {loading ? (
        <div className="text-center py-16 text-lg text-gray-500">Loading recipes...</div>
      ) : error ? (
        <div className="text-center py-16 text-red-500 text-lg">{error}</div>
      ) : (
        <RecipeSection
          vegetarianRecipes={vegetarianRecipes}
          nonVegRecipes={nonVegRecipes}
        />
      )}
    </>
  );
};

export default Index;
