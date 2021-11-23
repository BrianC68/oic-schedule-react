import axios from "axios";
import {
    GET_TODAYS_SCHEDULE,
    // GET_SCHEDULE,
    // ERROR,
} from '../actions/types';

// const jsonHeader = {
//     headers: {
//         // 'Content-Type': 'application/json',
//         'Origin': 'http://localhost:3000',
//     }
// }

export const getTodaysSchedule = () => async dispatch => {
    // Get todays schedule from oicwebapps.com
    
    try {
        const res = await axios.get('https://www.oicwebapps.com/web_apps/schedule/api/');
        console.log(res)
        dispatch({
            type: GET_TODAYS_SCHEDULE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}

// export const getSchedule = () => async dispatch => {
//     // Get schedule for the next four weeks
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yy = today.getFullYear();
//     console.log(yy)

//     var futureDate = today.setDate(today.getDate() + 30);
//     var fdd = String(futureDate.getDate()).padStart(2, '0');
//     var fmm = String(futureDate.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var fyy = futureDate.getFullYear();

//     startDate = mm + '/' + dd + '/' + yy;
//     endDate = fmm + '/' + fdd + '/' + fyy;
//     const jsonDataPullURL = `https://ozaukeeicecenter.schedulewerks.com/public/ajax/swCalGet?tid=-1&from=${startDate}&to=${endDate}&Complex=-1`

//     try {
//         const res = await axios.get(jsonDataPullURL);
//         dispatch({
//             type: GET_SCHEDULE,
//             payload: res.data
//         })
//     } catch (err) {
//         console.log(err);
//     }
// };
