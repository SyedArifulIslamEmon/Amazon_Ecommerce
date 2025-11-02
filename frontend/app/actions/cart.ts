"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL ?? "http://localhost:8000/api";

export async function addToCart(productId: string, quantity: number) {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error: ${text}`);
    }
    const data = await res.json();
    revalidatePath("/cart");
    return { success: true, data };
  } catch (error) {
    console.error("Add to cart failed:", error);
    return { success: false, error: "Failed to add to cart" };
  }
}

export async function removeFromCart(itemId: string) {
  try {
    const res = await fetch(`${API_URL}/cart/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("API error");
    }
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Remove from cart failed:", error);
    return { success: false, error: "Failed to remove from cart" };
  }
}

export async function updateCartItem(itemId: string, quantity: number) {
  try {
    const res = await fetch(`${API_URL}/cart/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) {
      throw new Error("API error");
    }
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Update cart failed:", error);
    return { success: false, error: "Failed to update cart" };
  }
}
