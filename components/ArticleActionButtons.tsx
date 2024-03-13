import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {RootStackNavigationProp} from '../screens/types';

export interface ArticleActionButtonsProps {
  articleId: number;
}

function ArticleActionButtons({articleId}: ArticleActionButtonsProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPressModify = () => {
    navigation.navigate('Write', {articleId});
  };
  const onPressRemove = () => {
    // TODO: 구현 예정
  };
  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => pressed && styles.pressed}
        onPress={onPressModify}>
        <text style={styles.buttonText}>수정</text>
      </Pressable>
      <View style={styles.separator} />
      <Pressable
        onPress={onPressRemove}
        style={({pressed}) => pressed && styles.pressed}>
        <Text style={styles.buttonText}>삭제</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: -16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  separator: {
    width: 8,
  },
  buttonText: {
    color: '#2196f3',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ArticleActionButtons;
