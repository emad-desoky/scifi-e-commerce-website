import { NextResponse } from 'next/server';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../../../init-firebase'; // Import your Firebase app

// Initialize Firestore
const db = getFirestore(app);

export async function GET(req) {
  try {
    // Fetch all products from Firestore
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    
    // Convert the Firestore documents to an array
    const products = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // If no products are found, send a 404 response
    if (products.length === 0) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }

    // Shuffle the products array and pick 5 random products
    const shuffled = products.sort(() => 0.5 - Math.random());
    const recommendedProducts = shuffled.slice(0, 5);
    
    // Return the 5 random products
    return NextResponse.json(recommendedProducts, { status: 200 });

  } catch (error) {
    console.error("Error fetching products from Firestore: ", error);

    // Handle errors
    return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
  }
}
