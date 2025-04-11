import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

const MODELS = [
  {
    id: 'floor_gpt',
    name: 'Gemini Model',
    description: 'This model leverages the power of Gemini for language understanding and Matplotlib for graphical rendering to convert natural language prompts into precise, data-driven floor plan visualizations.',
    architecture: 'This model converts user prompts into structured JSON using Gemini and then visualizes the data as floor plan images using Matplotlib.',
    architectureImage: require('../../assets/images/Model Architectures/Gemini with matplotlib model architecture.jpg'),
    workflow: [
      'User Prompt: The user provides a natural language description of the desired floor plan or layout.',
      'Gemini Processing: The prompt is interpreted by the Gemini model, which uses advanced prompt engineering to extract structured information.',
      'JSON Output Generation: Gemini transforms the prompt into a JSON-formatted representation that outlines the elements, dimensions, and layout logic needed to construct the floor plan.',
      'Visualization with Matplotlib: This JSON data is passed into Matplotlib, a powerful Python visualization library, which accurately renders the graphical representation of the specified layout.',
      'Final Output: The result is a graph-based floor plan image that visually reflects the user\'s original request.'
    ],
    footer: 'This model is ideal for programmatic floor plan generation from natural language, allowing users to go from idea to visual output seamlessly. It\'s especially useful for architects, designers, and planners looking to experiment with layout ideas quickly.'
  },
  {
    id: 'multi_modal',
    name: 'Multi-Modal',
    description: 'The Multi-Modal model is a parallel processing architecture designed to enhance creativity and diversity in AI-generated visuals. It takes a single user prompt, processes it through an NLP filter to ensure clarity and appropriateness, and then routes it through a multi-model system that simultaneously utilizes four different text-to-image generators.',
    architecture: 'This model processes a user prompt through an NLP filter and sends it to four parallel text-to-image generators to produce diverse visual outputs simultaneously.',
    architectureImage: require('../../assets/images/Model Architectures/Multi Modal Architecture .jpg'),
    features: [
      'Stability AI - Stable Diffusion',
      'ZB-Tech Text-to-Image Generator',
      'Cloudqi Text-to-Image Generator',
      'Runwayml Stable Diffusion'
    ],
    footer: 'Each of these generators interprets the refined prompt independently, resulting in four unique image outputs for the same input. This approach offers users a variety of interpretations, enriching the creative possibilities and providing a broader visual exploration of a concept. The architecture supports rapid experimentation and comparison, making it especially useful for design teams, content creators, and researchers exploring prompt-based visual generation.'
  },
  {
    id: 'stable_diffusion',
    name: 'Fused Stable Diffusion with ControlNet',
    description: 'This advanced model architecture integrates ControlNet with Stable Diffusion in a two-phase process to deliver highly controlled and refined image generation. Designed to enhance precision and visual coherence, this model takes user input and refines it into a final output through multiple structured steps.',
    architecture: 'This model combines ControlNet and Stable Diffusion in a two-step process to generate and refine images from user prompts with enhanced structure and detail.',
    architectureImage: require('../../assets/images/Model Architectures/Stable Diffusion and ControlNet Architecture.jpg'),
    workflow: [
      'Input Filtering: The user\'s text prompt is first processed through an NLP filter to ensure clarity and compliance.',
      'Initial ControlNet Pass: ControlNet guides the prompt by introducing structural constraints or references, enhancing context before generation begins.',
      'Stable Diffusion Generation: Using the controlled prompt, the Stable Diffusion model generates an initial image that closely aligns with the intended structure and content.',
      'Post-Processing with ControlNet: The generated image is passed again through ControlNet, which further enhances the visual elements and refines details based on predefined cues.',
      'Final Output: The result is a high-quality, context-aware, and visually enriched image.'
    ],
    footer: 'This dual-pass mechanism using ControlNet ensures both creative flexibility and structural consistency, making the model ideal for use cases where precision, layout control, or adherence to reference images is crucial—such as floor plans, illustrations, or scene-based visualizations.'
  },
];

export default function ModelsScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Models</Text>
      <Text style={styles.subtitle}>Explore our specialized floor plan generation models</Text>

      {MODELS.map((model) => (
        <View key={model.id} style={styles.modelCard}>
          <Text style={styles.modelName}>{model.name}</Text>
          
          {model.description ? (
            <Text style={styles.modelDescription}>{model.description}</Text>
          ) : null}
          
          {model.features && model.features.length > 0 ? (
            <View style={styles.listContainer}>
              {model.features.map((feature, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.itemText}>{feature}</Text>
                </View>
              ))}
            </View>
          ) : null}
          
          {model.workflow && model.workflow.length > 0 ? (
            <View style={styles.listContainer}>
              {model.workflow.map((step, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.numberPoint}>{index + 1}.</Text>
                  <Text style={styles.itemText}>{step}</Text>
                </View>
              ))}
            </View>
          ) : null}
          
          <View style={styles.architectureContainer}>
            <Text style={styles.architectureTitle}>Model Architecture</Text>
            <Text style={styles.architectureText}>{model.architecture}</Text>
            
            {model.architectureImage && (
              <View style={styles.imageContainer}>
                <Image 
                  source={model.architectureImage} 
                  style={styles.architectureImage}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
          
          {model.footer ? (
            <Text style={styles.footerText}>{model.footer}</Text>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    marginTop: 60,
    marginBottom: 8,
    paddingHorizontal: 20,
    color: '#1a1a1a',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 24,
    paddingHorizontal: 20,
    color: '#666666',
  },
  modelCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  modelName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  modelDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 16,
    lineHeight: 24,
  },
  listContainer: {
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 8,
  },
  bulletPoint: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4a4a4a',
    marginRight: 8,
    width: 12,
  },
  numberPoint: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginRight: 8,
    width: 20,
  },
  itemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#4a4a4a',
    flex: 1,
    lineHeight: 22,
  },
  architectureContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  architectureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  architectureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  architectureImage: {
    width: '100%',
    height: 180,
    borderRadius: 4,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#4a4a4a',
    lineHeight: 22,
    marginTop: 4,
  },
});