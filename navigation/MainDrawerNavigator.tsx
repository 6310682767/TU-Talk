import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabs from './HomeTabs';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        headerShown: false, 
        drawerStyle: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
    }}
    >
      <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  );
}
