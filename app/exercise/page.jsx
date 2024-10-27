'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ExercisePage = () => {
  const [categories, setCategories] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://yoga-api-nzy4.onrender.com/v1/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="py-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2">Yoga Categories</h1>
        <p className="text-lg font-light">Explore yoga categories and poses for a balanced and mindful practice</p>
      </header>

      {/* Categories List */}
      <div className="w-[80%] mx-auto px-4">
        <ul className="space-y-6">
          {categories.map((category) => (
            <li key={category.id} className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1">
              <h2 className="text-2xl font-semibold mb-2">{category.category_name}</h2>
              <p className="text-gray-600 mb-4">{category.category_description}</p>
              
              {/* Poses within Category */}
              <ul className="flex flex-wrap justify-center items-center gap-2 space-y-2 ml-4">
                {category.poses.map((pose) => (
                    <Link 
                    key={pose}
                      href={{
                        pathname: `/pose/${pose.id}`,
                        query: {
                          sanskrit_name: pose.sanskrit_name_adapted,
                          url_svg: pose.url_svg,
                          pose_description: pose.pose_description
                        }
                      }}
                    >
                  <li key={pose.id} className="w-44 h-48 flex bg-gray-100 rounded-lg flex-col items-center justify-center border">
                     <span className='font-bold'>{pose.sanskrit_name_adapted}</span>
                    <img src={pose.url_png} className='w-20' alt="image" />
                    <span className="ml-2 text-sm text-gray-500 italic">({pose.sanskrit_name})</span>
                  </li>
                    </Link>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExercisePage;
