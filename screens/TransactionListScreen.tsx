import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  useNavigation,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Assuming you have these types defined already:

type AdminTransaction = {
  type: string;
  adminname: string;
  adminphone: string;
  username: string;
  amount: number;
  currency: string;
  adminTransactionid: number;
  created: string;
  employeephone: string;
  transactiontype: string;
};

type Transaction = {
  type: string;
  username: string;
  amount: number;
  currency: string;
  userid: number;
  transactionid: number;
  recipientname: string;
  created: string;
  recipientphone: string;
  senderphone: string;
  transactiontype: string;
};

type CombinedItem = AdminTransaction | Transaction;

// Type Guard Functions
function isAdminTransaction(item: CombinedItem): item is AdminTransaction {
  return item.type === "notification";
}

function isTransaction(item: CombinedItem): item is Transaction {
  return item.type === "transaction";
}

const CombinedScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [adminTransactions, setAdminTransactions] = useState<
    AdminTransaction[]
  >([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUsername(parsedUserData.username || parsedUserData.Username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchData = async () => {
    if (!username) return;

    try {
      const [transactionResponse, notificationResponse] = await Promise.all([
        fetch(
          `http://172.20.10.2:1010/Getusertransactions?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        fetch(
          `http://172.20.10.2:1010/GetadmintransactionForUser?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
      ]);

      const [transactionData, notificationData] = await Promise.all([
        transactionResponse.json(),
        notificationResponse.json(),
      ]);

      setTransactions(transactionData || []);
      setAdminTransactions(notificationData || []);
      console.log("Data retrieved successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteTransaction = async (transactionId: number) => {
    try {
      const response = await fetch(
        `http://172.20.10.2:1010/deletetransactions/${transactionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction.transactionid !== transactionId
          )
        );
        console.log("Transaction soft deleted successfully");
      } else {
        console.error("Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const deleteAdminTransaction = async (adminTransactionid: number) => {
    try {
      const response = await fetch(
        `http://172.20.10.2:1010/deleteAdmintransactions/${adminTransactionid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setAdminTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) =>
              transaction.adminTransactionid !== adminTransactionid
          )
        );
        console.log("Admin Transaction soft deleted successfully");
      } else {
        console.error("Failed to delete admin transaction");
      }
    } catch (error) {
      console.error("Error deleting admin transaction:", error);
    }
  };

  const handleLongPress = (
    id: number,
    type: "transaction" | "notification"
  ) => {
    Alert.alert(
      `Delete ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      `Are you sure you want to delete this ${type}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (type === "transaction") {
              deleteTransaction(id);
            } else {
              deleteAdminTransaction(id);
            }
          },
        },
      ]
    );
  };

  const handleDetails = (item: CombinedItem) => {
    if (isAdminTransaction(item)) {
      // Navigate to the NotificationDetail screen with the admin transaction details
      navigation.navigate("NotificationDetail", { notification: item });
    } else if (isTransaction(item)) {
      // Navigate to the TransactionDetail screen with the transaction details
      navigation.navigate("Detail", { transaction: item });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {};
    }, [username])
  );

  // Combine both lists into one, marking them with a type field
  const combinedData = [
    ...adminTransactions.map((item) => ({ ...item, type: "notification" })),
    ...transactions.map((item) => ({ ...item, type: "transaction" })),
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.containerSafe}>
        <View style={styles.topsentenceview}>
          <Text style={styles.sentence1}>Your Transactions</Text>
          <Text style={styles.sentence2}>
            Press on any item to see complete information.
          </Text>
        </View>

        <View style={styles.ContainerView}>
          <FlatList
            data={combinedData}
            keyExtractor={(item, index) => `${item.type}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={
                  item.type === "notification"
                    ? styles.notificationStyle
                    : styles.transactionStyle
                }
                onPress={() => handleDetails(item)}
                onLongPress={() => {
                  if (isAdminTransaction(item)) {
                    handleLongPress(item.adminTransactionid, "notification");
                  } else if (isTransaction(item)) {
                    handleLongPress(item.transactionid, "transaction");
                  }
                }}
              >
                <Text style={styles.content}>
                  {isAdminTransaction(item) ? (
                    <Text style={styles.receivedMessage}>
                      <Text style={styles.boldText}>You have received </Text>
                      <Text style={styles.amountText}>
                        {item.amount} {item.currency}{" "}
                      </Text>
                      <Text style={styles.boldText}>
                        from the administrator{" "}
                      </Text>
                      <Text style={styles.adminNameText}>
                        {item.adminname}{" "}
                      </Text>
                      <Text style={styles.boldText}>on </Text>
                      <Text style={styles.dateText}>{item.created}</Text>
                    </Text>
                  ) : (
                    <Text style={styles.transferredMessage}>
                      <Text style={styles.amountText}>
                        {item.amount} {item.currency}{" "}
                      </Text>
                      <Text style={styles.boldText}>
                        have been successfully transferred to{" "}
                      </Text>
                      <Text style={styles.recipientNameText}>
                        {item.recipientname}{" "}
                      </Text>
                      <Text style={styles.boldText}>on </Text>
                      <Text style={styles.dateText}>{item.created}</Text>
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            )}
          />

          {combinedData.length === 0 && (
            <View style={styles.noTransactionsView}>
              <Text style={styles.noTransactionsText}>
                No available transactions or notifications.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CombinedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfcece4a",
  },
  containerSafe: {
    flex: 1,
  },
  transactionStyle: {
    backgroundColor: "#fff", // Color for transactions
    padding: 12,
    marginVertical: 3,
    borderRadius: 8,
    shadowColor: "#324f68",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  notificationStyle: {
    backgroundColor: "#3a5e7a", // Color for notifications
    padding: 12,
    marginVertical: 3,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  ContainerView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 15,
    fontWeight: "bold",
    flexWrap: "wrap",
    flexShrink: 1,
    color: "white",
    marginBottom: 5,
  },
  sentence1: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: "bold",
    color: "#3a5e7a",
  },
  sentence2: {
    fontSize: 18,
    paddingLeft: 15,
    marginBottom: 20,
    color: "#3a5e7a",
  },
  noTransactionsText: {
    color: "#3a5e7a",
    fontSize: 17,
    textAlign: "center",
  },
  noTransactionsView: {
    flex: 1,
    justifyContent: "center",
  },
  topsentenceview: {},

  // for text style

  boldText: {},
  amountText: {},
  adminNameText: {},
  dateText: {},
  recipientNameText: {},
  receivedMessage: {},
  transferredMessage: {
    color: "#324f68",
  },
});
