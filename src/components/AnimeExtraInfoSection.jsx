import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import theme from "../theme";
import StyledText from "./StyledText"

const AnimeExtraInfoSection = ({ anime }) => {
    const openTrailerInBrowser = () => {
        const url = anime?.jikan?.trailer?.url;
        if (url) return Linking.openURL(url);
        Alert.alert("No hay trailer disponible");
        //Linking.openURL(data?.jikan?.trailer?.url);
      };

    return(<View style={styles.extraInfoContainer}>
        <View style={styles.extraInfoSection}>
          <View style={styles.extraInfo50}>
            <View style={styles.extraInfoItem}>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                Classificación
              </StyledText>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                {anime?.jikan?.rating?.split(" ")[0]}
              </StyledText>
            </View>
            <View style={styles.extraInfoItem}>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                Total de episodios
              </StyledText>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                {anime?.jikan?.episodes}
              </StyledText>
            </View>
          </View>

          <View style={styles.extraInfo50}>
            <View style={styles.extraInfoItem}>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                Generos
              </StyledText>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                {anime?.genres?.map((genre) => genre).join(", ")}
              </StyledText>
            </View>
            <View style={styles.extraInfoItem}>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                Duración de episodios
              </StyledText>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                {anime?.jikan?.duration.replace("per ep", "")}
              </StyledText>
            </View>
          </View>
        </View>
        <View style={styles.trailerSection}>
          <TouchableOpacity onPress={() => openTrailerInBrowser()}>
            <StyledText
              fontWeight="bold"
              fontSize="subheading"
              style={styles.trailer}
            >
              Ver trailer
            </StyledText>
          </TouchableOpacity>
        </View>
      </View>)
}

const styles = StyleSheet.create({
    extraInfoContainer: {
        backgroundColor: theme.backgroundColors.darkSecondary,
        width: "100%",
        height: "auto",
        marginTop: 10,
        flexDirection: "column",
      },
      extraInfoSection: {
        width: "100%",
        height: "auto",
    
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "flex-end",
        alignItems: "flex-end",
      },
      extraInfo50: {
        width: "50%",
        height: "auto",
        padding: 10,
      },
      extraInfoItem: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
      },
      trailerSection: {
        width: "100%",
        height: "auto",
        padding: 10,
        alignItems: "center",
      },
      trailer: {
        color: theme.colors.extras,
        //fontSize: theme.fontSizes.body,
        textAlign: "center",
      },
      trailerButton: {
        backgroundColor: theme.backgroundColors.extras,
        padding: 10,
        borderRadius: 5,
      },
    });

export default AnimeExtraInfoSection