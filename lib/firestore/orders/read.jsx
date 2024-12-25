"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

// Fetch a single order by ID
export function useOrder({ id }) {
  const { data, error } = useSWRSubscription(
    ["orders", id],
    ([path, id], { next }) => {
      const ref = doc(db, `orders/${id}`);
      const unsub = onSnapshot(
        ref,
        (snapshot) => next(null, snapshot.data()),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return { data, error: error?.message, isLoading: data === undefined };
}

// Fetch orders for a specific user by UID
export function useOrders({ uid }) {
  const { data, error } = useSWRSubscription(
    ["orders", uid],
    ([path, uid], { next }) => {
      const ref = query(
        collection(db, path),
        where("uid", "==", uid),
        orderBy("timestampCreate", "desc")
      );
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data())
          ),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return { data, error: error?.message, isLoading: data === undefined };
}

// Fetch all orders with pagination
export function useAllOrders({ pageLimit, lastSnapDoc }) {
  const { data, error } = useSWRSubscription(
    ["orders", pageLimit, lastSnapDoc],
    ([path, pageLimit, lastSnapDoc], { next }) => {
      const ref = collection(db, path);
      let q = query(
        ref,
        limit(pageLimit ?? 10),
        orderBy("timestampCreate", "desc")
      );

      if (lastSnapDoc) {
        q = query(q, startAfter(lastSnapDoc));
      }

      const unsub = onSnapshot(
        q,
        (snapshot) =>
          next(null, {
            list:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs.map((snap) => snap.data()),
            lastSnapDoc:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs[snapshot.docs.length - 1],
          }),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return {
    data: data?.list,
    lastSnapDoc: data?.lastSnapDoc,
    error: error?.message,
    isLoading: data === undefined,
  };
}

// Fetch reviews for a product
export function useReviews({ productId }) {
  const { data, error } = useSWRSubscription(
    ["products", productId, "reviews"],
    ([path, productId], { next }) => {
      const ref = collection(db, `${path}/${productId}/reviews`);
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          ),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return { data, error: error?.message, isLoading: data === undefined };
}

// Fetch checkout sessions for a user
export function useCheckoutSessions({ uid }) {
  const { data, error } = useSWRSubscription(
    ["users", uid, "checkout_sessions"],
    ([path, uid], { next }) => {
      const ref = collection(db, `${path}/${uid}/checkout_sessions`);
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          ),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return { data, error: error?.message, isLoading: data === undefined };
}
