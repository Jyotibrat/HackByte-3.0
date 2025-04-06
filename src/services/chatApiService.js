import axios from 'axios';

/**
 * Service for handling API interactions with the chat backend using Axios
 */

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log('===== CHAT API SERVICE INITIALIZATION =====');
console.log('API_URL initialized:', API_URL);

/**
 * Sends a message to the backend and gets a response (images or text)
 */
export const generateFloorPlan = async (prompt, modelKey) => {
    console.log('===== GENERATE FLOOR PLAN API CALL =====');
    console.log('Function called with parameters:');
    console.log('- prompt:', prompt);
    console.log('- modelKey:', modelKey);
    console.log('Using API_URL:', API_URL);
    
    if (!API_URL) {
        console.error('API_URL is not defined! Check your environment variables.');
        throw new Error('API endpoint not configured. Please check your environment variables.');
    }
    
    try {
        // Prepare request data
        const requestData = { prompt, model: modelKey };
        
        // Make request - NOTE: Using 'json' responseType for this backend, not 'arraybuffer'
        console.log('Making request for floor plan generation');
        const response = await axios.post(API_URL, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 300000, // 5 minutes - AI generation can take time
        });
        
        console.log(`Response received: ${response.status}`);
        
        // Process the response - expect JSON with 'success', 'message', and 'images' fields
        if (!response.data.success) {
            throw new Error(response.data.message || 'Unknown error from backend');
        }
        
        const imageArray = response.data.images || [];
        console.log(`Received ${imageArray.length} images from backend`);
        
        // Process each image and convert to data URLs for display
        const processedImages = imageArray.map((img, index) => {
            if (img.type === 'base64' && img.data) {
                return {
                    id: index,
                    imageUrl: `data:image/png;base64,${img.data}`,
                    caption: `Design ${index + 1}`,
                    isDataUrl: true
                };
            }
            return null;
        }).filter(Boolean); // Remove any nulls
        
        console.log(`Successfully processed ${processedImages.length} images`);
        
        // Create response object with all processed images
        return {
            message: response.data.message,
            imageUrl: processedImages.length > 0 ? processedImages[0].imageUrl : null,
            isDataUrl: true,
            allImages: processedImages
        };
    } catch (error) {
        console.error('===== API REQUEST FAILED =====');
        console.error('Error message:', error.message);
        
        if (error.response) {
            console.error('Status:', error.response.status);
            // Get error details from response if available
            const errorMsg = error.response.data?.message || `Server error: ${error.response.statusText}`;
            throw new Error(errorMsg);
        } else if (error.request) {
            throw new Error('No response received from server. Please check your network connection.');
        } else {
            throw new Error(`Request failed: ${error.message}`);
        }
    }
};

// Model key and description functions remain the same
export const getModelApiKey = (modelName) => {
    let apiKey;
    
    switch (modelName) {
        case "Multi Modal Text to Image Generator":
            apiKey = "multi_modal";
            break;
        case "Fused Stable Diffusion and ControlNet":
            apiKey = "stable_diffusion";
            break;
        case "Gemini with Matplotlib Floor Planner":
            apiKey = "floor_gpt";
            break;
        default:
            apiKey = "multi_modal";
            break;
    }
    
    return apiKey;
};

export const getModelDescription = (modelName) => {
    let description;
    
    switch (modelName) {
        case "Multi Modal Text to Image Generator":
            description = "Best for creative and detailed designs";
            break;
        case "Fused Stable Diffusion and ControlNet":
            description = "Great for precise architectural visualization";
            break;
        case "Gemini with Matplotlib Floor Planner":
            description = "Excellent for technical and code-compliant plans";
            break;
        default:
            description = "Specialized AI for floor plan generation";
            break;
    }
    
    return description;
};