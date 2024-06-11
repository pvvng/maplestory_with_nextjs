# 메이플스토리 BGM/OST 웹플레이어 - 🍁Storify🍁 README

## 1. 설치 방법

### click and move 👉 [웹으로 보기 or 다운로드](https://maple-storify.netlify.app/)

<details>
  <summary>window 환경에서 설치하기</summary>
  <div align = 'center'>
    <img src='https://github.com/pvvng/pvvng.github.io/assets/112927193/85f131a5-41ae-496e-aa15-5db551236de4' width='33%' />
    <img src='https://github.com/pvvng/pvvng.github.io/assets/112927193/34e7f2a3-dbcd-484a-8136-89aff62374d1' width='33%' />
  </div>
</details>

<details>
  <summary>ios 환경에서 설치하기</summary>
  <div>
    <img src='https://github.com/pvvng/pokemon_game_with_nextjs/assets/112927193/4a3d0958-72e5-48a2-ab56-52ac3f99ed0f' width='31%' />
        <img align='top' src='https://github.com/pvvng/pokemon_game_with_nextjs/assets/112927193/1b0aa4ce-126b-4db6-8c85-1655f9edad7c' width='33%'/>
        <img align='top' src='https://github.com/pvvng/pokemon_game_with_nextjs/assets/112927193/59db49ff-5b50-477a-afaa-1b86c2fb00dc' width = '33%'/>
  </div>
</details>

<details>
  <summary>android 환경에서 설치하기</summary>
  <div align='center'>
    <img src='https://github.com/pvvng/pokemon_game_with_nextjs/assets/112927193/99d8824b-ba02-4cf0-897d-430c45a55176' width='30%' />
  </div>
</details>

## 2. 개요
- 프로젝트 이름 : 메이플스토리 BGM/OST 웹플레이어 - 🍁Storify🍁
- 개발 기간 : 2024.06.04 ~ 2024.06.11
- 개발 환경 : Next.js, Typescript, AWS S3 bucket, mongoDB
- 작업 관리 : Git (GitFlow)
- 배포 : Netlify
- #### installed Library
        npm install react-query
        npm install react-redux
        npm install @reduxjs/toolkit
        npm install mongodb
        npm install aws-sdk
        npm install axios
        npm install fast-levenshtein
        npm install howler
        npm install styled-componets
        npm install babel-plugin-styled-components
        npm install next-auth
        npm install next-pwa
        npm install @fontawesome/react-fontawesome
        npm install react-bootstrap

## 3. 프로젝트 설명

- ##### 게임 "메이플스토리"의 BGM/OST 웹 플레이어입니다.
  - 여가 시간 중 어릴적 즐겨하던 게임인 메이플스토리의 BGM 모음집을 듣다가 참지 못하고 만들어 버린 음원 웹 플레이어입니다. 메인페이지 레이아웃은 github dashboard를 참고하였고, 앨범 페이지와 음원 재생 페이지의 레이아웃은 Spotify를 참고하였습니다.
  - 프로젝트 시작 계기는 사소했지만, 구체적인 목표를 잡으면서 이번 프로젝트엔 앞서 사용하지 못한 기술들을 사용하면 좋겠다고 생각하였습니다. 그래서 React-Query, Typescript, Styled-componet 등 이전 프로젝트에 사용하지 않는 기술을 적극 활용하였고, 실제로 사용하면서 기술 이해도를 향상하고자 하였습니다.
  - 한 줄 요약 : 이 프로젝트의 목표는 **해볼 수 있는건 다 해보자** 입니다.

- ##### Typescript로 타입 에러 제어
  - 이전 프로젝트에서 타입 에러로 버그가 발생한 적이 많았습니다. 특히, HTTP 통신으로 데이터를 get 했을때, 데이터가 변수에 저장되기 전에 HTML에서 사용하면서 타입 에러가 발생하는 일이 잦았는데, TypeScript로 그런 부분을 미연에 방지하고자 하였습니다. 또한, Typescript가 컴파일 타임에 오류를 미리 잡아줘서 디버깅에 드는 시간을 줄여준다는 장점도 알게 되었습니다. Typescript를 적극 활용했다고 장담하지는 못하겠지만 프로젝트 규모가 커질수록 Typescript의 중요도는 비례적으로 올라가겠노라 알게 되는 시간이었습니다. 

- ##### React-Query를 활용한 효율적인 비동기 통신 처리
  - React-Query와 Axios 라이브러리를 혼용함으로, 더욱 효과적인 HTTP 비동기 통신 관리 및 처리를 하였습니다. 특히, React-query는 "이걸 왜 지금까지 안 썼지?" 하는 생각이 들 정도로 파괴적인 라이브러리였습니다. 서버 상태 관리 및 데이터 자동 캐싱, 종속성에 따른 리페치와 효과적인 로딩 및 오류 상태 관리 등 비동기 데이터 관리를 React-Query를 통해서 하고, Axios 라이브러리를 통해 간편하게 HTTP 요청 관리를 하게 되니 정말 신세계가 따로 없었습니다. 다만 아쉬운 점은 Tanstack-query(신버전)이 아닌 React-Query(구버전) 으로 프로젝트를 진행하였다는 것 입니다.  

- ##### Redux-Toolkit을 이용한 전역적 상태 관리
  - React-redux, Redux-toolkit 라이브러리를 통해 상태를 전역적으로 관리하고자 했습니다. 여러 컴포넌트 간에 복잡하게 상태를 공유하는 경우엔 SPA가 아니더라도 Redux는 효과적이라고 생각합니다. 다만, 페이지가 이동된 후에 이용자가 새로고침을 하게 된다면 Redux 상태가 초기화 되기 때문에 HTML로 보여줘야 하는 데이터, 혹은 유저 정보 등 민감한 데이터 등은 전역 상태 관리가 어렵지 않나 라는 생각을 가지게 되었습니다. 이에 대한 해결책은 아직 찾지 못했습니다. 이후 프로젝트나 추가적인 공부를 통해 이를 보완하고자 합니다.

- ##### Styled-Components 를 활용한 css-in-js
  - 원래 전 css를 작성할 때, Scss를 주로 이용하였습니다. 하지만 이번 프로젝트의 목표인 "다 해보자" 에 도달하기 위해 이론만 알고 있던 Styled-componets를 프로젝트에 도입하였습니다. 사용으로 느낀 점은 호불호가 좀 갈릴 순 있겠지만 React 기반의 프레임워크에선 꽤나 효과적인 라이브러리라고 생각합니다. 특히, Props를 통한 동적 스타일링이 비교적 쉽다는 부분과, 스타일의 격리가 가능한 부분은 프로젝트를 할 때마다 css 작명으로 골머리를 앓던 제게 큰 도움이 됐습니다.

- ##### Levenshtein(편집 거리) 라이브러리를 활용한 추천 검색어 시스템
  - 처음 프로젝트를 기획할 땐 chat GPT API를 활용한 임베딩 알고리즘 추천 검색어 기능을 제공하려고 했습니다. 다만 프로젝트 도중 Levenshtein 라이브러리를 알게 되었고, 기존 고민하던 임베딩 알고리즘과 비교한 결과, Levenshtein 라이브러리를 통해 추천 검색어 기능을 구현하는게 더 좋은 판단이라고 생각했습니다. 물론 chat GPT같은 LLM을 사용하고 싶긴 했지만, 아무래도 프로젝트 규모에 비해 너무 큰 부가 기능을 사용하는게 아닐까 싶었습니다. Levenshtein(편집 거리)도 LLM을 이용한 임베딩보다 정확하진 않지만, 전처리 과정을 거치니 꽤 나쁘지 않은 성능을 보여줬습니다.

- ##### Howler.js 라이브러리로 웹 음악 재생
  - HTML에서 오디오를 재생할 때, <audio>라는 훌륭한 태그가 선택지로 존재합니다. 다만, Howler.js 라이브러리를 사용하면 좀 더 효과적으로 음원 재생이 가능하기에 Howler.js를 사용하였습니다.

- ##### Google & Github 소셜 로그인
  - 과거 Next 프로젝트를 할 때는 비교적 구현이 쉬운 Github 소셜로그인만 구현했는데, 이번엔 조금 더 욕심을 부려서 Google 소셜 로그인도 구현하였습니다. Google console에 최초 설정을 잘 못해서 배포할 때 오류 수정한다고 꽤나 애를 먹긴 했지만 성공적으로 기능을 구현했습니다. 이제 깃허브 아이디가 없는 친구들에게도 프로젝트 자랑을 할 수 있어 기분이 좋습니다.
 
- ##### PWA
    - 모바일 환경에서도 이 프로젝트를 실행하는 것은 물론 실제 게임처럼 사용자 PC / 모바일 환경에 다운도 가능하게 만들고 싶었습니다. 이에 최적화된 기능은 PWA라고 생각합니다. PWA를 활용하여 네이티브 앱처럼 구동하는 웹을 제작하였습니다.
 
- ##### Git Flow
    - Git Flow 전략을 활용하여 프로젝트를 관리하고자 했습니다. Git을 활용한 버전 관리 전략을 미리 체득하는 것이 후일 팀원과의 협업 과정에서 큰 도움이 되리라 생각하여 최대한 Git Flow 전략의 흐름을 지키고자 노력하였습니다. 

## 4. 이용 방법과 주요 기능

## 5. 프로젝트 회고

- ### 5-1. 프로젝트 중 신경 쓴 부분

- ##### 추천 검색어 서비스
  - 앞서 언급했듯, 전 임베딩을 사용하지 않고, 편집 거리를 이용하여 추천 검색어 시스템을 구성하였습니다. 물론 LLM 인공지능으로 처리하는 임베딩 시스템보다 정확도 부분에선 현저히 떨어지는 수준이지만 그럼에도 나쁘지 않은 성능을 보여주는 것 같아서 퍽 만족스럽네요.
  - [Levenshtein으로 추천 검색어 서비스 구현하기](https://velog.io/@pvvng/levenshtein-%EA%B1%B0%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A1%9C-%EA%B2%80%EC%83%89%EC%96%B4-%EC%9C%A0%EC%82%AC%EB%8F%84-%EC%B0%BE%EA%B8%B0)
 
- ##### Howler.js를 사용한 오디오 플레이어
  - <audio> 태그 대신 Howler.js를 선택한 이유 중 하나는 Howler 라이브러리가 모바일 환경에서 화면이 종료되어도 음원 재생이 가능한 것입니다. PWA로 progressive webapp 을 만드려고 했기에 이는 좋은 선택지가 되리라 판단했습니다.
  - [Howler.js로 오디오 플레이어 만들기](https://velog.io/@pvvng/Howler.js%EB%A1%9C-%EB%AE%A4%EC%A7%81-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0)

- ### 5-2. 프로젝트 중 어려웠던 부분 && 프로젝트의 아쉬운 부분

## 6. 후기
### 느낀 점

>코드 짤때는 되게 즐거운데, 막상 완성된 웹을 보면 썩 유쾌하진 않습니다. 
제 부족함이 보이기 때문이겠죠. 
내가 만족하는 그날까지 정진하겠습니다. 화이팅 ~ (스껄갱갱스껄)

## 7. 업데이트 및 변동 사항

## 8. file tree

* page & components
  ```
  📦 app
  ┣ 📂album
  ┃ ┗ 📂[album]
  ┃   ┣ 📂[title]
  ┃   ┃ ┗ 📜page.tsx
  ┃   ┗ 📜page.tsx
  ┣ 📂components
  ┃ ┣ 📂heartbtn
  ┃ ┃ ┣ 📜AlbumHeartBtn.tsx
  ┃ ┃ ┗ 📜SongHeartBtn.tsx
  ┃ ┣ 📂mainpage
  ┃ ┃ ┣ 📜Banner.tsx
  ┃ ┃ ┣ 📜MainPage.tsx
  ┃ ┃ ┣ 📜MiniMypage.tsx
  ┃ ┃ ┣ 📜Popular.tsx
  ┃ ┃ ┣ 📜SearchContainer.tsx
  ┃ ┃ ┗ 📜ThemeComponent.tsx
  ┃ ┣ 📂play
  ┃ ┃ ┣ 📂AudioFunctions
  ┃ ┃ ┃ ┣ 📜ProgressBar.tsx
  ┃ ┃ ┃ ┣ 📜SlideBtns.tsx
  ┃ ┃ ┃ ┗ 📜VolumeInput.tsx
  ┃ ┃ ┣ 📜Album.tsx
  ┃ ┃ ┣ 📜DetailSong.tsx
  ┃ ┃ ┣ 📜GetHowlAudio.tsx
  ┃ ┃ ┗ 📜RotateImage.tsx
  ┃ ┣ 📂playlist
  ┃ ┃ ┗ 📜PlayList.tsx
  ┃ ┣ 📂SiginTools
  ┃ ┃ ┣ 📜SignBtns.tsx
  ┃ ┃ ┗ 📜SignForm.tsx
  ┃ ┣ 📜Footer.tsx
  ┃ ┗ 📜Navbar.tsx
  ┣ 📂data
  ┃ ┗ 📜mainPageData.ts
  ┣ 📂funcions
  ┃ ┣ 📂autoplay
  ┃ ┃ ┣ 📜playlistAutoPlay.ts
  ┃ ┃ ┗ 📜useAlbumDataQuery.ts
  ┃ ┣ 📂fetch
  ┃ ┃ ┣ 📜checkDependency.ts
  ┃ ┃ ┣ 📜fetchAlbums.ts
  ┃ ┃ ┣ 📜fetchAWS.ts
  ┃ ┃ ┣ 📜fetchImages.ts
  ┃ ┃ ┣ 📜getDBuserdata.ts
  ┃ ┃ ┗ 📜handleDBUpdate.ts
  ┃ ┗ 📜checkLevenshtein.ts
  ┣ 📂mypage
  ┃ ┣ 📂[album]
  ┃ ┃ ┗ 📂[title]
  ┃ ┃   ┗ 📜page.tsx
  ┃ ┗ 📜page.tsx
  ┣ 📜favicon.ico
  ┣ 📜font.css
  ┣ 📜layout.tsx
  ┣ 📜page.tsx
  ┗ 📜store.ts
  ```

* API
  ```
  📦 pages
  ┗ 📂api
    ┣ 📂auth
    ┃ ┗ 📜[...nextauth].ts
    ┣ 📂post
    ┃ ┣ 📜playlist.ts
    ┃ ┗ 📜userdata.ts
    ┣ 📂update
    ┃ ┗ 📜updateDatabase.ts
    ┣ 📜getAlbum.ts
    ┣ 📜getAudio.ts
    ┣ 📜getFolder.ts
    ┗ 📜getImage.ts
  ``` 
