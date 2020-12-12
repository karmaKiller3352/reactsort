import * as R from 'ramda';
import React, { useState, useEffect, useRef, memo } from 'react';
import { GlobalWrapper, GlobalStyle, Rectangle, CollectionWrapper } from './ui';

const markReplaced = (arr, i) => arr.map((item, index) => ({ ...item, color: (index === i) || (index === i + 1) ? 'blue' : 'black' }));

const markSorted = (arr, i) => arr.map((item, index) => index >= i ? { ...item, color: 'red' } : item);

const markAllSorted = (arr) => arr.map((incArr, index) => {
  if (index === R.length(arr) - 1) {
    incArr[0].color = 'red'
    incArr[1].color = 'red'
  }
  return incArr
})

const generateCollectionSortPath = (arr) => {
  const proccesArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {

      if (arr[j].number > arr[j + 1].number) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
      const colorReplaced = markReplaced(arr, j)
      const colorSorted = markSorted(colorReplaced, R.length(colorReplaced) - i)
      proccesArr.push(colorSorted);
    }
  }
  return proccesArr;
};

const generateRandomNumber = (max = 100, min = 10) => Math.floor(Math.random() * (max - min)) + min;

const generateCollection = (collectionLength, maxNumber) => {
  const collection = []
  for (let i = 0; i < collectionLength; i++) {
    collection.push({
      number: generateRandomNumber(maxNumber),
      color: false,
    })
  }
  return collection;
}

function CollectionView({ collection }) {
  return R.length(collection) && collection.map((item, i) => (
    <Rectangle key={i} height={item.number} color={item.color} />
  ))
}

const preparedCollection = (length, max) => {
  const collection = generateCollection(length, max)
  const generatedPath = generateCollectionSortPath(collection)
  const marked = markAllSorted(generatedPath)
  return marked
}

const length = 150;
const maxHeight = 250;
const initSpeed = 10



function App() {
  const interval = useRef(null)
  const stopCounter = () => clearInterval(interval.current)
  const [index, setIndex] = useState(0)
  const [prepared, setPrepare] = useState(() => preparedCollection(length, maxHeight));
  const [isSorting, setSorting] = useState(false);
  const [on, setOn] = useState('off');


  useEffect(() => {
    if (index >= R.length(prepared) - 1) {
      stopCounter()
      setOn(false)
      setSorting(false)
    }
  }, [index, prepared])

  useEffect(() => {
    switch (on) {
      case 'play': {
        setSorting(true)
        interval.current = setInterval(() => {
          setIndex(prevState => prevState + 1)
        }, initSpeed);
        break;
      }
      case 'pause': {
        stopCounter();
        break;
      }
    }
  }, [on])



  const clickHandler = () => {
    if (isSorting) return setOn((prev) => prev === 'play' ? setOn('pause') : setOn('play'))

    if (!index) return setOn('play')
    setPrepare(preparedCollection(length, maxHeight))
    setIndex(0)
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <GlobalWrapper>
        <CollectionWrapper onClick={clickHandler}>
          <CollectionView collection={prepared[index]} />
        </CollectionWrapper>
      </GlobalWrapper>

    </React.Fragment>
  );
}

export default memo(App);
