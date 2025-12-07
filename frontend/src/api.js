// src/services/api.js
const BASE = "http://127.0.0.1:8000";

// Generic GET helper
async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Categories
export const fetchCategories = () => getJSON(`${BASE}/categories/`);

export const createCategory = (name) =>
  fetch(`${BASE}/categories/?name=${encodeURIComponent(name)}`, { method: "POST" })
    .then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    });

// Items
export const fetchItems = () => getJSON(`${BASE}/items/`);

export const createItem = (name, category_id) =>
  fetch(`${BASE}/items/?name=${encodeURIComponent(name)}&category_id=${encodeURIComponent(category_id)}`, {
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  });

export const deleteItem = (id) =>
  fetch(`${BASE}/items/${id}`, { method: "DELETE" }).then(async (r) => {
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  });

// Outfits
export const fetchOutfits = () => getJSON(`${BASE}/outfits/`);

export const createOutfit = (name, occasion) =>
  fetch(`${BASE}/outfits/?name=${encodeURIComponent(name)}&occasion=${encodeURIComponent(occasion || "")}`, {
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  });

export const addItemToOutfit = (outfit_id, item_id) =>
  fetch(`${BASE}/outfit_items/?outfit_id=${outfit_id}&item_id=${item_id}`, { method: "POST" })
    .then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    });

// Item images: we convert file to base64 in frontend and post JSON
export const addItemImage = (imageBase64, item_id) =>
  fetch(`${BASE}/item_images/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item_id, image_url: imageBase64 }),
  }).then(async (r) => {
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  });

export const fetchItemImages = () => getJSON(`${BASE}/item_images/`);
// Outfit-Item associations
export const fetchOutfitItems = () => getJSON(`${BASE}/outfit_items/`);

