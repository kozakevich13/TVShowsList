import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

export default function ShearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tvShows, setTvShows] = useState([]);
  const [emptyListLabel, setEmptyListLabel] = useState("Type the show's name");
  const navigation = useNavigation(); 

  const handleSearch = async (query) => {
    if (query.length < 3) {
      setTvShows([]);
      setEmptyListLabel("Type the show's name");
      return;
    }
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = response.data;
      if (data.length === 0) {
        setEmptyListLabel('Sorry, nothing found with this search');
      } else {
        setEmptyListLabel('');
      }
      setTvShows(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
        containerStyle={styles.listItem}
        bottomDivider
        onPress={() =>
            navigation.navigate('Details', {
            id: item.show.id,
            name: item.show.name,
            })
        }
    >
      <Image
        style={styles.thumbnail}
        source={{ uri: item.show.image?.medium }}
        resizeMode="contain"
      />
      <ListItem.Content>
        <ListItem.Title style={styles.listItemTitle} >{item.show.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.listItemSubtitle} >{item.show.rating.average}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon name="chevron-right" />
    </ListItem>
  );
  

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type the show's name"
        onChangeText={(text) => {
          setSearchQuery(text);
          handleSearch(text);
        }}
        value={searchQuery}
        containerStyle={styles.searchBarStyle}
        inputContainerStyle={styles.searchInputStyle}
      />
      <FlatList
        data={tvShows}
        renderItem={renderItem}
        keyExtractor={(item) => item.show.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            {emptyListLabel === "Type the show's name" ? (
              <MaterialIcons name="tv" size={50} color="#bbbbbb" />
            ) : null}
            <ListItem.Title style={styles.emptyListText}>{emptyListLabel}</ListItem.Title>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f',
    color: '#bbbbbb'
  },
  listItem: {
    backgroundColor: '#0a192f',
  },
  listItemTitle: {
    color: '#bbbbbb',
  },
  listItemSubtitle: {
    color: '#70939e',
  },
  searchBarStyle: {
    backgroundColor: '#0a192f',
  },
  searchInputStyle: {
    color: '#bbbbbb',
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    color: '#bbbbbb'
  },
  emptyListText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#bbbbbb'
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
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
