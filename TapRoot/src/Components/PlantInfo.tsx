import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';import {Plant} from '../SubComponents/plant';

const PlantInfo: React.FC = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const PLANT_API_ENDPOINT = 'https://perenual.com/api/species-list?page=1&key=sk-Gbz165bc10560ff033875&indoor=1';

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const PlantResponse = await fetch(`${PLANT_API_ENDPOINT}`);

        if (!PlantResponse.ok) {
          throw new Error('Failed to fetch Plant data');
        }
    
        const PlantData = await PlantResponse.json();

        console.log('Plant Data:', PlantData);
        // Handle the data from Plant API
      
        setSearchResults(PlantData.data);
        setShowDropdown(PlantData.data.length > 0);
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
            <View style={styles.dropdown}>
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
        {selectedPlant && selectedPlant.default_image && (
        <View>
        <Text style={styles.selectedPlant}>Selected Plant: {selectedPlant.common_name}</Text>
        <Image source={{ uri: selectedPlant.default_image.original_url }} style={styles.plantImage} />
        <Text style={styles.wateringStyle}>Watering: {selectedPlant.watering}</Text>
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
    resizeMode: 'cover',
  },
  selectedPlant: {
    paddingTop: 40,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  wateringStyle: {
    paddingTop: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
},
});

export default PlantInfo;
