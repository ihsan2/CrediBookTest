import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models/root-store"
import Share from 'react-native-share'
import ViewShot from "react-native-view-shot";

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.storybookTextColor,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[4],
  paddingHorizontal: 20,
  backgroundColor: color.text
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: color.storybookTextColor
}
const DESC: TextStyle = {
  ...TEXT,
  fontSize: 16,
  marginBottom: spacing[2],
  lineHeight: 24,
  color: color.storybookDarkBg
}
const AVATARWRAP: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: color.dim,
  alignSelf: 'center',
  marginBottom: spacing[4]
}
const AVATAR: ImageStyle = {
  width: 80,
  height: 80,
  borderRadius: 10
}
const CARD: ViewStyle = {
    marginTop: 40,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: color.primary,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    backgroundColor: '#fff'
}
const BTN: ViewStyle = {
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    marginTop: spacing[3],
    borderRadius: 5
}
const BTNTEXT: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 16,
    color: color.palette.white,
  }

export interface DetailScreenProps extends NavigationInjectedProps<{}> {}

export const DetailScreen: React.FunctionComponent<DetailScreenProps> = (props) => {
  const rootStore = useStores()
  const {user} = rootStore
  const [img, setImg] = React.useState(null)
  const viewShotRef = React.useRef(null)

  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const shareItem = () => {
    const shareOptions = {
        title: 'Bagikan Melalui',
        message: `User Detail *${user?.name}*`,
        social: Share.Social.WHATSAPP,
        url: img
      };
    
      Share.shareSingle(shareOptions)
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
  }

  const getViewShot = () => {
    viewShotRef?.current?.capture().then(uri => {
       setImg(uri)
    });
  }

  React.useEffect(() => {
    getViewShot()
  }, [])

  return (
    <View testID="HomeScreen" style={FULL}>
      <Wallpaper />
      <Header
          headerText={user?.name}
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
       />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={'#f0f0f0'}>
            <ViewShot style={CARD} ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
              <View style={AVATARWRAP}>
                <Image style={AVATAR} source={{uri: user?.avatar}} />  
              </View>
              <Text style={DESC} text={`Name: ${user?.name}`} />
              <Text style={DESC} text={`Email: ${user?.email}`} />
              <Text style={DESC} text={`Gender: ${user?.gender}`} />
              <Text style={DESC} text={`Country: ${user?.country}`} />
            </ViewShot>
          <TouchableOpacity style={BTN} onPress={shareItem}>
               <Text style={BTNTEXT} text={`Share Via WhatsApp`} />
          </TouchableOpacity>
      </Screen>
    </View>
  )
}
