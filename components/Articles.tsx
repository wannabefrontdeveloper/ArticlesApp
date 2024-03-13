import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Article} from '../api/types';
import ArticleItem from './ArticleItem';
import WriteButton from './WriteButton';

export interface ArticlesProps {
  articles: Article[];
  showWriteButton?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage(): void;
  refresh(): void;
  isRefreshing: boolean;
}

function Articles({
  articles,
  showWriteButton,
  isFetchingNextPage,
  fetchNextPage,
  refresh,
  isRefreshing,
}: ArticlesProps) {
  const renderWriteButton = () => {
    return showWriteButton ? <WriteButton /> : null;
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <FlatList
      data={articles}
      renderItem={({item}) => (
        <ArticleItem
          id={item.id}
          title={item.title}
          publishedAt={item.published_at}
          username={item.user.username}
          refreshControl={
            <RefreshControl onRefresh={refresh} refreshing={isRefreshing} />
          }
        />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderWriteButton}
      ListFooterComponent={() => (
        <>
          {articles.length > 0 ? <View style={styles.separator} /> : null}
          {isFetchingNextPage && (
            <ActivityIndicator
              size="small"
              color="black"
              style={styles.spinner}
            />
          )}
        </>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={fetchNextPage}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#cfd8dc',
  },
  spinner: {
    backgroundColor: 'white',
    paddingTop: 32,
    paddingBottom: 32,
  },
});

export default Articles;
