
import { AsyncStorage } from 'react-native';

export default {

  get: (key) => {

      return AsyncStorage.getItem(key).then((value) => {
          return JSON.parse(value);
      });

  },

  set: (key, json) => {

      const value = JSON.stringify(json);

      return AsyncStorage.setItem(key, value);

  },

  merge: (key, json) => {

      const value = JSON.stringify(json);

      return AsyncStorage.mergeItem(key, value);

  },

  clear: (key) => {

      return AsyncStorage.removeItem(key);

  }

}

// const deviceStorage = {
//     // our AsyncStorage functions will go here :)
//     async saveItem(key, value) {
//       try {
//         await AsyncStorage.setItem(key, value);
//       } catch (error) {
//         console.log('AsyncStorage Error: ' + error.message);
//       }
//     },
//     async loadJWT() {
//       try {
//         const value = await AsyncStorage.getItem('token');
//         console.log("async value" + value);
//         if (value == null) {
//             return '';
//         }

//         return JSON.parse(value);

//       } catch (error) {
//         console.log('AsyncStorage Error: ' + error.message);
//         return '';

//       }
//     },
// };

// export default deviceStorage;