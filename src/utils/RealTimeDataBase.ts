import database from '@react-native-firebase/database';

export const saveNewRestaurant = async (params: {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}) => {
  const db = database().ref('/Foodfast');
  const saveItem = {
    title: params.title,
    address: params.address,
    latitude: params.latitude,
    longitude: params.longitude,
  };

  await db.push().set({
    ...saveItem,
  });
};

export const getRestaurantList = async (): Promise<
  {title: string; address: string; latitude: number; longitude: number}[]
> => {
  const db = database().ref('/Foodfast');

  return (await db
    .once('value')
    .then(snapshot => snapshot.val())
    .then(result => Object.keys(result).map(key => result[key]))) as {
    title: string;
    address: string;
    latitude: number;
    longitude: number;
  }[];
  //   return restrauntList.map(item => ({
  //     title: item.title,
  //     address: item.address,
  //     latitude: item.latitude,
  //     longitude: item.longitude,
  //   }));
};
