import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import {Plant} from '../Service/dto';
import mockData from '../mockData/PlantAPI-Data.json';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const PlantInfoComponent: React.FC = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    //Filters mockData to include plant attributes
    if (mockData && mockData.data && Array.isArray(mockData.data)) {
      const uniqueNames = new Set<string>();
      const filteredData = mockData.data.filter((plant: Plant) => {
        //Removes duplicate plant names and filters search 
        const name = plant.common_name.toLowerCase();
        const nameMatch = name.includes(search.toLowerCase());
        if (nameMatch && !uniqueNames.has(name)) {
          uniqueNames.add(name);
          return true; 
        }
        return false;
      });
    setSearchResults(filteredData);
    setShowDropdown(search.trim() !== '');
    setSelectedPlant(null);
  }
}, [search]);

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
              {searchResults.map((plant: Plant) => (
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
        <View style={styles.resultContainer}>
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
  resultContainer: {
    flex: 1,
    //padding: 16,
    position: 'relative',
    backgroundColor: '#5DB075',
  },
  searchContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginTop: 10,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  plantImage: {
    width: width-(width *.10),
    height: 400,
    paddingRight: 100,
    borderRadius: 25,
    //resizeMode: 'cover',
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

export default PlantInfoComponent;
