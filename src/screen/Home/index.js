import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
//COMPONENT
import PokemonCard from '../../component/PokemonCard'
//CONTROLLER
import useController from './controller/index.controller'

const Home = ({ navigation }) => {
  const { list, isGettingMoreData } = useSelector((state) => state.pokemon.pokemons)
  const { isLoading, isCloseToBottom, onSearch, onNextPage } = useController()
  const [data, setData] = useState([])
  const [text, setText] = useState('')

  const headerInput = () => (
    <View style={{ padding: 10 }}>
      <TextInput
        label="Search Pokemon"
        mode="outlined"
        value={text}
        onChangeText={(text) => {
          setText(text)
          setData([...onSearch(text)])
        }}
      />
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data.length > 0 ? data : list}
        ListHeaderComponent={headerInput}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && isGettingMoreData) {
            onNextPage()
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
})

export default Home
