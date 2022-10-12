import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import TopBar from './CompanyScreen/topbar';
import Routes from './InitialPages/bottomTab';

export default function CustomerScreens({ navigation }) {
  return (
    <Routes />
  );
}