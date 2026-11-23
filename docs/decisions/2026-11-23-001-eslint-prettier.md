# 코드 정리 도구: ESLint + Prettier

> **한 줄 이유:** 협업자에게 가장 익숙한 표준 도구를 쓰기 위해서다. TS 7은 typescript-eslint가 지원하지 않아 6.0으로 고정했다.

- 날짜: 2026-11-23
- 이슈: #1
- PR: #5
- 회의록: [2026-11-23 프로젝트 킥오프](../meetings/2026-11-23-kickoff.md)
- 상태: 채택

## 배경

협업으로 바뀌어도 코드 스타일이 흔들리지 않도록 린트/포맷 도구가 필요했다. Vite 최신 템플릿은 기본 린터로 oxlint를 쓴다.

## 검토한 선택지

1. **oxlint 유지 (템플릿 기본값)**: 매우 빠르다. 생태계와 플러그인, 에디터 지원은 ESLint보다 좁다.
2. **ESLint + Prettier**: 사실상 표준이라 협업자가 익숙하고 플러그인과 VS Code 지원이 풍부하다.
3. **Biome**: 린트와 포맷을 한 도구로 처리한다. 규칙 생태계가 아직 ESLint보다 작다.

## 결정

- oxlint를 빼고 ESLint(flat config) + typescript-eslint + react-hooks + react-refresh를 쓴다.
- 포맷은 Prettier가 맡고, eslint-config-prettier로 겹치는 규칙을 끈다.
- husky + lint-staged로 커밋 직전에 변경 파일을 자동 검사하고 정리한다.
- .editorconfig와 .gitattributes로 줄바꿈을 LF로 고정한다.
- VS Code 추천 확장을 등록하고 저장 시 자동 포맷을 켠다.
- **TypeScript를 ~6.0으로 고정한다.**

## 이유

- 협업 전환을 대비하면 "가장 많은 사람이 익숙한 도구"가 가장 중요하다.
- Windows 환경이라 CRLF가 섞일 위험이 있어 LF로 고정했다.
- 템플릿 기본 TypeScript 7(Go 네이티브 포트)은 typescript-eslint가 아직 지원하지 않아(peer: `<6.1.0`) 설치가 막혔다.

## 영향

- typescript-eslint가 TS 7을 지원하면 TypeScript 업그레이드를 다시 검토한다.
- Prettier 설정: 세미콜론 없음, 작은따옴표, trailing comma 전체, 줄 폭 100.
