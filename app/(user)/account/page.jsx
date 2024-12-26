"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/lib/firestore/orders/read";
import { CircularProgress } from "@nextui-org/react";

export default function Page() {
  const { user } = useAuth();

  const { data: orders, error, isLoading } = useOrders({ uid: user?.uid });

  console.log("Loading:", isLoading); // Check loading state
  console.log("Error:", error); // Check error state
  console.log("Orders:", orders); // Check orders data

  if (isLoading) {
    return (
      <div className="flex justify-center py-48" aria-label="Loading orders">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error loading orders: {error}</div>;
  }

  return (
    <main className="flex flex-col gap-4 p-5" aria-label="Orders page">
      <h1 className="text-2xl font-semibold">My Orders</h1>
      {(!orders || orders?.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-3 py-11" aria-label="No orders available">
          <div className="flex justify-center" aria-label="Empty orders illustration">
            <img
              className="h-44"
              src="/svgs/Empty-pana.svg"
              alt="No orders available"
              aria-label="No orders available illustration"
            />
          </div>
          <h1>You have no order</h1>
        </div>
      )}
      <div className="flex flex-col gap-3" aria-label="Order list">
        {orders?.map((item, orderIndex) => {
          const totalAmount = item?.checkout?.line_items?.reduce(
            (prev, curr) => {
              return (
                prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity
              );
            },
            0
          );
          return (
            <div key={item?.id} className="flex flex-col gap-2 border rounded-lg p-4" aria-label={`Order ${orderIndex + 1}`}>
              <div className="flex flex-col gap-2" aria-label="Order details">
                <div className="flex gap-3" aria-label="Order summary">
                  <h3>{orderIndex + 1}</h3>
                  <h3 className="bg-blue-100 text-blue-500 text-xs rounded-lg px-2 py-1 uppercase">
                    {item?.paymentMode}
                  </h3>
                  <h3 className="bg-green-100 text-green-500 text-xs rounded-lg px-2 py-1 uppercase">
                    {item?.status ?? "pending"}
                  </h3>
                  <h3 className="text-green-600">₹ {totalAmount}</h3>
                </div>
                <h4 className="text-gray-600 text-xs">
                  {item?.timestampCreate?.toDate()?.toString()}
                </h4>
              </div>
              <div aria-label="Product items in the order">
                {item?.checkout?.line_items?.map((product) => {
                  return (
                    <div key={product?.price_data?.product_data?.productId} className="flex gap-2 items-center" aria-label={`Product: ${product?.price_data?.product_data?.name}`}>
                      <img
                        className="h-10 w-10 rounded-lg"
                        src={product?.price_data?.product_data?.images?.[0]}
                        alt={`Image of ${product?.price_data?.product_data?.name}`}
                        aria-label={`Image of ${product?.price_data?.product_data?.name}`}
                      />
                      <div>
                        <h1 className="">{product?.price_data?.product_data?.name}</h1>
                        <h1 className="text-gray-500 text-xs">
                          ₹ {product?.price_data?.unit_amount / 100}{" "}
                          <span>X</span>{" "}
                          <span>{product?.quantity?.toString()}</span>
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
