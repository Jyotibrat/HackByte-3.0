from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai
import base64
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

# Setup Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    logger.warning("GEMINI_API_KEY not found in environment variables, using placeholder")
    GEMINI_API_KEY = "YOUR_API_KEY_HERE"  # Replace with your key in production

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Define model URLs
MODEL_CONFIGS = {
    "multi_modal": {
        "name": "multi_modal",
        "urls": [
            "https://f280-34-83-10-91.ngrok-free.app",
            # "https://2127-34-16-255-178.ngrok-free.app/",
            # "https://third-ngrok-url.ngrok-free.app/",
            # "https://fourth-ngrok-url.ngrok-free.app/"
        ]
    },
    "stable_diffusion": {
        "name": "stable_diffusion",
        "urls": ["https://f040-35-240-133-195.ngrok-free.app/"]
    },
    "floor_gpt": {
        "name": "floor_gpt",
        "urls": ["https://16bf-34-60-203-206.ngrok-free.app/"]
    }
}

# Function to filter prompts using Gemini
def is_floor_plan_prompt(prompt: str) -> bool:
    """
    Validates if a prompt is related to floor planning using Gemini.
    
    Args:
        prompt (str): The user's floor plan prompt
        
    Returns:
        bool: True if the prompt is related to floor planning, False otherwise
    """
    try:
        full_prompt = f"""
You are a classifier. Only respond with "True" or "False".

Return "True" ONLY if the following prompt is related to floor planning, house layout, room arrangements, or apartment/house blueprints.

If it is about anime, drawing, gaming, or not related to architecture/floor planning — return "False".

Prompt: \"{prompt}\"
"""
        response = model.generate_content(full_prompt)
        result = response.text.strip().lower().split()[0]
        logger.info(f"Prompt validation result: {result} for '{prompt}'")
        return result == "true"

    except Exception as e:
        logger.error(f"Error while analyzing prompt: {e}")
        return False

# Generate images based on selected model
def generate_images(prompt, model_choice):
    """
    Generates floor plan images using the selected model.
    
    Args:
        prompt (str): The user's floor plan prompt
        model_choice (str): The model ID to use for generation
        
    Returns:
        list: A list of dictionaries containing image data
    """
    data = {"prompt": prompt}
    images = []
    urls = MODEL_CONFIGS[model_choice]["urls"]
    
    logger.info(f"Generating with {MODEL_CONFIGS[model_choice]['name']}...")
    
    for i, url in enumerate(urls):
        try:
            logger.info(f"Sending request to {url}...")
            response = requests.post(f"{url}/generate", json=data, timeout=30)
            
            if response.status_code == 200:
                try:
                    # First, try to parse as JSON with base64 image
                    json_response = response.json()
                    if 'image' in json_response:
                        # Use the base64 image data directly
                        images.append({
                            'index': i,
                            'type': 'base64',
                            'data': json_response['image']
                        })
                    else:
                        # Convert binary response to base64 for API response
                        img_base64 = base64.b64encode(response.content).decode('utf-8')
                        images.append({
                            'index': i,
                            'type': 'base64',
                            'data': img_base64
                        })
                except ValueError:
                    # Not JSON, treat as binary image response
                    img_base64 = base64.b64encode(response.content).decode('utf-8')
                    images.append({
                        'index': i,
                        'type': 'base64',
                        'data': img_base64
                    })
                    
                logger.info(f"Successfully generated image {i+1} from {url}")
            else:
                logger.error(f"Error from {url}: {response.status_code} - {response.text}")
                
        except requests.exceptions.Timeout:
            logger.error(f"Request to {url} timed out after 30 seconds")
        except Exception as e:
            logger.error(f"Exception from {url}: {e}")
    
    return images

# Endpoint to get available models
@app.route('/api/models', methods=['GET'])
def get_models():
    """
    Returns a list of available floor plan generation models.
    
    Returns:
        JSON: List of models with id and name
    """
    model_options = []
    for key, config in MODEL_CONFIGS.items():
        model_options.append({
            'id': key,
            'name': config['name']
        })
    return jsonify({'models': model_options})

# Endpoint to validate prompt
@app.route('/api/validate-prompt', methods=['POST'])
def validate_prompt():
    """
    Validates if a prompt is related to floor planning.
    
    Request body:
        prompt (str): The prompt to validate
        
    Returns:
        JSON: Validation result with valid flag and message
    """
    data = request.json
    prompt = data.get('prompt', '')
    
    if not prompt:
        return jsonify({'valid': False, 'message': 'Empty prompt provided'})
    
    is_valid = is_floor_plan_prompt(prompt)
    
    return jsonify({
        'valid': is_valid,
        'message': 'Valid floor plan prompt' if is_valid else 'The prompt is NOT related to floor planning'
    })

# Main endpoint to generate floor plans
@app.route('/api/generate', methods=['POST'])
def generate_floor_plan():
    """
    Generates floor plans based on the provided prompt and model choice.
    
    Request body:
        prompt (str): The floor plan description
        model (str): The model ID to use
        
    Returns:
        JSON: Generation results with success flag, message, and images
    """
    data = request.json
    prompt = data.get('prompt', '')
    model_choice = data.get('model', '')
    
    logger.info(f"Received generation request: prompt='{prompt}', model='{model_choice}'")
    
    # Validate inputs
    if not prompt:
        logger.warning("Empty prompt provided")
        return jsonify({'success': False, 'message': 'Empty prompt provided'}), 400
        
    if model_choice not in MODEL_CONFIGS:
        logger.warning(f"Invalid model choice: {model_choice}")
        return jsonify({'success': False, 'message': 'Invalid model choice'}), 400
    
    # Optional: validate if prompt is relevant to floor planning
    if not is_floor_plan_prompt(prompt):
        logger.warning(f"Prompt not related to floor planning: '{prompt}'")
        return jsonify({
            'success': False, 
            'message': 'The prompt is NOT related to floor planning'
        }), 400
    
    # Generate images
    try:
        images = generate_images(prompt, model_choice)
        
        if not images:
            logger.error("No images were generated")
            return jsonify({
                'success': False,
                'message': 'No images were generated'
            }), 500
            
        logger.info(f"Successfully generated {len(images)} images")
        return jsonify({
            'success': True,
            'message': f"Generated {len(images)} images with {MODEL_CONFIGS[model_choice]['name']}",
            'images': images
        })
        
    except Exception as e:
        logger.error(f"Error generating images: {str(e)}")
        return jsonify({
            'success': False,
            'message': f"Error generating images: {str(e)}"
        }), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting Floor Planning API on port {port}, debug={debug}")
    app.run(debug=debug, host='0.0.0.0', port=port)