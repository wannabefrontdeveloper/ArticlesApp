import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {Article} from '../api/types';
import {getArticles} from '../api/articles';
import Articles from '../components/Articles';
import {useUserState} from '../contexts/UserContext';

function ArticlesScreen() {
  const {data} = useInfiniteQuery(
    'articles',
    ({pageParam}) => getArticles({cursor: pageParam}),
    {
      getNextPageParam: lastPage =>
        lastPage.length === 10 ? lastPage[lastPage.length - 1].id : undefined,
    },
  );

  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    return ([] as Article[]).concat(...data.pages);
  }, [data]);
  const [user] = useUserState();

  if (!items) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  return <Articles articles={items} showWriteButton={!!user} />;
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default ArticlesScreen;
