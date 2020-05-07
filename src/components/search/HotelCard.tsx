import React, { FunctionComponent } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Hotel } from "../../api/cds/cds";
import { Card, Image, Rating } from "react-native-elements";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";

const bookingBlue = "rgb(31,56,125)";
const bookingGreen = "rgb(71,126,33)";

type Props = {
  item: Hotel;
  onPress: (hotel: Hotel) => void;
};

const formatHealthScore = (score: string): string => {
  if (!score || score.length < 2) return "?";
  return score.slice(0, score.length - 1).concat("/5");
};

export const HotelCard: FunctionComponent<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Card containerStyle={styles.card} wrapperStyle={styles.cardInnerWrapper}>
        <View style={styles.photoContainer}>
          <Image style={styles.photo} source={{ uri: item.ImageUrl }} />
          <View style={styles.featureOverlay}>
            <Text style={styles.featureText}>Breakfast included</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.title}>{item.HtlName}</Text>
          <Rating
            style={[styles.stars, styles.vspacer]}
            readonly
            startingValue={item.HtlStars}
            ratingCount={item.HtlStars}
            imageSize={16}
          />
          {item.ScoreBookingCom && (
            <View style={[styles.scoreContainer, styles.vspacer]}>
              <View style={styles.score}>
                <Text style={styles.scoreText}>{item.ScoreBookingCom}</Text>
              </View>
              <Text style={styles.scoreReviewCount}>{item.NbrReviewBookingCom} reviews</Text>
            </View>
          )}
          {item.HealthyAndSafetyRating && (
            <View style={[styles.healthContainer, styles.vspacer]}>
              <MCIcon name="shield-check" color="black" size={16} />
              <Text style={styles.healthText}>
                Health and Safety score: {formatHealthScore(item.HealthyAndSafetyRating)}
              </Text>
            </View>
          )}
          <View style={[{ flexDirection: "row" }, styles.vspacer]}>
            <Icon name="location-on" color="black" size={16} />
            <Text>{item.Distance.toFixed(2)} km of your destination</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardInnerWrapper: {
    flexDirection: "row",
  },
  photoContainer: {},
  featureOverlay: {
    position: "absolute",
    top: 15,
    height: 22,
    backgroundColor: bookingGreen,
    padding: 3,
  },
  featureText: {
    color: "white",
    fontSize: 12,
  },
  photo: {
    width: 150,
    height: 200,
    resizeMode: "cover",
  },
  rightColumn: {
    flex: 1,
    margin: 5,
    marginLeft: 10,
  },
  vspacer: {
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  stars: {
    alignSelf: "flex-start",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  healthContainer: {
    flexDirection: "row",
  },
  healthText: {},
  score: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bookingBlue,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    width: 30,
    height: 30,
    padding: 3,
  },
  scoreText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreReviewCount: {
    marginLeft: 10,
  },
});
