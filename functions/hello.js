exports.handler = async function(event, context){ // 비동기로 만들어줘야함
  return{
    statusCode : 200, // 정상작동 코드 200
    body : JSON.stringify({ // body에 string값만 넣어줄 수 있기 때문에 stringify로 string으로 바꿔준거다.
      name : 'YOUNG',
      age : 29,
      email : 'duddns0702@gmail.com'
    })
  }
}