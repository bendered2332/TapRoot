import React, { useState } from 'react'; 
import { View, StyleSheet,} from 'react-native'; 
import { Chip } from 'react-native-paper'; 
  
const Chips = () => { 
    const [selectedChips, setSelectedChips] = useState(Array(8).fill(false));
    

    const handleChipPress = (index: number) => {
        setSelectedChips(updatedSelectedChips => {
            const newSelectedChips = [...updatedSelectedChips];
            newSelectedChips[index] = !newSelectedChips[index];
            return newSelectedChips;
        });
    };
    
      return ( 
        <View style={styles.container}>
          {[...Array(8)].map((_,index) => (
            <View key={index} style={styles.chip}> 
              <Chip 
                mode="flat"
                onPress={() => handleChipPress(index)}
                style={{ backgroundColor: selectedChips[index] ? '#FFFF00' : '#FFFFFF' }}
              >  
                Date {index + 1}
              </Chip> 
            </View> 
          ))}
        </View> 
      ); 
    }; 
  
export default Chips; 
  
const styles = StyleSheet.create({ 
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    chip: { 
      width: 150, 
      marginTop: 10,  
      marginVertical: 10,
      marginHorizontal: 5,
    }, 
    column: {
        justifyContent: 'center',
      },
  });