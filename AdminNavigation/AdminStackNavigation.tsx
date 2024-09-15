import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminAccount from "../AdminScreen/AdminAccount";
import AdminTabNavigator from "./AdminTabNavigator";
import AdminLogin from "../AdminScreen/AdminLogin";
import AdminRequestReset from "../AdminScreen/AdminRequestReset";
import AdminResetSuccess from "../AdminScreen/AdminResetSuccess";
import AdminTransactionDetailScreen from "../AdminScreen/AdminTransactionDetailScreen";
import AdminTransactionForm from "../AdminScreen/AdminTransactionForm";
import ChangeAdminNumber from "../AdminScreen/ChangeAdminNumber";
import ChangeAdminPassword from "../AdminScreen/ChangeAdminPassword";
import DeleteAdminAccount from "../AdminScreen/DeleteAdminAccount";
import ResetAdminPassword from "../AdminScreen/ResetAdminPassword";
import VerifyAdminCodeScreen from "../AdminScreen/VerifyAdminCodeScreen";
import ReportScreen from "../AdminScreen/ReportScreen";
import ReportDetail from "../AdminScreen/ReportDetail";
import EmployeeDetail from "../AdminScreen/EmployeeDetail";
import Employeereport from "../AdminScreen/Employeereport";
import EmployeeReportDetail from "../AdminScreen/EmployeeReportDetail";
import ChangeAdminEmail from "../AdminScreen/ChangeAdminEmail";

const Stack = createNativeStackNavigator();

function AdminStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="admin login"
        component={AdminLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="admintabs"
        component={AdminTabNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="admin account"
        component={AdminAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Request code"
        component={AdminRequestReset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Password updated"
        component={AdminResetSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="adminTransactionDetail"
        component={AdminTransactionDetailScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="admin transaction form"
        component={AdminTransactionForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="change admin number"
        component={ChangeAdminNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="change admin password"
        component={ChangeAdminPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="delete admin account"
        component={DeleteAdminAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="admin update password"
        component={ResetAdminPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="admin verify code"
        component={VerifyAdminCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Report detail"
        component={ReportDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="generate report"
        component={ReportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="employeedetails"
        component={EmployeeDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="employeereport"
        component={Employeereport}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="employeereportdetail"
        component={EmployeeReportDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeAdminEmail"
        component={ChangeAdminEmail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AdminStackNavigator;
