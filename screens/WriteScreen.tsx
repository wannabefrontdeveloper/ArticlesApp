import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackNavigationProp, RootStackParamList} from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InfiniteData, useMutation, useQueryClient} from 'react-query';
import {modifyArticle, writeArticle} from '../api/articles';
import {Article} from '../api/types';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'Write'>;

function WriteScreen() {
  const {params} = useRoute<WriteScreenRouteProp>();
  const queryClient = useQueryClient(); // queryClient 선언

  // params.id 가 존재한다면 queryClient를 통해 캐시 조회
  const cachedArticle = useMemo(
    () =>
      params.articleId
        ? queryClient.getQueryData<Article>(['article', params.articleId])
        : null,
    [queryClient, params.articleId],
  );

  const {top} = useSafeAreaInsets();
  const [title, setTitle] = useState(cachedArticle?.title ?? '');
  const [body, setBody] = useState(cachedArticle?.body ?? '');

  const {mutate: write} = useMutation(writeArticle, {
    onSuccess: article => {
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[article]],
          };
        }
        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[article, ...firstPage], ...rest],
        };
      });
      navigation.goBack();
    },
  });

  const {mutate: modify} = useMutation(modifyArticle, {
    onSuccess: article => {
      // 게시글 목록 수정
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        // data의 타입이 undefined가 아님을 명시하기 위하여 추가한 코드
        // modify의 경우엔 data가 무조건 유효하기 때문에 실제로 실행될 일 없음
        if (!data) {
          return {pageParams: [], pages: []};
        }

        return {
          pageParams: data!.pageParams,
          pages: data!.pages.map(page =>
            page.find(a => a.id === params.articleId) // 우리가 수정할 항목이 있는 페이지를 찾고
              ? page.map(a => (a.id === params.articleId ? article : a)) // 해당 페이지에서 id가 일치하는 항목을 교체
              : page,
          ),
        };
      });
      // 게시글 수정
      queryClient.setQueryData(['article', params.articleId], article);
      navigation.goBack();
    },
  });

  const navigation = useNavigation<RootStackNavigationProp>();

  const onSubmit = useCallback(() => {
    if (params.articleId) {
      modify({id: params.articleId, title, body});
    } else {
      write({title, body});
    }
  }, [write, modify, title, body, params.articleId]);

  useEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: styles.headerRightContainer,
      headerRight: () => (
        <Pressable
          hitSlop={8}
          onPress={onSubmit}
          style={({pressed}) => pressed && styles.headerRightPressed}>
          <MaterialIcons name="send" color="#2196f3" size={24} />
        </Pressable>
      ),
    });
  }, [onSubmit, navigation]);

  return (
    <SafeAreaView style={styles.block} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.KeyboardAvoiding}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={Platform.select({ios: top + 60})}>
        <TextInput
          placeholder="제목"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="내용"
          style={[styles.input, styles.body]}
          multiline
          textAlignVertical="top"
          value={body}
          onChangeText={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  KeyboardAvoiding: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  body: {
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
    flex: 1,
  },
  headerRightContainer: {
    marginRight: 16,
  },
  headerRightPressed: {
    opacity: 0.75,
  },
});

export default WriteScreen;
