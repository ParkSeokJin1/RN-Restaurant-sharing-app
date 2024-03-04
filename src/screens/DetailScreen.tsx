import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {HeaderTitle} from '../components/Header/HeaderTitle';
import {HeaderIcon} from '../components/Header/HeaderIcon';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import {useRootNavigation, useRootRoute} from '../navigation/RootNavigation';
import MapView, {Marker} from 'react-native-maps';
import {Button} from '../components/Button';
import KakaoShareLink from 'react-native-kakao-share-link';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';
export const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation<'Detail'>();
  const routes = useRootRoute<'Detail'>();

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

  const onPressShare = useCallback(async () => {
    const link = await dynamicLinks().buildShortLink({
      link: 'https://testurl.test/',
      domainUriPrefix: 'https://foodfast1.page.link',
    });
    Share.open({
      url: link,
    });
  }, []);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <HeaderTitle title="Detail" />
        <HeaderIcon iconName="close" onPress={onPressBack} />
      </Header>
      <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
        <Typography fontSize={16}>가게명</Typography>
        <Spacer space={8} />
        <Typography fontSize={20}>{routes.params.name}</Typography>
        <Spacer space={24} />

        <Typography fontSize={16}>주소</Typography>
        <Spacer space={8} />
        <Typography fontSize={20}>{routes.params.address}</Typography>
        <Spacer space={8} />
        <Typography fontSize={16}>위치</Typography>
        <Spacer space={8} />
        <MapView
          style={{height: 200}}
          region={{
            latitude: routes.params.latitude,
            longitude: routes.params.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.003,
          }}>
          <Marker
            coordinate={{
              latitude: routes.params.latitude,
              longitude: routes.params.longitude,
            }}
          />
        </MapView>
        <Spacer space={48} />
        <Button onPress={onPressKakaoShare}>
          <View
            style={{
              backgroundColor: 'yellow',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="black">
              카카오 공유하기
            </Typography>
          </View>
        </Button>
        <Spacer space={12} />
        <Button onPress={onPressShare}>
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="white">
              공유하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};
