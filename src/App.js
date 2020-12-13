import * as R from 'ramda';
import React, { useState, useEffect, useRef, memo } from 'react';
import { GlobalWrapper, GlobalStyle, Rectangle, CollectionWrapper, Button, Flex } from './ui';
import { colorsMap } from "./theme"

const markReplaced = (arr, i) => arr.map((item, index) => ({ ...item, color: (index === i) || (index === i + 1) ? colorsMap.blue : colorsMap.green }));

const markSorted = (arr, i) => arr.map((item, index) => index >= i ? { ...item, color: colorsMap.red } : item);

const markAllSorted = (arr) => arr.map((incArr, index) => {
  if (index === R.length(arr) - 1) {
    incArr[0].color = colorsMap.red
    incArr[1].color = colorsMap.red
  }
  return incArr
})

const generateCollectionSortPath = (collection) => {
  const arr = [...collection]
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
  proccesArr.unshift(markReplaced(collection))
  return proccesArr;
};

const generateRandomNumber = (max = 100, min = 10) => Math.floor(Math.random() * (max - min)) + min;

const generateCollection = (collectionLength, maxNumber) => {
  const collection = []
  for (let i = 0; i < collectionLength; i++) {
    collection.push({
      number: generateRandomNumber(maxNumber),
      color: colorsMap.green,
    })
  }
  return collection;
}

function CollectionView({ collection }) {
  return R.length(collection) && collection.map((item, i) => (
    <Rectangle key={i} style={{
      height: item.number,
      backgroundColor: item.color
    }} />
  ))
}

const preparedCollection = (length, max) => {
  const collection = generateCollection(length, max)
  const generatedPath = generateCollectionSortPath(collection)
  const marked = markAllSorted(generatedPath)
  return marked
}

const length = 30;
const maxHeight = 250;
const initSpeed = 30



function App() {
  const interval = useRef(null)
  const stopCounter = () => clearInterval(interval.current)
  const [index, setIndex] = useState(0)
  const [prepared, setPrepare] = useState(() => preparedCollection(length, maxHeight));
  const [on, setOn] = useState('off');



  useEffect(() => {
    if (index >= R.length(prepared) - 1) {
      stopCounter()
      setOn('sorted')
    }
  }, [index, prepared])

  useEffect(() => {
    switch (on) {
      case 'play': {
        interval.current = setInterval(() => {
          setIndex(prevState => prevState + 1)
        }, initSpeed);
        break;
      }
      default: {
        stopCounter();
        break;
      }
    }
  }, [on])



  const generateHandler = () => {
    if (isDisabledAction('sorted', 'off')) {
      setPrepare(preparedCollection(length, maxHeight))
      setIndex(0)
      setOn('off')
    }
  }

  const pauseHandler = () => {
    if (isDisabledAction('play')) setOn('pause')
  }

  const sortHandler = () => {
    if (isDisabledAction('pause', 'off')) setOn('play')
  }

  const resetHandler = () => {
    if (isDisabledAction('off')) return
    setPrepare(preparedCollection(length, maxHeight))
    setIndex(0)
    setOn('off')
  }

  const isDisabledAction = (...arg) => {
    return arg.includes(on)
  }

  const defineColor = () => {
    switch (on) {
      case 'play': return 'red';
      case 'sorted': return 'red';
      case 'pause': return 'blue';
      default: return 'green'
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <GlobalWrapper>
        <Button green disabled={isDisabledAction('play', 'pause')} onClick={generateHandler}>Generate new collection</Button>
        <Flex>
          <Button red disabled={isDisabledAction('play', 'sorted')} onClick={sortHandler}>Play</Button>
          <Button disabled={isDisabledAction('off', 'pause', 'sorted')} onClick={pauseHandler}>Pause</Button>
          <Button yellow disabled={isDisabledAction('off', 'sorted')} onClick={resetHandler}>Reset</Button>
        </Flex>
        <CollectionWrapper color={defineColor()}>
          <CollectionView collection={prepared[index]} />
        </CollectionWrapper>
      </GlobalWrapper>

    </React.Fragment>
  );
}

export default memo(App);
