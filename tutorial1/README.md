1. 일렉트로닉 프로젝트 초기 세팅 방법

   A. npm init => npm 초기 설정 생성

   B. npm install electron --save-dev => electron 모듈 설치

   C. package.json 설정 방법
   {
   "name": "my-electron-app",
   "version": "1.0.0",
   "description": "Hello World!",
   "main": "main.js",
   "scripts": {
   "start": "electron .",
   "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "Jane Doe",
   "license": "MIT",
   "devDependencies": {
   "electron": "23.1.3"
   }
   }

   D. npm run start => 프로젝트 실행

2. UI 창 띄우기
   A. 맥OS와 윈도우OS 구분 방법 및 맥OS에 대한 프로그램 종료 방안 분기처리
   B. VScode 디버깅 방법
   C. 사전 로드 스크립트 기초 사용법(사전 로드 스크립트에 객체 등을 등록하여 node 서비스 및 OS 메소드 사용) [createWindow에서 webPreferences에 입력]
   => 각 새로운 창 별로 preload를 세팅해줘야함
