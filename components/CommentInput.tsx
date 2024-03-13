import React, {useState} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import CommentModal from './CommentModal';

export interface CommentInputProps {
  articleId: number;
}

function CommentInput({}: CommentInputProps) {
  const [writingComment, setWritingComment] = useState(false);

  const onPress = () => {
    setWritingComment(true);
  };

  const onClose = () => {
    setWritingComment(false);
  };

  const onSubmit = (message: string) => {
    setWritingComment(false);
    // TODO: 구현 예정
    console.log(message);
  };

  return (
    <>
      <Pressable style={styles.block} onPress={onPress}>
        <Text style={styles.text}>댓글을 입력하세요</Text>
      </Pressable>
      <CommentModal
        onClose={onClose}
        visible={writingComment}
        onSubmit={onSubmit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    color: '#898989',
  },
});

export default CommentInput;
