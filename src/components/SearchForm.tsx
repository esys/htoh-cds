import React, { Dispatch } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { MaterialCommunityIcons as IconMC } from "@expo/vector-icons";
import TransparentModal from "./TransparentModal";
import moment from "moment";
import RangeCalendar from "./RangeCalendar";
import { getLogger } from "../../config/logging";
import { Place, Search } from "../state/search/reducer";
import { getSearch } from "../state/search/selectors";
import { SearchActions, createUpdateSearchAction } from "../state/search/actions";
import { GlobalState } from "../state/store";
import { connect } from "react-redux";

const logger = getLogger("SearchForm");
const defaultDateRangeText = "Please select your stay dates";
const defaultPlaceText = "Please select your place of stay";

type Props = {
  navigation: any;
  onFormValidate: (place: Place, start: string, end: string) => void;

  // From Redux
  dispatchUpdateSearch: (search: Search) => void;
  search: Search;
};

type State = {
  calendarVisible: boolean;
  start?: string;
  end?: string;
};

class SearchForm extends React.Component<Props, State> {
  state: State = {
    calendarVisible: false,
  };

  getDateRangeText(): string {
    const { start, end } = this.state;
    if (!start || !end) return defaultDateRangeText;

    const s = moment(start);
    const e = moment(end);
    const nights = e.diff(s, "days");
    return `${s.format("D MMM")} - ${e.format("D MMM")} (${nights} nights)`;
  }

  onDateSelect() {
    const { start, end } = this.state;
    this.setState({ calendarVisible: false });
    this.props.dispatchUpdateSearch({ start, end });
  }

  renderModal() {
    const { calendarVisible, start, end } = this.state;
    return (
      <TransparentModal visible={calendarVisible} onTouchOutside={() => this.setState({ calendarVisible: false })}>
        <View style={styles.modalContent}>
          <RangeCalendar
            onRangeSelect={(start, end) => this.setState({ start, end })}
            onRangeSelectStart={() => this.setState({ start: undefined, end: undefined })}
          />
          <Text style={styles.dates}>{this.getDateRangeText()}</Text>
          <Button title="Choose these dates" disabled={!start || !end} onPress={() => this.onDateSelect()} />
        </View>
      </TransparentModal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.props.search.place?.city || defaultPlaceText}
          leftIcon={<Icon name="search" color="black" size={20} />}
          onFocus={() => this.props.navigation.navigate("PlaceSelection")}
        />
        <Input
          value={this.getDateRangeText()}
          leftIcon={<IconMC name="calendar" color="black" size={20} />}
          onFocus={() => {
            this.setState({ calendarVisible: true });
          }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Search" onPress={() => console.log("run search")} />
        </View>

        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    flex: 1,
    margin: 15,
    justifyContent: "space-around",
  },
  dates: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});

const mapStateToProps = (state: GlobalState) => ({
  search: getSearch(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
  dispatchUpdateSearch: (search: Search) => dispatch(createUpdateSearchAction(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
