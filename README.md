
# 맛집 공유 앱
## 네비게이션 설치
### 네이게이션 설치
 - npm install --save @react-navigation/native @react-navigation/native-stack
 - npm install --save react-native-screens
 - npm install react-native-safe-area-context
### icons 설치
 - npm install --save @types/react-native-vector-icons
 
## react-native-maps를 추가하여 지도 띄우기
 - npm install --save react-native-maps
 ```
 <MapView
  latitude:
  longitude:
  latitudeDelta:
  longitudeDelta:
 />
 ```
## GeoLocation을 통하여 현재 내 위치 가져오기
 - npm install @react-native-community/geolocation --save
 ```
  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.560214,
    longitude: 126.9775521,
  });

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <HeaderTitle title="MAIN" />
      </Header>

      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <Marker
        coordinate={{
          longitude: currentRegion.longitude,
          latitude: currentRegion.latitude,
        }}></Marker>
 ```

## 맛집을 추가하는 로직, 화면 만들기
### ios
 - npm install --save @react-native-firebase/app
  - google service info.plist를 다운 후
  ![](https://velog.velcdn.com/images/qkrtjrwls_/post/e89e9500-c5b9-4ebd-97a1-999c2bcd729e/image.png)
![](https://velog.velcdn.com/images/qkrtjrwls_/post/9af860dd-08b8-45e5-b60c-330e121a9a03/image.png)
- 해당 google.plist를 add 해준다.
![](https://velog.velcdn.com/images/qkrtjrwls_/post/4047c043-dc05-4d7a-9274-60b68d947789/image.png)
- import 추가 해주기
![](https://velog.velcdn.com/images/qkrtjrwls_/post/7bdb47fb-4d87-4a27-b807-fa7be181fee9/image.png)
- configure 추가
![](https://velog.velcdn.com/images/qkrtjrwls_/post/e9625b78-b4ba-4cd7-a3f2-926fb752e006/image.png)
- Podfile에 use frameworks 부분을 넣어준다.
![](https://velog.velcdn.com/images/qkrtjrwls_/post/11e883f3-f980-4e46-8938-23dc05578767/image.png)
- filpper 부분 주석처리 
- 그런다음 ios에서 bundle exec pod install 
![](https://velog.velcdn.com/images/qkrtjrwls_/post/4253559d-f8b8-43da-907a-a14841c3f677/image.png)
- $RNFirebaseAsStaticFramework = true
- 이제 근본적드로 사용할 realtime database 사용처리 해주기
![](https://velog.velcdn.com/images/qkrtjrwls_/post/c3878380-2408-4657-9e92-a99817d79b29/image.png)
![](https://velog.velcdn.com/images/qkrtjrwls_/post/b0d41474-9139-46de-8b0e-67076f7dfdcb/image.png)
![](https://velog.velcdn.com/images/qkrtjrwls_/post/48860223-cd94-4957-8bd0-a31786d150da/image.png)
- 정상적으로 뜸 
- 이제 realtime database 를 설치해줘야 한다.
- npm install --save @react-native-firebase/database
- pod install 후 npm run ios
### database 에 저장하기
```
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

```
### data 가져오기
```
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
};
```

![](https://velog.velcdn.com/images/qkrtjrwls_/post/87e2415f-f39d-4648-95f7-9de562ccd7a2/image.png)
### 저장한 맵 보여주기
```
{isMapReady &&
          markerList.map(item => {
            return (
              <Marker
                title={item.title}
                description={item.address}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                pinColor="blue"
              />
            );
```


 
## 카카오 메시지 공유 기능
 - npm install react-native-kakao-share-link --save
```
import KakaoShareLink from 'react-native-kakao-share-link';

const onPressKakaoShare = useCallback(() => {
    KakaoShareLink.sendLocation({
      address: routes.params.address,
      addressTitle: routes.params.name,
      content: {
        title: routes.params.name,
        imageUrl:
   'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com/',
        },
        description: '이곳은 어떤가요?',
      },
    });
  }, [routes.params.address, routes.params.name]);
```
 
 
## 저장된 맛집을 친구에게 공유 할 수 있는 기능(wirh firebase dynamic links)
 - npm install @react-native-firebase/dynamic-links
 ![](https://velog.velcdn.com/images/qkrtjrwls_/post/d428c8b6-b14e-49d2-8aaa-4d8ead08d23e/image.png)
![](https://velog.velcdn.com/images/qkrtjrwls_/post/3df1f4b9-9de0-480c-bb9b-08bdaa77a36f/image.png)
 - associated 추가
![](https://velog.velcdn.com/images/qkrtjrwls_/post/a48c1664-8b51-4385-a2a8-bae28d2e7195/image.png)
 - 도메인 추가하기 
 ![](https://velog.velcdn.com/images/qkrtjrwls_/post/7a4eb86c-3665-4104-9f01-e6877dc4de22/image.png)
 ```
 const onPressShare = useCallback(async () => {
    const link = await dynamicLinks().buildShortLink({
      link: 'https://testurl.test/',
      domainUriPrefix: 'https://foodfast1.page.link/c2Sd',
    });
    console.log(link);
  }, []);
 ```
- npm i react-native-share --save

```
import Share from 'react-native-share';
const onPressShare = useCallback(async () => {
    const link = await dynamicLinks().buildShortLink({
      link: 'https://testurl.test/',
      domainUriPrefix: 'https://foodfast1.page.link/c2Sd',
    });
    Share.open({
      url: link,
    });
  }, []);
```
