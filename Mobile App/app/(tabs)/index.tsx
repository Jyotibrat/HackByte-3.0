import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Download } from 'lucide-react-native';

// Remove spaces from URL - this was causing issues
const API_URL = 'https://6875-139-167-143-182.ngrok-free.app';

const MODELS = [
  { id: 'floor_gpt', name: 'Gemini Model' },
  { id: 'multi_modal', name: 'Multi-Modal' },
  { id: 'stable_diffusion', name: 'Fused Stable Diffusion with ControlNet' },
];

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('floor_gpt');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking');
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  // Check if the server is reachable on component mount
  useEffect(() => {
    checkServerConnection();
    
    // Request media library permissions on Android at startup
    if (Platform.OS === 'android') {
      (async () => {
        await requestPermission();
      })();
    }
  }, []);

  const checkServerConnection = async () => {
    try {
      setServerStatus('checking');
      console.log(`Checking server at: ${API_URL}/health`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      // Set up fetch options for better debugging
      const fetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      };
      
      console.log('Fetch options:', JSON.stringify(fetchOptions));
      
      const response = await fetch(`${API_URL}/health`, fetchOptions);
      
      clearTimeout(timeoutId);
      
      console.log('Response received:', response.status);
      
      if (response.ok) {
        console.log('Server connection successful');
        setServerStatus('connected');
      } else {
        console.log('Server returned error status:', response.status);
        setServerStatus('error');
      }
    } catch (error) {
      console.error('Server connection failed:', error);
      setServerStatus('failed');
      
      // Enhanced error reporting
      if (Platform.OS !== 'web') {
        Alert.alert(
          'Server Connection Failed',
          `Could not connect to ${API_URL}. Make sure:\n\n` +
          `1. Your Flask server is running\n` +
          `2. Your device is on the same network as your development machine\n` +
          `3. Your ngrok tunnel is active and properly configured\n` +
          `4. No firewalls are blocking the connection\n\n` +
          `Technical details: ${error.message}`
        );
      }
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  const generateFloorPlan = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your floor plan');
      return;
    }

    setError(null);
    setLoading(true);
    console.log(`Sending request to: ${API_URL}/api/generate`);
    console.log('Request data:', { prompt, model: selectedModel });
    
    try {
      // Added timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout
      
      const response = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        let errorMessage = 'Failed to generate floor plan';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If can't parse JSON, use the raw text
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);
      
      if (responseData.success) {
        // Check all possible image data locations in the response
        if (responseData.images && responseData.images.length > 0) {
          console.log('Setting image from images array');
          setImage(responseData.images[0].data);
        } else if (responseData.image && typeof responseData.image === 'string') {
          console.log('Setting image from image property');
          setImage(responseData.image);
        } else if (responseData.image && responseData.image.data) {
          console.log('Setting image from image.data property');
          setImage(responseData.image.data);
        } else {
          console.error('No image data in response');
          throw new Error('No image data in response');
        }
      } else {
        throw new Error(responseData.message || responseData.error || 'Failed to generate floor plan');
      }
    } catch (error) {
      console.error('Error in generateFloorPlan:', error);
      if (error.name === 'AbortError') {
        setError('Request timed out. The server may be busy or unreachable.');
      } else {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!image) return;

    if (Platform.OS !== 'web') {
      try {
        // Check for permissions
        if (!status?.granted) {
          const permission = await requestPermission();
          if (!permission.granted) {
            Alert.alert(
              'Permission Required',
              'Storage permission is needed to save images.',
              [{ text: 'OK' }]
            );
            return;
          }
        }
        
        const filename = `floor-plan-${Date.now()}.png`;
        const base64Data = image;
        const fileUri = `${FileSystem.documentDirectory}${filename}`;
        
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (Platform.OS === 'ios') {
          const canShare = await Sharing.isAvailableAsync();
          if (canShare) {
            await Sharing.shareAsync(fileUri);
          } else {
            Alert.alert('Sharing is not available on this device');
          }
        } else {
          const asset = await MediaLibrary.saveToLibraryAsync(fileUri);
          if (asset) {
            Alert.alert('Success', 'Floor plan saved to your photo library!');
          }
        }
      } catch (error) {
        console.error('Error downloading image:', error);
        Alert.alert('Error', 'Failed to save the image: ' + error.message);
      }
    } else {
      // Web platform
      try {
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${image}`;
        link.download = `floor-plan-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading image on web:', error);
        setError('Failed to download image on this platform');
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>AI Floor Plan Generator</Text>
      <Text style={styles.subtitle}>
        Describe your dream floor plan and let AI bring it to life
      </Text>

      {serverStatus === 'failed' && (
        <View style={[styles.statusContainer, styles.errorContainer]}>
          <Text style={styles.errorText}>
            Cannot connect to server. Check your network settings and ensure the server is running.
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={checkServerConnection}>
            <Text style={styles.retryButtonText}>Retry Connection</Text>
          </TouchableOpacity>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.modelSelector}>
        <Text style={styles.label}>Select Model</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedModel}
            onValueChange={(itemValue) => setSelectedModel(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}>
            {MODELS.map((model) => (
              <Picker.Item
                key={model.id}
                label={model.name}
                value={model.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="E.g., A modern open-concept living space with a kitchen island..."
        value={prompt}
        onChangeText={(text) => {
          setPrompt(text);
          setError(null);
        }}
        multiline
        numberOfLines={4}
        placeholderTextColor="#666666"
      />

      <TouchableOpacity
        style={[styles.button, (loading || serverStatus === 'failed') && styles.buttonDisabled]}
        onPress={generateFloorPlan}
        disabled={loading || serverStatus === 'failed'}>
        <Text style={styles.buttonText}>
          {loading ? 'Generating...' : 'Generate Floor Plan'}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={styles.loader} size="large" color="#007AFF" />}

      {image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${image}` }}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.downloadButton} onPress={downloadImage}>
            <Download size={24} color="#ffffff" />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>API URL: {API_URL}</Text>
        <Text style={styles.debugText}>Server status: {serverStatus}</Text>
        <Text style={styles.debugText}>Platform: {Platform.OS}</Text>
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={checkServerConnection}>
          <Text style={styles.debugButtonText}>Check Connection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    marginTop: Platform.OS === 'web' ? 20 : 60,
    marginBottom: 8,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 32,
  },
  statusContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  modelSelector: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  picker: {
    backgroundColor: 'transparent',
    width: '100%',
    ...Platform.select({
      ios: {
        height: 150,
      },
      android: {
        height: 50,
      },
      web: {
        height: 50,
      },
    }),
  },
  pickerItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    minHeight: 120,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  loader: {
    marginTop: 20,
  },
  imageContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    gap: 8,
  },
  downloadText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  debugContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  debugText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  debugButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  debugButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  }
});