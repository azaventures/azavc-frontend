// This file is a fallback for using MaterialIcons on Android and web.

import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { SymbolWeight } from 'expo-symbols';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING: Record<string, React.ComponentProps<typeof MaterialIcons>['name']> = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'house': 'home',
  'paperplane.fill': 'send',
  'paperplane': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'briefcase.fill': 'work',
  'briefcase': 'work',
  'creditcard.fill': 'credit-card',
  'creditcard': 'credit-card',
  'clock.fill': 'access-time',
  'clock': 'access-time',
  'line.3.horizontal': 'menu',
  'bell.fill': 'notifications',
  'slider.horizontal.3': 'tune',
  'magnifyingglass': 'search',
  'plus': 'add',
  'person.fill': 'person',
  'gear': 'settings',
  'questionmark.circle': 'help',
  'rectangle.portrait.and.arrow.right': 'logout',
  'arrow.down': 'arrow-downward',
  'arrow.up': 'arrow-upward',
  'arrow.right': 'arrow-forward',
  'dollarsign': 'attach-money',
  'chart.line.uptrend.xyaxis': 'trending-up',
  'mappin': 'place',
  'chevron.down': 'keyboard-arrow-down',
  'chart.pie.fill': 'pie-chart',
  'chart.pie': 'pie-chart-outline',
  'hourglass': 'hourglass-empty',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle.fill': 'cancel',
  'arrow.clockwise': 'refresh',
  'arrow.triangle.2.circlepath': 'sync',
  'exclamationmark.triangle.fill': 'warning',
};

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  // Fallback to a default icon if the requested icon is not found
  const iconName = MAPPING[name] || 'help-outline';
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
