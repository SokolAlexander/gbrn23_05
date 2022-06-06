import React, {useEffect, useRef} from 'react';
import {View, Animated, TouchableOpacity, Easing} from 'react-native';
import {usePrevious} from '../../utils/usePrev';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export const Checkbox = ({checked, onPress}: CheckboxProps) => {
  const prevChecked = usePrevious(checked);
  const checkboxScale = useRef(new Animated.Value(0));

  const handlePress = () => {
    Animated.spring(checkboxScale.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      checkboxScale.current.setValue(0);
      onPress();
    });
    // Animated.timing(checkboxScale.current, {
    //   toValue: 1.3,
    //   duration: 200,
    //   useNativeDriver: true,
    //   easing: Easing.bounce,
    // }).start(() => {
    //   Animated.timing(checkboxScale.current, {
    //     toValue: 1,
    //     duration: 200,
    //     useNativeDriver: true,
    //     easing: Easing.bounce,
    //   }).start();
    // });
  };

  // useEffect(() => {
  //   if (checked && !prevChecked) {
  //     handlePress();
  //   }
  //   if (!checked && prevChecked) {
  //     handlePress();
  //   }
  // }, [checked, prevChecked]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[
          styles.box,
          checked && styles.filled,
          {
            transform: [
              {
                scale: checkboxScale.current.interpolate({
                  inputRange: [0, 0.7, 1],
                  outputRange: [1, 1.3, 1],
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

// import React, {useRef} from 'react';
// import {View, Animated, Easing} from 'react-native';
// import {styles} from './Checkbox.styles';

// import {CheckboxProps} from './Checkbox.types';

// export const Checkbox = ({checked, onPress, id}: CheckboxProps) => {
//   const checkboxScale = useRef(new Animated.Value(0));

// const handlePress = () => {
// Animated.spring(checkboxScale.current, {
//   toValue: 1,
//   damping: 10,
//   useNativeDriver: false,
// }).start(() => {
//   checkboxScale.current.setValue(0);
//   // onPress(id);
// });
// Animated.timing(checkboxScale.current, {
//   toValue: 1,
//   useNativeDriver: false,
//   // tension: 10,
//   duration: 300,
// }).start(() => {
//   Animated.timing(checkboxScale.current, {
//     toValue: 0,
//     useNativeDriver: false,
//     duration: 400,
//     easing: Easing.bounce,
//   }).start();
// });
// };

//   return (
//     <Animated.View
//       onTouchEnd={handlePress}
//       style={[
//         styles.root,
//         {
//           transform: [
//             {
//               scale: checkboxScale.current.interpolate({
//                 inputRange: [0, 0.7, 1],
//                 outputRange: [1, 1.2, 1],
//               }),
//             },
//           ],
//         },
//       ]}>
//       {checked && <View style={styles.inner} />}
//     </Animated.View>
//   );
// };
