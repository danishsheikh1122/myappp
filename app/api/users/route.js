import { databases } from "@/appwriteConfig";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

const databaseId = '671ca51c002834b5f853'; // Replace with your actual database ID
const collectionId = '671d5e8100289c17f83c'; // Replace with your actual collection ID

export async function POST(req) {
  try {
    const {userId, name, email } = await req.json(); // Ensure req.json() is used

    const response = await databases.createDocument(databaseId, collectionId, 'unique()', {
      userId,
      name,
      email,
      points: 0,
      age: null,
      bp: null,
      screen_time: 0
    });
  
    return NextResponse.json({ message: 'User created successfully', userId: response.$id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create user', error: error.message }, { status: 400 });
  }
}

/// Get user information by userId
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId'); // Get userId from query parameters
  console.log('Incoming userId:', userId);

  if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
      // List documents with a query to find the one with the specified userId
      const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal('userId', userId) // Query by userId
      ]);

      // Check if we found any documents
      if (response.documents.length === 0) {
          return NextResponse.json({ message: 'No user found with the specified userId.' }, { status: 404 });
      }

      // Return the first matching document
      return NextResponse.json(response.documents[0], { status: 200 });
  } catch (error) {
      console.error('Error fetching user:', error); // Log error for debugging
      return NextResponse.json({ message: 'Failed to fetch user', error: error.message }, { status: 400 });
  }
}

  // Update user information
// Update user information
export async function PUT(req) {
  const { userId, name, email, points, age, bp, screen_time } = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('userId'); // Get userId from query parameters
  console.log('Incoming data:', { userId, name, email, points, age, bp, screen_time }); // Log incoming data

  // Use the userId from the incoming data if provided
  const userToUpdate = userId || id;

  // Check if userId is provided
  if (!userToUpdate) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  // Validate incoming data
  const requiredFields = { name, email, age, bp };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === null) {
      return NextResponse.json({ message: `${key} is required` }, { status: 400 });
    }
  }

  // Assign default values if not provided
  const updatedData = {
    name,
    email,
    points: points !== undefined ? points : 0, // Default to 0 if not provided
    age,
    bp,
    screen_time: screen_time !== undefined ? screen_time : 0 // Default to 0 if not provided
  };

  try {
    // Log the user ID being checked
    console.log(`Checking existence of document with userId: ${userToUpdate}`);

    // Find the document by userId
    const existingUser = await databases.listDocuments(databaseId, collectionId, [
      Query.equal('userId', userToUpdate) // Query by userId
    ]);

    // Check if any documents were found
    if (existingUser.documents.length === 0) {
      console.log(`User with userId ${userToUpdate} not found in the database.`);
      return NextResponse.json({ message: 'User not found', error: 'Document with the requested userId could not be found.' }, { status: 404 });
    }

    // Use the first found document's ID for the update
    const documentId = existingUser.documents[0].$id;

    // Proceed to update the document
    const response = await databases.updateDocument(databaseId, collectionId, documentId, updatedData);
    console.log('Update response:', response);

    return NextResponse.json({ message: 'User updated successfully', userId: response.$id }, { status: 200 });
  } catch (error) {
    // Log the error message for better debugging
    console.error('Error updating user:', error); // Log error for debugging

    // General error handling
    return NextResponse.json({ message: 'Failed to update user', error: error.message }, { status: 400 });
  }
}
