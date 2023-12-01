import { Button, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import {db} from '../../firebaseConfig';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Trips from '@/components/trips';

const Page = () => {

  const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('Tiny homes');
  const [isLoading, setIsLoading] = useState(false);
  


  const getData = async () => {
    setItems([]);
    setIsLoading(true)
    await getDocs(collection(db, "reservations"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map(async (document) => {
              const docRef = doc(db, "listings", `${document.data().listingId}`);
              const docSnap = await getDoc(docRef);
              const toSet = {
                ...document.data(),
                ...docSnap.data()
              }
              
              setItems((prev) => [...prev, {...toSet, id: document.id }])
            });
            
    })
    setIsLoading(false)
  }
  useEffect(() => {
    getData();
  }, [])

  if(isLoading) {
    return
  }

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <Trips listings={items} category={category} linkTo='/reservation/' />
    </View>
  );
};

export default Page;