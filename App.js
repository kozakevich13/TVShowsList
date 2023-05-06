import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tvShows, setTvShows] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = response.data;
      setTvShows(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('Details', {
          id: item.show.id,
          name: item.show.name,
        })
      }>
      <ListItem.Content>
        <ListItem.Title>{item.show.name}</ListItem.Title>
        <ListItem.Subtitle>{item.show.rating.average}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon name="chevron-right" />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type the show's name"
        onChangeText={text => {
          setSearchQuery(text);
          handleSearch(text);
        }}
        value={searchQuery}
      />
      <FlatList
        data={tvShows}
        renderItem={renderItem}
        keyExtractor={(item) => item.show.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <MaterialIcons name="tv" size={50} color="#bbb" />
            <ListItem.Title style={styles.emptyListText}>
              {tvShows.length === 0
                ? 'Type the show name to search'
                : 'Sorry, nothing found with this search'}
            </ListItem.Title>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyListText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchbarContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
  },
  input: {
    fontSize: 16,
  },
});
