// app/api/categories/route.js

import fetch from 'node-fetch';

export async function GET(request) {
  try {
    // Fetch data from the external yoga API
    const response = await fetch('https://yoga-api-nzy4.onrender.com/v1/categories');
    const data = await response.json();

    // Extract only the 'category_name' from each category
    const categoryNames = data.map(category => ({
      category_name: category.category_name,
    }));

    return new Response(JSON.stringify(categoryNames), {
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
