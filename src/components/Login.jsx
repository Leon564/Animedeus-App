import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StyledText from "./StyledText";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const Login = () => {
  
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  

    //disable button when inputs are empty
    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    React.useEffect(() => {
      if (username.length > 0 && password.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [username, password]);
  //change te color of borderbottom of input when focused
  const [usernameFocused, setUsernameFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);


  const handleUsernameFocus = (focus) => {
    setUsernameFocused(focus);
  };


  const handlePasswordFocus = (focus) => {
    setPasswordFocused(focus);
  };

  //ref for password input
  let passwordInput;


  return (
    <LinearGradient
      colors={[
        theme.backgroundColors.darkPrimary,
        theme.backgroundColors.darkSecondary,
      ]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.container}>
          <View style={styles.appLogoSection}>
            <Image
              style={styles.appLogo}
              source={require("../../assets/Amadeus_Logo.webp")}
            />
          </View>
          <View style={styles.inputsSection}>
            <View style={styles.inputContainer}>
              <Icon style={styles.inputIcon} name="user" color="#fff" solid />
              <TextInput
                style={{
                  ...styles.input,
                  borderBottomColor: usernameFocused
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                }}
                onSubmitEditing={() => passwordInput.focus()}
                onChangeText={setUsername}
                value={username}
                onFocus={()=>handleUsernameFocus(true)}
                onBlur={()=>handleUsernameFocus(false)}
                placeholder="Usuario o Email"
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon style={styles.inputIcon} name="lock" color="#fff" solid />
              <TextInput
                style={{
                  ...styles.input,
                  borderBottomColor: passwordFocused
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                }}
                onChangeText={setPassword}
                value={password}
                onFocus={()=>handlePasswordFocus(true)}
                onBlur={()=>handlePasswordFocus(false)}
                placeholder="Contraseña"
                ref={(input) => (passwordInput = input)}
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.buttonsSection}>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: theme.colors.primary,
                opacity: buttonDisabled ? 0.5 : 1,
              }}
              onPress={() => { buttonDisabled ? null : console.log("login") }}
            >
              <StyledText style={styles.buttonText}>INICIAR SESIÓN</StyledText>
            </TouchableOpacity>
            <TouchableOpacity>
              <StyledText style={styles.guestButtonText}>INICIAR COMO INVITADO</StyledText>
            </TouchableOpacity>
          </View>
          <View style={styles.footerSection}>
            <TouchableOpacity onPress={()=>navigate("/register")}>
              <StyledText style={styles.footerText}>
                CREAR UNA CUENTA
              </StyledText>
            </TouchableOpacity>
            <TouchableOpacity>
              <StyledText style={styles.footerText}>¿OLVIDASTE TU CONTRASEÑA?</StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    width: "100%",
  },
  guestButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    width: "100%",
    //alignItems: "center",
    //backgroundColor: "#9b59b6",
  },
  appLogoSection: {
    //flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    //backgroundColor: theme.backgroundColors.darkSecondary,
  },
  appLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputsSection: {
    //backgroundColor: "#9b59b6",
    //flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    //backgroundColor: "#9b59b6",
    width: "100%",
    //height: 50,
    //borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: "#fff",
    paddingLeft: 10,
    //borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    height: 50,
    width: "60%",
  },
  inputIcon: {
    fontSize: 16,
    color: "#fff",
    paddingRight: 10,
  },
  buttonsSection: {
    //flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 10,
  },
  button: {
    width: "auto",
    paddingHorizontal: 20,
    height: "auto",
    padding: 10,
    //borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  footerSection: {
    //flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#9b59b6",
  },
  footerText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
  },
});

export default Login;
