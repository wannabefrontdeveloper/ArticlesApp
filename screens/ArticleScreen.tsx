import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';
import {getArticle} from '../api/articles';
import {getComments} from '../api/comments';
import {RootStackParamList} from './types';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  // 둘 중 하나라도 준비되지 않은 데이터가 있으면 스피너 보여주기
  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  return (
    <View>
      <Text>{articleQuery.data.title}</Text>
      <Text>{articleQuery.data.body}</Text>
      <Text>{commentsQuery.data.length}개의 댓글</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default ArticleScreen;
