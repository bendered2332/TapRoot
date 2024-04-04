import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { ChipsProps } from '../Service/dto';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const Chips: React.FC<ChipsProps> = ({ data, onSelectedChipsChange }) => {
  if (!data || data.length === 0) {
    return <ActivityIndicator animating={true} color={MD2Colors.purple600} />
  }
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleChipPress = (id: string) => {
    setSelectedChips((prevSelectedChips) => {
      if (prevSelectedChips.includes(id)) {
        return prevSelectedChips.filter((chipId) => chipId !== id);
      } else {
        return [...prevSelectedChips, id];
      }
    });
  };

  useEffect(() => {
    // Call the callback function to notify parent component of selected chips change
    onSelectedChipsChange(selectedChips);
  }, [selectedChips, onSelectedChipsChange]);
  
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedChips([]);
    } else {
      const allChipIds = data.map((chip) => chip.id); // get all the ID's for the chips
      setSelectedChips(allChipIds);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const isChipSelected = (id: string) => {
    return selectedChips.includes(id);
  };

  return (
    <View style={styles.container}>
      {data.map((chip) => (
        <View key={chip.id} style={styles.chip}>
          <Chip
            mode="flat"
            onPress={() => handleChipPress(chip.id)}
            style={{ backgroundColor: isChipSelected(chip.id) ? '#FFFF00' : '#FFFFFF' }}
          >
            {chip.date}
          </Chip>
        </View>
      ))}
      <View>
      <Chip
          mode="flat"
          onPress={toggleSelectAll}
          style={styles.selectAllButton}
        >
          {selectAll ? 'Deselect All' : 'Select All'}
        </Chip>
      </View>
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
    width: 'auto',
    marginTop: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  column: {
    justifyContent: 'center',
  },
  selectAllButton: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    margin: 10,
  },
})


