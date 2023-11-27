import { View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import {db} from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { Listing } from '@/models/types';

const Page = () => {
  const [items, setItems] = useState<any[]>([]);
  const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>('Tiny homes');

  const getData = async () => {
    await getDocs(collection(db, "listings"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));

        setItems([...newData]);
    })
  }
  useEffect(() => {
    getData();
  }, [])

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      {/* Define pour custom header */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsMap listings={getoItems} />
      <ListingsBottomSheet listings={items} category={category} linkTo='/listing/' />
    </View>
  );
};

export default Page;
