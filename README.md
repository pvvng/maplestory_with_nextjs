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
- 개발 환경 : Next.js, typescript, AWS, mongoDB
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

- ##### Next.js로 제작한 게임 "메이플스토리"의 BGM/OST 웹 플레이어입니다.

- ##### Typescript

- ##### React-Query

- ##### Redux-Toolkit

- ##### Styled-Components
 
- ##### PWA
    - 모바일 환경에서도 이 프로젝트를 실행하는 것은 물론 실제 게임처럼 사용자 PC / 모바일 환경에 다운도 가능하게 만들고 싶었습니다. 이에 최적화된 기능은 PWA라고 생각합니다. PWA를 활용하여 네이티브 앱처럼 구동하는 웹을 제작하였습니다.
 
- ##### Git Flow
    - Git Flow 전략을 활용하여 프로젝트를 관리하고자 했습니다. Git을 활용한 버전 관리 전략을 미리 체득하는 것이 후일 큰 도움이 되리라 생각하여 최대한 Git Flow 전략의 흐름을 지키고자 노력하였습니다. 

## 4. 이용 방법과 주요 기능

## 5. 프로젝트 회고

- ### 5-1. 프로젝트 중 신경 쓴 부분

- ### 5-2. 프로젝트 중 어려웠던 부분 && 프로젝트의 아쉬운 부분

## 6. 후기
### 느낀 점

- ## 7. 업데이트 및 변동 사항

- ## 8. file tree
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
