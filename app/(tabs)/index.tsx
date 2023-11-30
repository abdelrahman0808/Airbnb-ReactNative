import { View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import ListingsMap from '@/components/ListingsMap';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import {db} from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';


const Page = () => {
  const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('All');
  const getoItems = useMemo(() => listingsDataGeo, []);


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

  const onDataChanged = async (category: string) => {
    if (category=='All') {
      await getDocs(collection(db, "listings"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
  
          setItems([...newData]);
      })
  
      
    } else if(category=='Cabins') {
      await getDocs(collection(db, "Cabins"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
  
          setItems([...newData]);
      })
  
      
    }  else if(category=='City') {
    await getDocs(collection(db, "City"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));

        setItems([...newData]);
    })

    
  }   else if(category=='Tiny homes') {
  await getDocs(collection(db, "Tiny"))
  .then((querySnapshot)=>{               
      const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));

      setItems([...newData]);
  })

  
} 
    
    else {
      await getDocs(collection(db, "listings"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
  
          setItems([...newData]);
      })
  
      
    }
    setCategory(category);

  };



  return (
    <View style={{ flex: 1, marginTop: 80 }}>
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
