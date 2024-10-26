// app/api/poses/[category_name]/route.js

import fetch from 'node-fetch';

export async function GET(request, { params }) {
  const { category_name } = params;

  try {
    // Fetch data from the external yoga API
    const response = await fetch('https://yoga-api-nzy4.onrender.com/v1/categories');
    const data = await response.json();

    // Filter the data for the specified category_name
    const filteredCategory = data.find(
      (category) => category.category_name.toLowerCase() === category_name.toLowerCase()
    );

    if (!filteredCategory) {
      return new Response(JSON.stringify({ message: 'Category not found' }), {
        status: 404,
      });
    }

    // Extract the 'sanskrit_name' from the poses in the filtered category
    const sanskritNames = filteredCategory.poses.map(pose => ({
      sanskrit_name: pose.sanskrit_name,
    }));

    return new Response(JSON.stringify(sanskritNames), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
