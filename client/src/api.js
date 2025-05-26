import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Example: Fetch Hero data
export const fetchHeroData = async () => {
  try {
    const response = await axios.get(`${API_URL}/hero`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Hero data:", error);
    throw error;
  }
};

// Fetch Services data
export const createCheckoutSession = async (product) => {
  try {
    const response = await api.post("/create-checkout-session", { product });
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }

}

// Fetch About data
export const fetchAbout = async () => {
  try {
    const response = await axios.get(`${API_URL}/about`);
    return response.data;
  } catch (error) {
    console.error("Error fetching About data:", error);
    throw error;
  }
};

// Fetch Contact data (if needed)
   export async function submitContactForm(formData) {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Contact API Error:", data);
      return { success: false, error: data.error || "Something went wrong" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Network error while sending contact form:", error);
    return { success: false, error: "Network error" };
  }
}


// Fetch Blog posts
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Blogs:", error);
    throw error;
  }
};
