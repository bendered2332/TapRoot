import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Plant {
  id: number;
  common_name: string;
  image_url: string;
  ground_humidity: number;
}

// interface PlantCare {
//   id: number;
//   water: string;
//   sunlight: string;
//   // Add more properties as needed
// }

const PlantInfo: React.FC = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const TREFLE_API_KEY = '3ZX2ZZ7ZhgGiN233l_cOWmrBjNOvucjg1ZIDKeA2D64';
  const TREFLE_PLANTS_API_ENDPOINT = `https://trefle.io/api/v1/plants?token=${TREFLE_API_KEY}&q=`;


  const dropdownRef = useRef<View>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const trefleResponse = await fetch(`${TREFLE_PLANTS_API_ENDPOINT}${search}`);

        if (!trefleResponse.ok) {
          throw new Error('Failed to fetch Trefle data');
        }
    
        const trefleData = await trefleResponse.json();

        console.log('Trefle Data:', trefleData);
        // Handle the data from Trefle API
      
        setSearchResults(trefleData.data);
        setShowDropdown(trefleData.data.length > 0);
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };
    

    if (search.length > 0) {
      fetchPlants();
    } else {
      setShowDropdown(false);
    }

    setSelectedPlant(null);
  }, [search]);

  const filteredPlants = searchResults.filter(
    (plant) =>
      plant.common_name?.toLowerCase().includes(search.toLowerCase())
      )
  const handleSelectPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setSearch(plant.common_name);
    setShowDropdown(false);
  };

  const handleSearchbarClick = () => {
    setShowDropdown(true);
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    setShowDropdown(true);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search Plant..."
            onFocus={handleSearchbarClick}
            onChangeText={handleSearchChange}
            value={search}
          />
          {showDropdown && (
            <View style={styles.dropdown} ref={dropdownRef}>
              {filteredPlants.map((plant: Plant) => (
                <TouchableOpacity
                  key={plant.id}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectPlant(plant)}
                >
                  <Text>{plant.common_name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {selectedPlant && (
        <View>
          <Text style={styles.selectedPlant}>Selected Plant: {selectedPlant.common_name}</Text>
          <Image source={{ uri: selectedPlant.image_url }} style={styles.plantImage} />
            <Text style={styles.soilHumidity}>
              Soil Humidity: {selectedPlant.ground_humidity}
            </Text>
        </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#5DB075',
  },
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    backgroundColor: '#5DB075',
  },
  searchContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 58,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  plantImage: {
    width: 380,
    height: 400,
    padding: 20,
    borderRadius: 25,
  },
  selectedPlant: {
    paddingTop: 40,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  soilHumidity: {
    paddingTop: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
},
});

export default PlantInfo;
