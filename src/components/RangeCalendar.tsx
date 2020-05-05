import React from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { getLogger } from "../../config/logging";

const logger = getLogger("RangeCalendar");

type Props = {
  onRangeSelect: (start: string, end: string) => void;
  onRangeSelectStart: () => void;
};

type State = {
  markedDates: MarkedDateByDay;
  isStartDatePicked: boolean;
  isEndDatePicked: boolean;
  startDate: string;
};

type DayParam = {
  dateString: string; // "2020-05-06"
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

type MarkedDate = {
  textColor: string;
  startingDay?: boolean;
  endingDay?: boolean;
  color: string;
};

type MarkedDateByDay = { [key: string]: MarkedDate };

type DateRange = [moment.Moment, moment.Moment];

export default class RangeCalendar extends React.Component<Props, State> {
  state = {
    markedDates: {},
    isStartDatePicked: false,
    isEndDatePicked: false,
    startDate: "",
  };

  getDateRange(): DateRange | null {
    const { isEndDatePicked, markedDates } = this.state;
    if (!isEndDatePicked) {
      // range is still being selected
      return null;
    }

    const days = Object.keys(markedDates).sort((a, b) => (a < b ? 1 : -1));
    if (days.length < 2) {
      logger.warn(`getDateRange expected at least 2 dates (first, last) in marked days, got ${days.length}`);
      return null;
    }

    return [moment(days[0]), moment(days[days.length - 1])];
  }

  onDayPress = (day: DayParam) => {
    if (this.state.isStartDatePicked == false) {
      this.props.onRangeSelectStart();
      let markedDates: MarkedDateByDay = {};
      markedDates[day.dateString] = { startingDay: true, color: "#00B0BF", textColor: "#FFFFFF" };
      this.setState({
        markedDates,
        isStartDatePicked: true,
        isEndDatePicked: false,
        startDate: day.dateString,
      });
    } else {
      let markedDates: MarkedDateByDay = this.state.markedDates;
      let startDate = moment(this.state.startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDate, "days");
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate: string = startDate.add(1, "day").format("YYYY-MM-DD");
          if (i < range) {
            markedDates[tempDate] = { color: "#00B0BF", textColor: "#FFFFFF" };
          } else {
            // last day of period
            markedDates[tempDate] = { endingDay: true, color: "#00B0BF", textColor: "#FFFFFF" };
          }
        }
        this.setState({
          markedDates,
          isStartDatePicked: false,
          isEndDatePicked: true,
          startDate: "",
        });

        this.props.onRangeSelect(this.state.startDate, endDate.format("YYYY-MM-DD"));
      } else {
        alert("Select an upcoming date!");
      }
    }
  };

  render() {
    return (
      <Calendar
        minDate={Date()}
        monthFormat={"MMMM yyyy"}
        markedDates={this.state.markedDates}
        markingType="period"
        hideExtraDays={true}
        hideDayNames={true}
        onDayPress={this.onDayPress}
      />
    );
  }
}
