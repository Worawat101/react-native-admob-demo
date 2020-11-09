import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import * as themeActions from "../redux/actions/theme.action";
import { useDispatch, useSelector } from "react-redux";
import { List, Switch, Card, Title } from "react-native-paper";
import {
  AdMobBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import * as admobActions from "../redux/actions/admob.action";
export default ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  const admobReducer = useSelector(({ admobReducer }) => admobReducer);
  React.useEffect(() => {
    initAdmob();
    console.log(admobReducer.ad_status);
    return()=>{
      AdMobRewarded.removeAllListeners();
    }
  }, []);
  const initAdmob = async () => {
    await setTestDeviceIDAsync("EMULATOR");
  };
  const initRewardAds = async () => {
    // Display a rewarded ad
    await AdMobRewarded.setAdUnitID("ca-app-pub-2547344479047582/6388494355"); // Test ID, Replace with your-admob-unit-id
    await AdMobRewarded.requestAdAsync();
    
    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
      console.log("rewardedVideoDidRewardUser");
      dispatch(admobActions.ToggleAds(false));
    });
    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () =>
      console.log("rewardedVideoDidLoad")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
      console.log("rewardedVideoDidFailToLoad")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidOpen", () =>
      console.log("rewardedVideoDidOpen")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidClose", () => {
      setModalVisible(false);
    });
    await AdMobRewarded.showAdAsync();
  };
  return (
    <View style={{ flex: 1 }}>
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
            adUnitID="ca-app-pub-2547344479047582/1964568575" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={(e) => console.log(e)}
          />
        </Card>
      )}
      <List.Item
        title="Dark Mode"
        left={() => <List.Icon icon="brightness-4" />}
        right={() => (
          <Switch
            value={themeReducer.theme}
            onValueChange={(val) => dispatch(themeActions.ToggleTheme(val))}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <List.Item
          title="Remove Ads"
          left={() => <List.Icon icon="bullhorn" />}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title style={styles.modalText}>
              Watch Video Ads for remove all ads
            </Title>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                initRewardAds();
              }}
            >
              <Text style={styles.textStyle}>Watch Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#F16334" }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Nope</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    marginTop:10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
