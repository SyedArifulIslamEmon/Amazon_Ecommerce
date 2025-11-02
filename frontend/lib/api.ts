import "server-only";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json() as Promise<T>;
}

export async function getProducts(params: Record<string, string> = {}) {
  const qs = new URLSearchParams(params);
  const url = `${API_URL}/products${qs.toString() ? `?${qs.toString()}` : ""}`;
  const res = await fetch(url, {
    next: { revalidate: 30 },
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(`${API_URL}/products/${slug}`, {
    next: { revalidate: 30 },
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
}

export async function searchProducts(query: string) {
  const res = await fetch(`${API_URL}/ai/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return handleResponse(res);
}

export async function getRecommendations(query: string) {
  const res = await fetch(`${API_URL}/ai/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return handleResponse(res);
}
