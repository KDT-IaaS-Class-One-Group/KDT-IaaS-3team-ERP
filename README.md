# ERP 프로젝트
## 팀명: jjanbari
### 주제: 애완동물을 위한 사료 쇼핑몰
### 링크
- [설계서](https://www.notion.so/kongukjae/3-IA-773b670f5c764181899584cdd5661abb?pvs=4)
- [노션](https://www.notion.so/kongukjae/c77062a98430405a9ff04eecb7938847)
- [피그잼](https://www.figma.com/file/KFJTXPLlKytj6g7gXrDQmt/%5BFigJam%5D-ERP-Team-3?type=whiteboard&node-id=0%3A1&t=RuFsPXmEOCWZqtff-1)
### 작업 기간: 23-12-11 (월) ~ 24-01-26 (금)
### 기술 스택: React.js, TypeScript, MariaDB, HTML, CSS, JavaScript, AWS S3, AWS RDS
## 버전별 작업 내용 및 기간
```
v1.0 - [Vanilla] 인터랙션 점검 // 작업 기간: 23-12-11 (월) ~ 23-12-26 (화)

v2.0 - [CRA] 인터랙션 점검 // 작업 기간: 23-12-27 (수) ~ 24-01-05 (금)

v3.0 - [CRA] ERP 프로젝트(Project A) 완성 // 작업 기간: 24-01-08 (월) ~ 24-01-26 (금)

```

## CRA 애플리케이션 실행 안내
### 1. 터미널에서 jjanbari/로 이동합니다.
```
cd jjanbari/
```
### 2. NPM 패키지를 다운로드합니다.
```
npm i
```
### 3. CRA 프로젝트를 실행합니다.
```
npm start
```
### 4. 서버를 실행합니다.
```
node server.js
```

## 디렉토리 구성
```
jjanbari
|-- node_modules/      - NPM 모듈
|-- /public            - 정적 파일(index.html)
|-- /src               
|   |-- Auth/          - useContext를 이용한 로그인 전역 상태 관리
|   |-- Databases/     - RDS 연결 로직 및 쿼리문
|   |-- Layout/        - Header, Container, Footer 구성
|   |-- pages/         - 페이지별 모음
|   |-- App.tsx        - 렌더링할 App 컴포넌트
|   |-- App.css        - 스타일시트
|   |-- index.tsx      - CRA 프로젝트의 진입점
|   |-- index.css      - 스타일시트
|-- /uploads           - 이미지 업로드용 폴더(개발자용)
|-- .gitignore         - 커밋 방지
|-- image.js           - 이미지 호스팅용 서버(개발자용)
|-- package-lock.json  - NPM 패키지
|-- package.json       - NPM 패키지
|-- README.md          - 프로젝트 안내용 마크다운 문서
|-- server.js          - 기본 서버
|-- tsconfig.json      - TypeScript 템플릿 설정 파일
```

## [Git/Commit 컨벤션]
| 이모지 | 커밋 메시지 | 의미 |
|----------|--------------------------------------------------|------------------------------|
| ✨      | `:sparkles: Feat: `                               |  기능 추가 |
| 🎨      | `:art: Design: `                                  |  CSS 등 사용자 UI 디자인 변경 |
| ♻️      | `:recycle: Refactor: `                            |  코드 리팩토링 |
| 🐛      | `:bug: Fix: `                                     |  버그 수정 |
| 🔨      | `:hammer: Modify: `                               |  코드 수정 - 기능적 수정 |
| ✏️      | `:pencil2: Rename: `                              |  이름 및 오타 수정 |
| 🚚      | `:truck: Move: `                                  |  파일/폴더 이동 |
| 🔥      | `:fire: Delete: `                                 |  파일/폴더 삭제 |
| ⚰️      | `:coffin: Remove: `                               |  코드 제거 |
| 📦      | `:package: Package: `                             |  패키지/컴파일 관리 |
| 📝      | `:memo: Docs: `                                   |  Markdown 파일 등 문서 작업 |
| 💩      | `:poop: Bad: `                                    |  개선이 필요한 코드 |
| ⏪      | `:rewind: Rewind: `                               |  이전 작업 되돌아가기 |
| 💥      | `:boom: Reset: `                                  |  모두 리셋하고 초기화 |
| ⚗️      | `:alembic: Test: `                                |  테스팅 작업 |
| 🗨️      | `:speech_balloon: Comments: `                     | 주석 처리 업데이트 |
| 🗃️      | `:card_file_box: Data: `                          | JSON/DB 업데이트 |
| 🔀      | `:twisted_rightwards_arrows: Merge: `             | 브랜치 병합 |
