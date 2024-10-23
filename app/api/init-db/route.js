// Import required modules
import fs from 'fs'; // To read files from the filesystem
import app from '../../../init-firebase'; // Import your Firebase app
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Firestore functions
import { NextResponse } from 'next/server';

// Initialize Firestore
const db = getFirestore(app);

// Array of file names to your JSON files
const jsonFileNames = [
  'products.json'
];

// Function to read JSON file and add its data to Firestore
async function migrateData(fileName) {
  try {
    const filePath = `./data/${fileName}`;
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const collectionName = fileName.replace('.json', ''); // Remove file extension

    // Add each JSON object to Firestore with a specified document ID
    await Promise.all(jsonData.products.map(async (data) => {
      const docId = String(data.id); // Ensure the ID is a string
      try {
        await setDoc(doc(db, collectionName, docId), data); // Use setDoc instead of addDoc
        console.log(`Document with ID ${docId} added to collection ${collectionName}`);
      } catch (error) {
        console.error(`Error adding document with ID ${docId} to collection ${collectionName}:`, error);
      }
    }));
  } catch (error) {
    console.error(`Error reading JSON file ${fileName}:`, error);
  }
}

export async function GET() {
  // Loop through each JSON file and migrate its data to Firestore
  await Promise.all(jsonFileNames.map(async (fileName) => {
    await migrateData(fileName);
  }));

  // Respond once all migrations are complete
  return NextResponse.json({ message: 'Data migration to Firestore completed.' });
}
