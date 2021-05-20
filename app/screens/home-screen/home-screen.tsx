import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, TouchableOpacity, ActivityIndicator } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models/root-store"

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
  paddingHorizontal: 0,
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
const NAME: TextStyle = {
  ...TEXT,
  fontSize: 16,
  marginHorizontal: spacing[3],
  lineHeight: 24
}
const PROFIL: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 40/2
}
const WRAPIMG: ViewStyle = {
    width: 44,
    height: 44,
    borderRadius: 44/2,
    borderWidth: 1, 
    borderColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center'
}
const BG: ViewStyle = {
  marginBottom: spacing[2],
  flexDirection: 'row',
  alignItems: 'center',
  padding: spacing[3],
  borderBottomWidth: 1,
  borderColor: color.palette.lighterGrey
}
const LIST: ViewStyle = {
   marginVertical: spacing[3]
}
const LOADING: ViewStyle = {
   paddingTop: 20
}

export interface HomeScreenProps extends NavigationInjectedProps<{}> {}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = (observer((props) => {
  const [load, setLoad] = React.useState(false)
  const rootStore = useStores()

  React.useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    setLoad(true)
    rootStore.getUsers().then(() => {
      setLoad(false)
    }).catch(() => {
      setLoad(false)
    })
  }

  const detailScreen = (item) => {
    rootStore.setUser(item)
    props.navigation.navigate("detail")
  }

  return (
    <View testID="HomeScreen" style={FULL}>
      <Wallpaper />
      <Header headerTx="homeScreen.listUser" style={HEADER} titleStyle={HEADER_TITLE} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={'#f0f0f0'}>
        {load ? 
          <View style={LOADING}>
            <ActivityIndicator size={'large'}  />
          </View> :  
          <View style={LIST}>
              {rootStore.users.map((item, key) =>  
              <TouchableOpacity key={key} style={BG} onPress={() => detailScreen(item)}>
                  <View style={WRAPIMG}>
                      <Image source={{uri: item?.avatar}} style={PROFIL} />
                  </View>
                  <View style={{flex:1}}>
                      <Text text={item?.name} style={NAME} />
                  </View>
              </TouchableOpacity>)}
          </View>
        }
      </Screen>
    </View>
  )
}))
