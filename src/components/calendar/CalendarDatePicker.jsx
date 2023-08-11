import React, { useEffect, useRef, useState } from "react";

import ConfirmBtnBottomSheet from "../common/ConfirmBtnBottomSheet";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Platform, View } from "react-native";
import color from "../../common/color";

const Container = ({ children, onBSheetClose, setIsConfirmed }) => {
  const ref = useRef();

  useEffect(() => {
    ref?.current?.open();
  }, []);

  const onClose = () => {
    onBSheetClose();
  };

  const onConfirm = () => {
    setIsConfirmed(true);
    ref?.current?.close();
  };
  const onCancel = () => {
    setIsConfirmed(false);
    ref?.current?.close();
  };

  if (Platform.OS === "android") {
    return <>{children}</>;
  } else {
    return (
      <>
        <ConfirmBtnBottomSheet
          rbRef={ref}
          heightPercentage={0.4}
          onClose={onClose}
          cancelText="취소"
          confirmText="선택"
          filled={true}
          buttonColor={color.COLOR_MAIN}
          onCancel={onCancel}
          onConfirm={onConfirm}
        >
          <View>{children}</View>
        </ConfirmBtnBottomSheet>
      </>
    );
  }
};

const CalendarDatePicker = ({
  selectedDate,
  setShowPicker,
  handlePickDate,
}) => {
  // 플롯픔 === ios 일 때 사용할 states
  const [date, setDate] = useState(selectedDate);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onChange = ({ type }, date) => {
    // console.log("onChange: ", Platform.OS, type, date);

    if (Platform.OS === "android") {
      if (type === "set") {
        handlePickDate(date);
      } else {
        setShowPicker(false);
      }
    } else {
      setDate(date);
    }
  };

  const onBSheetClose = () => {
    setShowPicker(false);
  };

  useEffect(() => {
    if (isConfirmed) {
      handlePickDate(date);
    }
  }, [isConfirmed]);

  return (
    <Container onBSheetClose={onBSheetClose} setIsConfirmed={setIsConfirmed}>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="spinner"
        themeVariant="light" // IOS only
        onChange={onChange}
        style={{ width: "80%", alignSelf: "center" }} // IOS only
      />
    </Container>
  );
};

export default CalendarDatePicker;
