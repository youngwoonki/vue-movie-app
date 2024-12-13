// export function double(num){
//   if(!num){
//     return 0
//   }
//   return num * 2
// }

// 기본적으로 테스트 함수는 최대 5초까지만 기다리게 되어있다.
// mock1 사용
//export function asyncFn(){
// return new Promise(resolve=>{
//  setTimeout(()=>{
//    resolve('Done!');
//    },7000);
//  });
//}

import axios from 'axios';
import _upperFirst from 'lodash/upperFirst';
import _toLower from 'lodash/toLower';

export async function fetchMovieTitle(){
  const res= await axios.get('https://www.omdbapi.com/?apikey=7035c60c&i=tt4520988')
  return _upperFirst(_toLower(res.data.Title)); // Frozen II => Froze ii
}