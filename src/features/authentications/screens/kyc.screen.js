if(refCode) {
    const refByRef= collection(db, "users");
      const refByDoc = query(refByRef, where("ref_code", "==", refCode));
  
      const refbySnapshot = await getDocs(refByDoc)
      
      if(refbySnapshot.doc.data().length>= 1) {
        const planRef = doc(db, "plans", refbySnapshot[0].plan_id);
        const planDoc = await getDoc(planRef)
        if(planDoc.exists()) {
            
            if(Number(planDoc.ref_bonus) !== 0) {
              const refByReff = doc(db, "users", refbySnapshot[0].id);
              await updateDoc(refByReff, {
                balance: increment(+planDoc.ref_bonus)
              });
  
             await addDoc(collection(db, "transactions"), {
                amount: planDoc.ref_bonus,
                status: "Completed",
               made_by: refbySnapshot[0].id,
               type: 'Money In',
              title: "Refferal Commission",
              method: 'ref_commission',
              date: serverTimestamp()
              });
  
              const userRe = doc(db, "users", res.user.uid);
              await updateDoc(userRe, {
                ref_by: refbySnapshot[0].id
              });
  
              
    const docRef = doc(db, "users", res.user.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
     console.log("Document data:", docSnap.data());
     const jsonValue = JSON.stringify(docSnap.data())
     await AsyncStorage.setItem('@user', jsonValue)
     dispatch({ type: 'LOGIN', payload: docSnap.data()})
     setLoading(false)
   } else {
     console.log("Aj i am having trouble getting this user document!");
     setLoading(false)
   }
   console.log(res.user)
   console.log(docSnap.data())
            }
        } else {
          Alert.alert(
            "Error",
            "This user doesnt have any plan",
            [
              { text: "Okay", onPress: () => console.log("OK Pressed") }
            ],
            {
             cancelable: true,
           }
          );
        }
      } else {
        Alert.alert(
          "Error",
          "Invalid refferal code",
          [
            { text: "Okay", onPress: () => console.log("OK Pressed") }
          ],
          {
           cancelable: true,
         }
        );      
      }
  }else {
  
    const docRef = doc(db, "users", res.user.uid);
     const docSnap = await getDoc(docRef);
  
     if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const jsonValue = JSON.stringify(docSnap.data())
      await AsyncStorage.setItem('@user', jsonValue)
      dispatch({ type: 'LOGIN', payload: docSnap.data()})
      setLoading(false)
    } else {
      console.log("Aj i am having trouble getting this user document!");
      setLoading(false)
    }
    console.log(res.user)
    console.log(docSnap.data())
  }