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
import React, { useState } from "react";
import {
  useNavigation,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AdminTransactions = {
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

const AdminTransactionListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Function to navigate to the transaction detail screen
  const HandleAdminTransactionDetails = (
    admintransaction: AdminTransactions
  ) => {
    console.log("Navigating with transaction:", admintransaction);
    navigation.navigate("adminTransactionDetail", { admintransaction });
  };

  const [adminTransactions, setAdminTransactions] = useState<
    AdminTransactions[]
  >([]);

  // Function to fetch transactions from the backend
  const handleAdminTransaction = async () => {
    try {
      const response = await fetch(
        "http://172.20.10.2:1010/Getadmintransaction",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setAdminTransactions(data || []);
        console.log("admin Transactions retrieved successfully:", data);
      } else {
        console.error("Failed to retrieve admin transactions");
      }
    } catch (error) {
      console.error("Error fetching admin transactions:", error);
      // Handle network errors or other unexpected errors
    }
  };

  // Function to soft delete a transaction (modification)
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
        // Remove the transaction from the frontend state after soft deletion
        setAdminTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) =>
              transaction.adminTransactionid !== adminTransactionid
          )
        );
        console.log("admin Transaction soft deleted successfully");
      } else {
        console.error("Failed to delete admin transaction");
      }
    } catch (error) {
      console.error("Error deleting admin transaction:", error);
      // Handle network errors or other unexpected errors
    }
  };

  // handleLongPress function
  const handleLongPress = (admintransactionid: number) => {
    Alert.alert(
      "Delete admin Transaction",
      "Are you sure you want to delete this admin transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteAdminTransaction(admintransactionid),
        },
      ]
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      // Run effect every time HomeScreen is focused
      handleAdminTransaction();
      // Add your effect code here
      // For example, fetching data or updating state
      return () => {
        // Cleanup code (optional)
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.containerSafe}>
        <View style={{}}>
          <Text style={styles.sentence1}>Administrator Transactions</Text>
          <Text style={styles.sentence2}>
            Press on any admin transaction to see complete informations about
            this transaction.
          </Text>
        </View>

        <View style={styles.ContainerView}>
          {adminTransactions.length > 0 ? (
            <FlatList
              data={adminTransactions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.touchableTransaction}
                  onPress={() => HandleAdminTransactionDetails(item)}
                  onLongPress={() => handleLongPress(item.adminTransactionid)}
                >
                  <Text style={styles.content}>{item.amount} </Text>
                  <Text style={styles.content}>
                    {item.currency} have been successfully transfered to{" "}
                  </Text>
                  <Text style={styles.content}>{item.username} on </Text>
                  <Text style={styles.content}>{item.created}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.noTransactionsView}>
              <Text style={styles.noTransactionsText}>
                No available transaction.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AdminTransactionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfcece4a",
  },
  containerSafe: {
    flex: 1,
  },
  touchableTransaction: {
    padding: 12,
    marginVertical: 3,
    backgroundColor: "#fff",
    borderRadius: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    shadowColor: "#0000002c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  ContainerView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  content: {
    fontSize: 15,
    flexWrap: "wrap",
    color: "#3a5e7a",
    marginBottom: 5, // Add some spacing between items
  },

  sentence1: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: "bold",
    color: "#3a5e7a",
  },
  sentence2: {
    fontSize: 15,
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
    flex: 1, // display first in flex before justifying.
    justifyContent: "center", // to move the whole text at the center of the page.
  },
});
////////////////

// const websocketURL = "http://192.168.1.87:1010/ws";
// type Transaction = {
//   username: string;
//   amount: number;
//   currency: string;
//   employeephone: string;
//   adminphone: string;
//   adminname: string;
//   transactiontype: string;
// };

// const EmployeeNotification = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [ws, setWs] = useState<WebSocket | null>(null);
//   const [username, setUsername] = useState<string | null>(null); // Store username from userData

//   // Retrieve user data from AsyncStorage when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await AsyncStorage.getItem("userData");

//         if (userData) {
//           const parsedUserData = JSON.parse(userData);
//           const userUsername =
//             parsedUserData.username || parsedUserData.Username; // Ensure you grab the correct property based on how your data is structured

//           if (userUsername) {
//             setUsername(userUsername);
//             connectWebSocket(userUsername); // Connect WebSocket using the retrieved username
//           } else {
//             console.log("No username found in stored user data");
//             Alert.alert("Error", "No user found, please log in again.");
//           }
//         } else {
//           console.log("No user data found in AsyncStorage");
//           Alert.alert("Error", "User not logged in, please log in.");
//         }
//       } catch (error) {
//         console.error("Error fetching user data from AsyncStorage:", error);
//         Alert.alert("Error", "Failed to retrieve user data.");
//       }
//     };

//     fetchUserData();
//   }, []);

//   // WebSocket connection function
//   const connectWebSocket = (username: string) => {
//     const wsConnection = new WebSocket(${websocketURL}?username=${username});
//     setWs(wsConnection);

//     wsConnection.onopen = () => {
//       console.log("WebSocket connected for user:", username);
//     };

//     wsConnection.onmessage = (event) => {
//       console.log("Raw message received from WebSocket:", event.data); // Inspect the raw data
//       const newTransaction: Transaction = JSON.parse(event.data);
//       console.log("Message received from WebSocket:", newTransaction); // Log the parsed data

//       // Update state with the new transaction
//       setTransactions((prevTransactions) => [
//         newTransaction,
//         ...prevTransactions,
//       ]);
//     };

//     wsConnection.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     return () => {
//       wsConnection.close(); // Clean up WebSocket connection when component unmounts
//     };
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text style={styles.header}>Recent Transactions</Text>
//         {transactions.length > 0 ? (
//           <FlatList
//             data={transactions}
//             keyExtractor={(item, index) =>
//               ${item.username}-${item.amount}-${index}
//             } // Ensure unique keys for each transaction item
//             renderItem={({ item }) => (
//               <View style={styles.transactionItem}>
//                 <Text style={styles.transactionText}>
//                   You have received {item.amount} {item.currency} from the
//                   administrator {item.adminname} ({item.transactiontype})
//                 </Text>
//                 <Text style={styles.transactionText}>
//                   To: {item.username}, Admin Phone: {item.adminphone}, Employee
//                   Phone: {item.employeephone}
//                 </Text>
//               </View>
//             )}
//           />
//         ) : (
//           <Text style={styles.noTransactionsText}>No new transactions.</Text>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default EmployeeNotification;
