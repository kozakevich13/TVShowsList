import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import axios from 'axios';


export default function DetailsScreen({ route }) {
  const { id, name } = route.params;
  const [show, setShow] = useState(null);


  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        const data = response.data;
        setShow(data);
      } catch (error) {
        console.error(error);
      }
    };


    fetchShowDetails();
  }, [id]);


  const openShowLink = () => {
    if (show?.officialSite) {
      Linking.openURL(show.officialSite);
    }
  };


  if (!show) {
    return null;
  }


  const { image, genres, rating, status, schedule, summary } = show;


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: image?.original }} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.genres}>{genres.join(', ')}</Text>
        <Text style={styles.rating}>Rating: {rating.average}</Text>
        {show.officialSite && (
          <Button
            title="Official Site"
            onPress={openShowLink}
            containerStyle={styles.linkButtonContainer}
          />
        )}
        <Text style={styles.status}>Status: {status}</Text>
        <Text style={styles.schedule}>
          Schedule: {schedule.days.join(', ')} at {schedule.time}
        </Text>
        <Text style={styles.summary}>{summary.replace(/<[^>]+>/g, '')}</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0a192f',
    alignItems: 'center',
    paddingTop: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#bbbbbb'
  },
  genres: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    color:'#bbbbbb'
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    color:'#bbbbbb'
  },
  linkButtonContainer: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    color:'#bbbbbb'
  },
  schedule: {
    fontSize: 16,
    marginBottom: 10,
    color:'#bbbbbb'
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color:'#bbbbbb'
  },
});
