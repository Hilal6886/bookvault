import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { admin, adminDB } from "@/lib/firebase_admin";
import Link from "next/link";

const fetchCheckout = async (checkoutId) => {
  try {
    const list = await adminDB
      .collectionGroup("checkout_sessions_cod")
      .where("id", "==", checkoutId)
      .get();

    if (list.empty) {
      console.error(`No document found for checkout ID: ${checkoutId}`);
      return null;
    }

    const checkoutData = list.docs[0].data();
    
    const expirationTime = checkoutData?.expirationTime; // Assuming expirationTime is stored in Firestore
    const currentTime = new Date().getTime();

    if (expirationTime && currentTime > expirationTime) {
      console.error(`Checkout ID ${checkoutId} has expired.`);
      return null;
    }

    return checkoutData;
  } catch (error) {
    console.error("Error fetching checkout:", error);
    return null;
  }
};


// Process order and save to Firestore
const processOrder = async ({ checkout }) => {
  try {
    const orderRef = adminDB.doc(`orders/${checkout?.id}`);
    const orderDoc = await orderRef.get();

    // Prevent duplicate order processing
    if (orderDoc.exists) {
      console.log("Order already processed for ID:", checkout.id);
      return false;
    }

    const uid = checkout?.metadata?.uid;

    // Create order document
    await orderRef.set({
      checkout: checkout,
      payment: {
        amount: checkout?.line_items?.reduce((prev, curr) => {
          return prev + curr?.price_data?.unit_amount * curr?.quantity;
        }, 0),
      },
      uid: uid,
      id: checkout?.id,
      paymentMode: "cod",
      timestampCreate: admin.firestore.Timestamp.now(),
    });

    const productList = checkout?.line_items?.map((item) => ({
      productId: item?.price_data?.product_data?.metadata?.productId,
      quantity: item?.quantity,
    }));

    // Update user's cart
    const userRef = adminDB.doc(`users/${uid}`);
    const userDoc = await userRef.get();

    const productIdsList = productList?.map((item) => item?.productId);
    const newCartList = (userDoc?.data()?.carts ?? []).filter(
      (cartItem) => !productIdsList.includes(cartItem?.id)
    );

    await userRef.set(
      {
        carts: newCartList,
      },
      { merge: true }
    );

    // Update product orders
    const batch = adminDB.batch();

    for (const item of productList) {
      const productRef = adminDB.doc(`products/${item?.productId}`);
      const productDoc = await productRef.get();

      if (productDoc.exists) {
        batch.update(productRef, {
          orders: admin.firestore.FieldValue.increment(item?.quantity),
        });
      } else {
        console.error("Product not found for ID:", item?.productId);
      }
    }

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error processing order:", error);
    throw new Error("Failed to process order. Please try again.");
  }
};

// Main page component
export default async function Page({ searchParams }) {
  const { checkout_id } = searchParams;

  console.log("Received checkout_id:", checkout_id);

  try {
    // Fetch checkout session
    const checkout = await fetchCheckout(checkout_id);

    if (!checkout) {
      throw new Error("Invalid or Expired Checkout ID");
    }

    // Process the order
    const result = await processOrder({ checkout });

    if (!result) {
      throw new Error("Order already processed.");
    }

    return (
      <main>
        <Header />
        <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
          <div className="flex justify-center w-full">
            <img src="/svgs/Mobile payments-rafiki.svg" className="h-48" alt="Order Placed" />
          </div>
          <h1 className="text-2xl font-semibold text-green">
            Your Order Is{" "}
            <span className="font-bold text-green-600">Successfully</span> Placed
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <Link href={"/account"}>
              <button className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg bg-white">
                Go To Orders Page
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error processing checkout page:", error);

    return (
      <main>
        <Header />
        <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
          <h1 className="text-2xl font-semibold text-red-600">
            An error occurred: {error.message}
          </h1>
          <Link href="/">
            <button className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg bg-white">
              Go Back to Home
            </button>
          </Link>
        </section>
        <Footer />
      </main>
    );
  }
}
