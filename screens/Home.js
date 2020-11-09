import React from "react";
import { View, Text } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Headline,
} from "react-native-paper";
import {
  AdMobBanner,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { useSelector } from "react-redux";
const Home = () => {
  const admobReducer = useSelector(({ admobReducer }) => admobReducer);
  React.useEffect(() => {
    initAdmob();
  }, []);
  const initAdmob = async () => {
    await setTestDeviceIDAsync("EMULATOR");
  };
  return (
    <View>
      <Headline style={{ marginLeft: 23 }}>Lastest Post</Headline>
      {admobReducer.ad_status && (
        <Card
          style={{
            shadowOffset: { width: 5, height: 5 },
            width: "90%",
            borderRadius: 5,
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <AdMobBanner
            bannerSize="smartBanner"
            adUnitID="ca-app-pub-2547344479047582/6124133064" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={(e) => console.log(e)}
          />
        </Card>
      )}
      <Card
        style={{
          shadowOffset: { width: 5, height: 5 },
          width: "90%",
          borderRadius: 12,
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <Card.Content>
          <Title>Blog post</Title>
          <Card.Cover
            style={{
              width: "100%",
              height: 190,
              alignSelf: "center",
            }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1573921470445-8d99c48c879f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            }}
          />
          <Paragraph>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. i
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
export default Home;
