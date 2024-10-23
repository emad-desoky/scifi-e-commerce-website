import { NextResponse } from "next/server";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from '../../../../init-firebase'; // Import your Firebase app

// Initialize Firestore
const db = getFirestore(app);

export async function GET(req, { params }) {
  try {
    const { productId } = params;

    // Reference to the specific product document in Firestore
    const productDocRef = doc(db, 'products', productId); // Ensure 'products' matches your collection name

    // Fetch the product document
    const productDoc = await getDoc(productDocRef);

    // Check if the document exists
    if (!productDoc.exists()) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Success response with product data
    return NextResponse.json({ id: productDoc.id, ...productDoc.data() }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product from Firestore: ", error);

    // Handle errors
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
