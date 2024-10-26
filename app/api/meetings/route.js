import { databases } from "@/appwriteConfig";
import { NextResponse } from "next/server";

const databaseId = '671ca51c002834b5f853'; // Replace with your actual database ID
const collectionId = '671ca5b0001995accc03'; // Replace with your actual collection ID

export async function POST(req) {
  try {
    const { title, date, time, link } = await req.json(); // Ensure req.json() is used

    const meetingData = {
      title,
      date,
      time,
      link,
    };

    const response = await databases.createDocument(
      databaseId,
      collectionId,
      'unique()', // Generates a unique document ID
      meetingData
    );

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create meeting', error: error.message });
  }
}
export async function GET() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);

    return NextResponse.json(response.documents); // Return only documents array from response
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch meetings', error: error.message });
  }
}