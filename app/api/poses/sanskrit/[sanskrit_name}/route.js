// app/api/poses/[category_name]/[sanskrit_name_adapted]/route.js

import fetch from 'node-fetch';

export async function GET(request, { params }) {
  const { category_name, sanskrit_name_adapted } = params;

  try {
    // Fetch data from the external yoga API
    const response = await fetch('https://yoga-api-nzy4.onrender.com/v1/categories');
    const data = await response.json();

    // Find the category that matches the specified category_name
    const filteredCategory = data.find(
      (category) => category.category_name.toLowerCase() === category_name.toLowerCase()
    );

    if (!filteredCategory) {
      return new Response(JSON.stringify({ message: 'Category not found' }), {
        status: 404,
      });
    }

    // Find the pose that matches the specified sanskrit_name_adapted in the filtered category
    const foundPose = filteredCategory.poses.find(
      (pose) => pose.sanskrit_name_adapted.toLowerCase() === sanskrit_name_adapted.toLowerCase()
    );

    if (!foundPose) {
      return new Response(JSON.stringify({ message: 'Pose not found' }), {
        status: 404,
      });
    }

    // Return the 'url_svg' for the found pose
    return new Response(JSON.stringify({ url_svg: foundPose.url_svg }), {
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
