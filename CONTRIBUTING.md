# 기여 가이드

혼자 진행 중이지만, 언제든 협업으로 전환할 수 있도록 아래 규칙을 지킵니다.

## 1. 모든 작업은 이슈에서 시작한다

- 기능, 버그, 설정, 문서 등 **모든 변경은 먼저 이슈로 등록**합니다.
- 이슈는 [GitHub Project 보드](https://github.com/users/aa8543aa/projects/2)에서 관리합니다.
  - 새 이슈는 바로 보드에 추가하고 `Status`(Todo → In Progress → Done)와 `Phase`(MVP / post-MVP)를 지정합니다.
- 라벨
  - 종류: `type: feature` `type: bug` `type: chore` `type: docs` `type: refactor` `type: ci` `type: idea`
  - 단계: `phase: MVP` `phase: post-MVP`

## 2. 이슈 하나당 PR 하나

1. `main`에서 브랜치 생성: `<type>/<이슈번호>-<짧은-설명>`
   - 예: `feat/12-share-link`, `fix/20-login-redirect`, `chore/1-eslint-prettier`
2. 작업 후 PR 생성 — 본문에 `Closes #<이슈번호>`를 적어 머지 시 이슈가 자동으로 닫히게 합니다.
3. CI가 통과하면 **Squash merge** 후 브랜치를 삭제합니다.
4. `main`에 직접 push하지 않습니다.

## 3. 커밋 메시지

[Conventional Commits](https://www.conventionalcommits.org/ko/) 형식을 따릅니다.

```
<type>: <요약> (#이슈번호)
```

`feat` `fix` `chore` `docs` `refactor` `test` `ci` `style` `perf`

## 4. 코드 스타일

- ESLint + Prettier가 커밋 시 자동 실행됩니다 (husky + lint-staged).
- VS Code 사용 시 추천 확장(ESLint, Prettier, EditorConfig)을 설치하면 저장할 때 자동 정리됩니다.
- 수동 실행: `npm run lint`, `npm run format`

## 5. 개발 순서: MVP 먼저

- `phase: MVP` 이슈를 모두 끝내 동작하는 최소 버전을 먼저 만듭니다.
- 상세 기능·개선은 `phase: post-MVP` 이슈로 쌓아두고 MVP 이후 진행합니다.

## 6. 모든 의사결정은 문서로 남긴다

- 기술 선택, 구조, 규칙, 기능 범위 등 **모든 의사결정**은 [`docs/decisions/`](docs/decisions/)에 md로 기록합니다.
- 파일명: `YYYY-MM-DD-<이슈번호 3자리>-<슬러그>.md`. 결정 1개당 파일 1개를 만들고 [템플릿](docs/decisions/_TEMPLATE.md)을 따릅니다.
- 결정 문서는 그 결정이 나온 PR에 함께 포함하고, [목록](docs/decisions/README.md)의 날짜별·이슈별 표를 갱신합니다.
- 결정을 바꿀 때는 기존 문서를 지우지 말고 상태를 `대체됨`으로 바꾼 뒤 새 문서로 연결합니다.
