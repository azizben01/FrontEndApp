import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type transaction = {
  amount: number
  currency: string
}
function TransactionListScreen() {
  const [transaction, setTransaction] = useState<transaction[]>([]);


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView>
        <View style={styles.content}>
          {
            transaction.length ?
              <FlatList
                data={transaction}
                renderItem={({ item }) =>
                  <View style={styles.item}>
                    <Text>{item.amount}</Text>
                    <Text>{item.currency}</Text>
                  </View>}
              />
              : null
          }
        </View>


        <View style={styles.content}>
          <Text>Welcome to your Transactions!</Text>
          <TouchableOpacity style={styles.ButtonStyle} onPress={() => { }}>
            <Text>Press to view your transactions</Text>
          </TouchableOpacity>
        </View>



      </SafeAreaView>
    </KeyboardAvoidingView>

  )
}
export default TransactionListScreen;
const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },


  ButtonStyle: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B0C4DE",
  }
})