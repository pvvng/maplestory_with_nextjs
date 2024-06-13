# 메이플스토리 BGM/OST 웹플레이어 - 🍁Storify🍁 README

## 1. 설치 방법


### click and move 👉 [웹으로 보기 or 다운로드](https://maple-storify.netlify.app/)


<details>
  <summary>window 환경에서 설치하기</summary>
  <div align = 'center'>
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/da2207fa-07f6-41d9-a277-42125861811a' width='49%' />
  </div>
</details>

<details>
  <summary>ios 환경에서 설치하기</summary>
  <div>
    <img src='https://github.com/pvvng/pokemon_game_with_nextjs/assets/112927193/4a3d0958-72e5-48a2-ab56-52ac3f99ed0f' width='31%' />
        <img align='top' src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/d4bf3ead-3e08-4fa7-a86b-6b1daa34da27' width='33%'/>
        <img align='top' src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/7dba8c0f-4a9f-4b90-8c71-0a0a3950c7e2' width = '33%'/>
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
  - React-Query와 Axios 라이브러리를 혼용함으로, 더욱 효과적인 HTTP 비동기 통신 관리 및 처리를 하였습니다. 특히, React-query는 "이걸 왜 지금까지 안 썼지?" 하는 생각이 들 정도로 파괴적인 라이브러리였습니다. 서버 상태 관리 및 데이터 자동 캐싱, 종속성에 따른 리페치와 효과적인 로딩 및 오류 상태 관리 등 비동기 데이터 관리를 React-Query를 통해서 하고, Axios 라이브러리를 통해 간편하게 HTTP 요청 관리를 하게 되니 정말 신세계가 따로 없었습니다. 

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

### 4-0. 로그인

<div align='center'>
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/1b13c89c-46e8-4ce9-9a0e-d0dd91fdc7f7f' width='49%' />
</div>

구글 혹은 깃허브 계정으로 소셜 로그인이 가능합니다. 만약 로그인을 하지 않을 경우 웹 사용에 제한이 생깁니다.

- - -

### 4-1. 메인페이지
### 배너, 추천 테마, 미니 플레이리스트 기능

<div align='center'>
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/772d28c5-f2da-4388-af3c-fe95d7189d1d' width='31%' />
      <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/45e2cb5b-de96-4e21-a313-599472a88415' width='31%' />
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/35fe2e28-f395-4019-a8ce-bed9ce47eca4' width='31%' />
</div>


- #### 배너 : 

배너는 쇼핑몰 사이트의 광고판이나, 음악 사이트의 신곡 홍보 등의 역할을 위해 제작되었습니다. 하단 버튼을 클릭하면 해당 앨범 페이지로 이동합니다. 배너는 10초마다 다른 화면으로 교체됩니다.

- #### 추천 테마:

추천 테마는 #분위기 에 따라 앨범을 추천합니다. 추천 테마 탭은 캐러셀 애니메이션이 삽입되었고, 아이콘 버튼을 클릭하면 부드럽게 이동합니다. 또한, 버튼을 추천테마 리스트가 종료될 때 까지 클릭하면 다시 원상태로 돌아옵니다. 추천 테마 이미지를 hover하면 이미지가 반투명해지고, 클릭하면 해당 앨범 페이지로 이동합니다.

- #### 미니 플레이리스트:

메인 페이지에서 사용자의 플레이리스트를 바로 확인하고, 하트 해제 및 플레이리스트 페이지로 바로 이동이 가능합니다.


### 앨범 검색, 추천 검색어 기능

<div align='center'>
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/d5d02d3b-8831-4d8a-adb0-5434a0474469' width='48%' />
      <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/137401a8-349c-4853-9a82-9388bdd4c53a' width='48%' />
</div>

- 좌측 상단 input 버튼을 클릭하여 앨범을 검색할 수 있습니다.

- 검색어를 찾지 못한 경우 유사한 앨범을 추천하거나, 오늘의 추천 앨범을 보여줍니다.

- - -

### 4-2. 앨범페이지

<div align='center'>
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/b705e8f3-912b-4b65-9783-30c79d7e3a88' width='48%' />
</div>

- #### 앨범 리스트:

앨범의 전체 음원 리스트를 보여줍니다.

- #### 하트 버튼:

하트 버튼을 클릭하여 좋아하는 음원을 플레이리스트에 저장 가능합니다. 하트 버튼을 한번 더 클릭하면 플레이리스트에서 해당 음원이 삭제됩니다.

### 앨범 플레이, 오토플레이 기능

<div align='center'>
  <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/91daa410-d66f-4058-b4e5-1b7ac1f42bc2' width='48%' />
  <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/3724b627-384c-44f5-9941-b33c6062c30c' width='48%' />
</div>

- #### 앨범 플레이 기능:

음원 플레이 버튼을 클릭하여 음악을 재생하거나, 일시정지 시킬 수 있습니다. 음악이 일시정지 되면 하단 남은 음원 길이 바가 정지됩니다. 음악이 재생 중이라면 음원 길이가 점차 줄어듭니다. 음원이 재생 중이라면 앨범 커버가 회전하는 애니메이션이 작동합니다.

- #### 앨범 오토 플레이 기능:

오토 플레이 버튼을 클릭하여 오토 플레이 기능 활성화가 가능합니다. 오토 플레이 기능이 활성화 되어 있을 때 음악 재생이 완료되면 다음 음원을 재생합니다. 

- #### 앨범 전체보기 :

좌측 앨범 메뉴에서 전체 앨범을 볼 수 있습니다. 기능은 앨범 페이지와 동일합니다. 현재 재생 중인 음악은 검정 배경색을 가집니다.

- - -

### 4-3. 마이페이지 (플레이리스트)
  
<div align='center'>
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/e2622292-804a-40e9-b4a8-210ab9ca3d6f' width='48%' />
</div>

- #### 플레이리스트:

전체 플레이리스트를 보여줍니다. 플레이리스트는 로그인 한 유저가 하트 버튼을 누른 음원으로 구성됩니다.

- #### 하트 버튼:

하트 버튼을 클릭하여 좋아하는 음원을 플레이리스트에 저장 가능합니다. 하트 버튼을 한번 더 클릭하면 플레이리스트에서 해당 음원이 삭제됩니다.


### 플레이리스트 플레이, 오토플레이 기능

<div align='center'>
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/b887b0a7-3a8d-4709-afce-3bc49e39fcc1' width='48%' />
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/fef588c4-f4d2-406c-a165-bc6912c2e552' width='48%' />
</div>

- #### 플레이리스트 플레이 기능:

음원 플레이 버튼을 클릭하여 음악을 재생하거나, 일시정지 시킬 수 있습니다. 음악이 일시정지 되면 하단 남은 음원 길이 바가 정지됩니다. 음악이 재생 중이라면 음원 길이가 점차 줄어듭니다. 음원이 재생 중이라면 앨범 커버가 회전하는 애니메이션이 작동합니다.

- #### 플레이리스트 오토 플레이 기능:

오토 플레이 버튼을 클릭하여 오토 플레이 기능 활성화가 가능합니다. 오토 플레이 기능이 활성화 되어 있을 때 음악 재생이 완료되면 다음 음원을 재생합니다. 

- #### 앨범 전체보기 :

좌측 앨범 메뉴에서 전체 플레이리스트를 볼 수 있습니다. 기능은 플레이리스트 페이지와 동일합니다. 현재 재생 중인 음악은 검정 배경색을 가집니다.

  
## 5. 프로젝트 회고

- ### 5-1. 프로젝트 중 신경 쓴 부분

- ##### 추천 검색어 서비스
  - 앞서 언급했듯, 전 임베딩을 사용하지 않고, 편집 거리를 이용하여 추천 검색어 시스템을 구성하였습니다. 물론 LLM 인공지능으로 처리하는 임베딩 시스템보다 정확도 부분에선 현저히 떨어지는 수준이지만 그럼에도 나쁘지 않은 성능을 보여주는 것 같아서 퍽 만족스럽네요.
  - [Levenshtein으로 추천 검색어 서비스 구현하기](https://velog.io/@pvvng/levenshtein-%EA%B1%B0%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A1%9C-%EA%B2%80%EC%83%89%EC%96%B4-%EC%9C%A0%EC%82%AC%EB%8F%84-%EC%B0%BE%EA%B8%B0)
 
- ##### Howler.js를 사용한 오디오 플레이어
  - <audio> 태그 대신 Howler.js를 선택한 이유 중 하나는 Howler 라이브러리가 모바일 환경에서 화면이 종료되어도 음원 재생이 가능한 것입니다. PWA로 progressive webapp 을 만드려고 했기에 이는 좋은 선택지가 되리라 판단했습니다.
  - [Howler.js로 오디오 플레이어 만들기](https://velog.io/@pvvng/Howler.js%EB%A1%9C-%EB%AE%A4%EC%A7%81-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
 
- ##### Axios와 React-Query를 활용한 HTTP 비동기 통신
  - useQuery 훅을 이용하여 더욱 효과적인 HTTP 통신을 위해 노력했습니다. 앞서 언급한 것처럼 서버 상태 관리 및 데이터 자동 캐싱, 종속성에 따른 리페치와 효과적인 로딩 및 오류 상태 관리 등 비동기 데이터 관리를 React-Query를 통해서 하고, Axios 라이브러리를 통해 간편하게 HTTP 요청을 관리하였습니다. 다만 아쉬운 점은 Tanstack-query(신버전)이 아닌 React-Query(구버전) 으로 프로젝트를 진행하였다는 것 입니다.
  - [프로젝트에서 사용한 fetch, Promise 함수 알아보기(총 3편)](https://velog.io/@pvvng/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%EB%90%9C-fetch-promise-%ED%95%A8%EC%88%98%EB%93%A4-%EC%86%8C%EA%B0%9C-1)

- ##### 컴포넌트의 재사용
  - 이번 프로젝트에서 album 페이지를 playlist 페이지에서 사용하거나, 하트 버튼 컴포넌트의 사용, 오디오 재생 컴포넌트의 재사용 등 다양한 컴포넌트 재사용을 위해 노력했습니다. 특히 기억에 남는건 오디오 재생 컴포넌트를 현재 재생중인 조건 (일반 앨범이냐, 플레이리스트냐) 에 따라서 오토플레이 활성화 시 다음 재생할 음원을 설정하였는데, 이 부분이 나쁘지 않았다고 생각합니다. 다만, 이러한 노력에도 유사한 함수 여러개 만들기, 컴포넌트 코드가 길어지는 등의 문제가 발생했습니다. 클린 코드를 위해선 먼저 생각하고 코드를 짜는게 맞는것 같습니다.
  - (음원 재생 컴포넌트 GetHowlAudio에 관한 설명)[https://velog.io/@pvvng/Howler.js%EB%A1%9C-%EB%AE%A4%EC%A7%81-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0]
 
- ##### useRef의 사용
  - useRef 훅의 동작 방식을 이번 프로젝트를 하면서 이해하게 되었습니다. useState 상태는 렌더링에 영향을 미치고, 컴포넌트가 재렌더링 될 때 변경되는데 반해, useRef 가 반환하는 객체는 재렌더링에 영향을 끼치지 않고, 컴포넌트가 재렌더링 되도 유지됩니다. 또한, Virtual Dom에서 DOM의 변경사항을 확인하여 DOM에 변동 사항을 재렌더링하지만, useRef는 DOM 에 직접 접근 가능합니다. 두 훅을 적절히 상황에 혼용하면 더욱 효과적으로 동작하는 웹을 만들 수 있겠다는 생각이 들었습니다.
  - 일례로, 1. 사용자에게 input 값을 입력 받아 2. 이를 album Array 안의 요소들과 비교하고 3. 비교한 값을 바탕으로 페이지를 라우팅해야하는 상황이 있었습니다. (메인페이지 - 검색버튼) 이 상황에서 사용자에게 입력받는 값을 useState 상태로 관리하니 input Value가 상태에 저장되는 시간보다 페이지 라우팅 속도가 빨라 input Value가 제대로 저장되지 않은채로 라우팅이 이루어져 오류가 발생했습니다. 이를 해결하기 위해 직접 DOM에 관여 가능한 useRef 훅을 사용하여 입력값을 관리하여 문제를 해결했습니다.
  - 비슷한 예시로 음원 재생 컴포넌트 getHowlAudio에서 오토플레이 버튼 활성화 상태에서 음원이 종료되면 다음 음원 페이지로 이동해야 했는데, 이를 상태로 관리시 상태에 값이 저장되는데 시간차가 존재해 오류가 발생했습니다. 이 경우도 useRef로 다음 재생할 음원을 관리하여 문제를 해결했습니다.
  - 결론적으론, 재렌더링에 관여하지 않고, DOM에 직접 접근 가능한 상태나 변수가 필요하다면 useRef 훅을 이용하는게 정말 좋은 선택지라는 것을 알게되는 시간이었습니다.
  - (검색 버튼과 useRef 훅)[https://velog.io/@pvvng/useRef%EB%A1%9C-input-value-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0]

- ### 5-2. 프로젝트 중 어려웠던 부분 && 프로젝트의 아쉬운 부분

- ##### 오토플레이를 위한 함수 / 커스텀 훅
  - 해당 프로젝트에서 가장 어려웠고, 구현까지 가장 오랜 시간이 걸렸으며 가장 공들인 기능인 오토플레이 기능이 기억납니다. 오토플레이 기능을 구현하기 위해 제가 짠 코드의 전반적인 이해가 선행되어야 했으며, 이 과정에서 과연 내가 100% 이해하고 코드를 짜고 있는건가? 라는 의문점을 가지게 되었습니다. 결과적으로는 성공적으로 해당 기능을 구현했지만, 함수와 커스텀 훅의 완성도가 떨어지는 것 같아 아쉬움이 남습니다. 다음 프로젝트에선 이런 부분을 미연에 방지하기 위해 코드 짜기 전 어떤 로직으로 기능을 구현할 지 미리 충분히 고민해보고 손가락을 움직여야겠습니다.
  - [오토플레이를 위한 함수 / 커스텀 훅](https://velog.io/@pvvng/%EC%98%A4%ED%86%A0%ED%94%8C%EB%A0%88%EC%9D%B4%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%95%A8%EC%88%98%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%9B%85)
 
- ##### Redux 의 활용도
  - 해당 프로젝트는 Redux를 사용하긴 했지만, Redux의 장점을 활용하진 못했습니다. 음원 재생이 URL params에 종속적으로 일어났기에 성공적인 음원 재생을 위해선 페이지지 라우팅 과정을 거쳐야했습니다. 이는 Next app routing의 특징이기도 하지만, Redux를 활용하기엔 충분한 환경이 아니라고 판단했습니다. 앞서 언급한 것처럼 사용자가 새로고침을 하면 store에 저장된 상태도 초기화 되기 때문에 렌더링에 관여하는 변수나, 사용자의 데이터 등은 store에 저장할 수 없겠다는 걸 알게 되었습니다. 물론 이를 타파하기 위한 좋은 방법이 어딘가 있으리라 확신하지만 저는 아직 그 방법을 깨치지 못한 것 같습니다. 이 부분이 아쉽습니다.

- ##### 더러운 코드
  - 웹페이지를 완성하고 제가 짠 코드를 처음부터 끝까지 읽어봤습니다. "이걸 내가 짰다고?" 하며 감탄한 코드도 있었지만, "이걸.. 내가 짰다고..?" 싶은 스파게티 코드도 더러 있었습니다. 정리가 가능한 부분을 가능한 모두 정리했지만 상태와 로직이 복잡하게 얽히고 섥혀 도저히 손을 대지 못한 코드도 존재합니다. 조금 더 생각하고 코드를 짤 걸 하는 후회가 남습니다.
 
- ##### Typescript
  - 제가 TS에 대한 이해도가 현저히 낮은 수준이라는 것을 알게 되었습니다. TS를 더 공부하여 효과적으로 에러 관리를 위해 노력하겠습니다.  
 
## 6. 후기
### 느낀 점

코드 짤때는 되게 즐거운데, 막상 완성된 웹을 보면 썩 유쾌하진 않습니다. 
제 부족함이 보이기 때문이겠죠. 
내가 만족하는 그날까지 정진하겠습니다. 예 뭐 화이팅 ~

>추천 노래 : 설원의 음유시인 Way Back home, 지구방위본부 진공청소기, 모험가 스토리 Go fight show your Energy,  블랙헤븐 Promise of heaven

## 7. 업데이트 및 변동 사항

- #### 2024-06-12
1. 앨범 커버 디자인을 CD처럼 수정하고, 턴테이블 톤암 CSS를 추가했습니다. 톤암은 음원 재생 여부에 따라 회전합니다. 
<div align='center'>
    <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/3b4a81a9-807a-461b-bf69-4cc00788a90a' width='48%' />
</div>

2. any 타입으로 선언된 일부 변수, Props의 타입을 알맞게 수정하였습니다.
3. Styled-component의 HTML DOM 요소에 인식되지 않는 속성이 추가되는 문제를 shouldForwardProp 기능으로 해결하였습니다.

- #### 2024-06-13
1. Google DevTools LightHouse 점수를 바탕으로 성능 최적화를 진행하였습니다.
   - performance : 60-70 => 86 ~ 95
   - Accesibility : 70-80 -> 100
   - Best Practice : 100
   - SEO : 90 ~ 100 => 100 
   <img src='https://github.com/pvvng/maplestory_with_nextjs/assets/112927193/4894f3ac-5685-4aca-808c-7ba8f7701080' width='48%' />

   - aws bucket에 prefetch와 이미지 lazy load, 이미지 형식 .webp로 변환, 적잘한 이미지 사이즈 지정 등으로 최적화를 진행하였습니다.
   - 다만, album, album 재생 페이지에서 performance 항목이 86점이 나왔기 때문에 추가적인 최적화 과정을 거칠 예정입니다.  


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
  ┃ ┃ ┣ 📜Arccodian.tsx
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
