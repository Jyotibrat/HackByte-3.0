import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Github, Linkedin } from 'lucide-react-native';

const CONTRIBUTORS = [
  {
    name: 'Bindupautra Jyotibrat',
    role: 'AI & Backend Developer',
    photo: require('../../assets/images/Contributors/Bindupautra Jyotibrat.jpg'),
    github: 'https://github.com/Jyotibrat',
    linkedin: 'https://www.linkedin.com/in/bindupautra-jyotibrat/',
  },
  {
    name: 'Ansh Gaur',
    role: 'Machine Learning Expert',
    photo: require('../../assets/images/Contributors/Ansh Photo.jpg'),
    github: 'https://github.com/Lucifer-here',
    linkedin: 'https://www.linkedin.com/in/ansh-gaur-700320322/',
  },
  {
    name: 'Avinash Kushwaha',
    role: 'Full Stack Developer',
    photo: require('../../assets/images/Contributors/Avinash Kushwaha.jpeg'),
    github: 'https://github.com/AvinashK47',
    linkedin: 'https://www.linkedin.com/in/avinashkushwaha47/',
  },
  {
    name: 'Arunim Gogoi',
    role: 'UX Designer',
    photo: require('../../assets/images/Contributors/Arunim Gogoi.png'),
    github: 'https://github.com/Arunim-Gogoi',
    linkedin: 'https://www.linkedin.com/in/arunim-gogoi-4b1848340/',
  },
];


export default function ContributorsScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Our Team</Text>
      <Text style={styles.subtitle}>Meet the brilliant minds behind Floor Planning AI</Text>

      <View style={styles.grid}>
        {CONTRIBUTORS.map((contributor) => (
          <View key={contributor.name} style={styles.contributorCard}>
            <Image
              source={contributor.photo}
              style={styles.photo}
            />
            <Text style={styles.name}>{contributor.name}</Text>
            <Text style={styles.role}>{contributor.role}</Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity
                onPress={() => Linking.openURL(contributor.github)}
                style={styles.socialButton}>
                <Github size={20} color="#1a1a1a" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(contributor.linkedin)}
                style={styles.socialButton}>
                <Linkedin size={20} color="#1a1a1a" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
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
  grid: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  contributorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  role: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    textAlign: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialButton: {
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
});