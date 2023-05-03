
const express = require('express');                                    //express 모듈 가져오기 
const { Configuration, OpenAIApi } = require("openai");                //OpenAI Configuration과 OpenAIApi 가져오기
const cors = require('cors');                                          //CORS 처리를 위한 모듈 가져오기
const apiKey = "secret";  //OPENAI API KEY

// Configuration 객체 생성
const configuration = new Configuration({
  apiKey: apiKey
});

// OpenAIApi 객체 생성
const openai = new OpenAIApi(configuration);

// express 애플리케이션 생성
const app = express();

//CORS 이슈 해결
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// '/fortuneTell' 라우트의 POST 요청에 대한 처리 함수
app.post('/fortuneTell', async function (req, res) {

  // OpenAI API를 사용하여 챗봇 대화 생성
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo", 
    messages: [
      {role: "system", content: "당신은 세계 최고의 점성술사입니다."},
      {role: "user", content: "당신은 세계 최고의 점성술사입니다."},
      {role: "assistant", content: "안녕하세요, 저는 챗도지입니다. 무엇을 도와드릴까요? 부담없이 질문해 주세요."},
      {role: "user", content: "오늘의 운세에 대해 말해줘"},
    ],
  });

  // OpenAI API에서 받은 응답에서 대화 결과 추출
  let fortune = completion.data.choices[0].message['content'];

  // 대화 결과를 JSON 형태로 반환
  res.json({'assistant': fortune});
});

// 애플리케이션을 3000번 포트에서 실행
app.listen(5500, () => {
  console.log("App listening on port 5500!");
});
